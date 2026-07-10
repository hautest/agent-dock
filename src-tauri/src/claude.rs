use serde::{Deserialize, Serialize};
use std::{
    env,
    error::Error,
    fmt,
    path::{Path, PathBuf},
    process::{Command, Stdio},
};

const CLAUDE_BIN: &str = "claude";

#[derive(Debug)]
pub enum ClaudeError {
    CliNotFound,
    Io(std::io::Error),
    InvalidWorkingDirectory(String),
    Json(serde_json::Error),
}

impl fmt::Display for ClaudeError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::CliNotFound => write!(formatter, "Claude Code CLI를 찾을 수 없습니다."),
            Self::Io(error) => write!(formatter, "Claude Code CLI 실행에 실패했습니다: {error}"),
            Self::InvalidWorkingDirectory(path) => {
                write!(formatter, "실행 경로가 유효한 폴더가 아닙니다: {path}")
            }
            Self::Json(error) => write!(
                formatter,
                "Claude 인증 상태 응답을 읽을 수 없습니다: {error}"
            ),
        }
    }
}

impl Error for ClaudeError {}

impl From<std::io::Error> for ClaudeError {
    fn from(error: std::io::Error) -> Self {
        Self::Io(error)
    }
}

impl From<serde_json::Error> for ClaudeError {
    fn from(error: serde_json::Error) -> Self {
        Self::Json(error)
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeCliStatus {
    pub available: bool,
    pub version: Option<String>,
    pub path: Option<String>,
    pub auth: ClaudeAuthStatus,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeAuthStatus {
    pub logged_in: bool,
    pub auth_method: Option<String>,
    pub api_provider: Option<String>,
    pub email: Option<String>,
    pub org_name: Option<String>,
    pub subscription_type: Option<String>,
}

impl ClaudeAuthStatus {
    fn logged_out() -> Self {
        Self {
            logged_in: false,
            auth_method: None,
            api_provider: None,
            email: None,
            org_name: None,
            subscription_type: None,
        }
    }
}

#[derive(Clone, Copy, Debug, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub enum ClaudePermissionMode {
    Default,
    Auto,
    BypassPermissions,
}

impl ClaudePermissionMode {
    fn as_cli_value(self) -> &'static str {
        match self {
            Self::Default => "default",
            Self::Auto => "auto",
            Self::BypassPermissions => "bypassPermissions",
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeLaunchRequest {
    pub cwd: Option<String>,
    pub mode: ClaudePermissionMode,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeLaunchResult {
    pub command: String,
    pub pid: u32,
    pub mode: ClaudePermissionMode,
    pub cwd: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeLoginResult {
    pub command: String,
    pub pid: u32,
}

pub fn get_cli_status() -> Result<ClaudeCliStatus, ClaudeError> {
    let Some(path) = find_executable(CLAUDE_BIN) else {
        return Ok(ClaudeCliStatus {
            available: false,
            version: None,
            path: None,
            auth: ClaudeAuthStatus::logged_out(),
        });
    };

    let version = command_output(&path, ["--version"]).ok();
    let auth = read_auth_status(&path).unwrap_or_else(|_| ClaudeAuthStatus::logged_out());

    Ok(ClaudeCliStatus {
        available: true,
        version,
        path: Some(path.display().to_string()),
        auth,
    })
}

pub fn start_login() -> Result<ClaudeLoginResult, ClaudeError> {
    let path = find_executable(CLAUDE_BIN).ok_or(ClaudeError::CliNotFound)?;
    let args = vec!["auth".to_owned(), "login".to_owned()];
    let command = display_command(&path, args.iter().map(String::as_str));
    let child = spawn_interactive_command(&path, &args, &command)?;

    Ok(ClaudeLoginResult {
        command,
        pid: child.id(),
    })
}

pub fn launch_agent_view(request: ClaudeLaunchRequest) -> Result<ClaudeLaunchResult, ClaudeError> {
    let path = find_executable(CLAUDE_BIN).ok_or(ClaudeError::CliNotFound)?;
    let cwd = resolve_working_directory(request.cwd)?;
    let cwd_string = cwd.display().to_string();
    let args = build_agent_view_args(&cwd_string, request.mode);
    let command = display_command(&path, args.iter().map(String::as_str));
    let child = spawn_interactive_command(&path, &args, &command)?;

    Ok(ClaudeLaunchResult {
        command,
        pid: child.id(),
        mode: request.mode,
        cwd: cwd_string,
    })
}

fn read_auth_status(path: &Path) -> Result<ClaudeAuthStatus, ClaudeError> {
    let output = Command::new(path).args(["auth", "status"]).output()?;

    if !output.status.success() {
        return Ok(ClaudeAuthStatus::logged_out());
    }

    let auth = serde_json::from_slice::<ClaudeAuthStatus>(&output.stdout)?;
    Ok(auth)
}

fn command_output<const N: usize>(path: &Path, args: [&str; N]) -> Result<String, ClaudeError> {
    let output = Command::new(path).args(args).output()?;
    let stdout = String::from_utf8_lossy(&output.stdout).trim().to_owned();

    Ok(stdout)
}

fn resolve_working_directory(cwd: Option<String>) -> Result<PathBuf, ClaudeError> {
    let path = match cwd {
        Some(path) => PathBuf::from(path),
        None => env::current_dir()?,
    };

    if path.is_dir() {
        Ok(path)
    } else {
        Err(ClaudeError::InvalidWorkingDirectory(
            path.display().to_string(),
        ))
    }
}

fn build_agent_view_args(cwd: &str, mode: ClaudePermissionMode) -> Vec<String> {
    vec![
        "agents".to_owned(),
        "--cwd".to_owned(),
        cwd.to_owned(),
        "--permission-mode".to_owned(),
        mode.as_cli_value().to_owned(),
    ]
}

fn display_command<'a>(path: &Path, args: impl IntoIterator<Item = &'a str>) -> String {
    let mut parts = vec![path.display().to_string()];
    parts.extend(args.into_iter().map(shell_display_arg));
    parts.join(" ")
}

fn shell_display_arg(value: &str) -> String {
    if value
        .chars()
        .all(|character| character.is_ascii_alphanumeric() || "-_./:@".contains(character))
    {
        value.to_owned()
    } else {
        format!("'{}'", value.replace('\'', "'\\''"))
    }
}

#[cfg(target_os = "macos")]
fn spawn_interactive_command(
    _path: &Path,
    _args: &[String],
    command: &str,
) -> Result<std::process::Child, ClaudeError> {
    Command::new("osascript")
        .arg("-e")
        .arg("tell application \"Terminal\" to activate")
        .arg("-e")
        .arg(format!(
            "tell application \"Terminal\" to do script {}",
            apple_script_string(command)
        ))
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .map_err(ClaudeError::Io)
}

#[cfg(not(target_os = "macos"))]
fn spawn_interactive_command(
    path: &Path,
    args: &[String],
    _command: &str,
) -> Result<std::process::Child, ClaudeError> {
    Command::new(path)
        .args(args)
        .spawn()
        .map_err(ClaudeError::Io)
}

#[cfg(target_os = "macos")]
fn apple_script_string(value: &str) -> String {
    format!("\"{}\"", value.replace('\\', "\\\\").replace('"', "\\\""))
}

fn find_executable(name: &str) -> Option<PathBuf> {
    env::var_os("PATH")
        .into_iter()
        .flat_map(|path_value| env::split_paths(&path_value).collect::<Vec<_>>())
        .chain(common_binary_directories())
        .find_map(|directory| executable_in_directory(&directory, name))
}

fn common_binary_directories() -> Vec<PathBuf> {
    let mut directories = vec![
        PathBuf::from("/opt/homebrew/bin"),
        PathBuf::from("/usr/local/bin"),
    ];

    if let Some(home) = env::var_os("HOME") {
        let home = PathBuf::from(home);
        directories.push(home.join(".local/share/mise/shims"));
        directories.push(home.join(".local/bin"));
        directories.push(home.join(".claude/local"));
        directories.push(home.join(".npm-global/bin"));
    }

    directories
}

fn executable_in_directory(directory: &Path, name: &str) -> Option<PathBuf> {
    let candidate = directory.join(name);
    if candidate.is_file() {
        return Some(candidate);
    }

    if cfg!(windows) {
        let candidate = directory.join(format!("{name}.exe"));
        if candidate.is_file() {
            return Some(candidate);
        }
    }

    None
}

#[cfg(test)]
mod tests {
    use super::{
        apple_script_string, build_agent_view_args, display_command, shell_display_arg,
        ClaudePermissionMode,
    };
    use std::path::Path;

    #[test]
    fn builds_default_agent_view_args() {
        assert_eq!(
            build_agent_view_args("/workspace/agent-dock", ClaudePermissionMode::Default),
            vec![
                "agents",
                "--cwd",
                "/workspace/agent-dock",
                "--permission-mode",
                "default"
            ]
        );
    }

    #[test]
    fn builds_auto_agent_view_args() {
        assert_eq!(
            build_agent_view_args("/workspace/agent-dock", ClaudePermissionMode::Auto),
            vec![
                "agents",
                "--cwd",
                "/workspace/agent-dock",
                "--permission-mode",
                "auto"
            ]
        );
    }

    #[test]
    fn builds_bypass_permissions_agent_view_args() {
        assert_eq!(
            build_agent_view_args(
                "/workspace/agent-dock",
                ClaudePermissionMode::BypassPermissions
            ),
            vec![
                "agents",
                "--cwd",
                "/workspace/agent-dock",
                "--permission-mode",
                "bypassPermissions"
            ]
        );
    }

    #[test]
    fn quotes_display_args_with_spaces() {
        assert_eq!(
            shell_display_arg("/workspace/agent dock"),
            "'/workspace/agent dock'"
        );
    }

    #[test]
    fn displays_full_command() {
        assert_eq!(
            display_command(Path::new("/bin/claude"), ["auth", "login"]),
            "/bin/claude auth login"
        );
    }

    #[cfg(target_os = "macos")]
    #[test]
    fn escapes_apple_script_strings() {
        assert_eq!(
            apple_script_string("/bin/claude agents --cwd \"agent dock\""),
            "\"/bin/claude agents --cwd \\\"agent dock\\\"\""
        );
    }
}
