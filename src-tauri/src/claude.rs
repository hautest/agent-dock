use serde::{Deserialize, Serialize};
use std::{
    env,
    error::Error,
    fmt,
    path::{Path, PathBuf},
    process::{Command, Stdio},
};

#[cfg(unix)]
use std::os::unix::fs::PermissionsExt;

const CLAUDE_BIN: &str = "claude";

#[derive(Debug)]
pub enum ClaudeError {
    CliNotFound,
    Io(std::io::Error),
    InvalidWorkingDirectory(String),
    Json(serde_json::Error),
    CommandFailed(String),
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
                "Claude Code CLI JSON 응답을 읽을 수 없습니다: {error}"
            ),
            Self::CommandFailed(message) => {
                write!(formatter, "Claude Code CLI 명령이 실패했습니다: {message}")
            }
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
    pub default_cwd: String,
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
    pub cwd: String,
    pub mode: ClaudePermissionMode,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeAgentViewsRequest {
    pub cwd: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeLaunchResult {
    pub command: String,
    pub pid: Option<u32>,
    pub mode: ClaudePermissionMode,
    pub cwd: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeLoginResult {
    pub command: String,
    pub pid: Option<u32>,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct ClaudeAgentView {
    pub id: Option<String>,
    pub session_id: Option<String>,
    pub pid: Option<u32>,
    pub cwd: String,
    pub kind: String,
    pub name: Option<String>,
    pub status: Option<String>,
    pub state: Option<String>,
    pub started_at: u64,
}

pub fn get_cli_status() -> Result<ClaudeCliStatus, ClaudeError> {
    let default_cwd = env::current_dir()?.display().to_string();
    let Some(path) = find_executable(CLAUDE_BIN) else {
        return Ok(ClaudeCliStatus {
            available: false,
            version: None,
            path: None,
            default_cwd,
            auth: ClaudeAuthStatus::logged_out(),
        });
    };

    let version = Some(command_output(&path, ["--version"])?);
    let auth = read_auth_status(&path)?;

    Ok(ClaudeCliStatus {
        available: true,
        version,
        path: Some(path.display().to_string()),
        default_cwd,
        auth,
    })
}

pub fn start_login() -> Result<ClaudeLoginResult, ClaudeError> {
    let path = find_executable(CLAUDE_BIN).ok_or(ClaudeError::CliNotFound)?;
    let args = vec!["auth".to_owned(), "login".to_owned()];
    let command = display_command(&path, args.iter().map(String::as_str));
    let pid = spawn_interactive_command(&path, &args, &command)?;

    Ok(ClaudeLoginResult { command, pid })
}

pub fn list_agent_views(
    request: ClaudeAgentViewsRequest,
) -> Result<Vec<ClaudeAgentView>, ClaudeError> {
    let path = find_executable(CLAUDE_BIN).ok_or(ClaudeError::CliNotFound)?;
    let cwd = resolve_working_directory(request.cwd)?;
    let cwd_string = cwd.display().to_string();
    let args = build_agent_view_list_args(&cwd_string);
    let output = Command::new(path).args(&args).output()?;

    if !output.status.success() {
        let message = String::from_utf8_lossy(&output.stderr).trim().to_owned();
        return Err(ClaudeError::CommandFailed(message));
    }

    parse_agent_views(&output.stdout)
}

fn parse_agent_views(output: &[u8]) -> Result<Vec<ClaudeAgentView>, ClaudeError> {
    serde_json::from_slice(output).map_err(ClaudeError::Json)
}

pub fn launch_agent_view(request: ClaudeLaunchRequest) -> Result<ClaudeLaunchResult, ClaudeError> {
    let path = find_executable(CLAUDE_BIN).ok_or(ClaudeError::CliNotFound)?;
    let cwd = resolve_working_directory(request.cwd)?;
    let cwd_string = cwd.display().to_string();
    let args = build_agent_view_args(&cwd_string, request.mode);
    let command = display_command(&path, args.iter().map(String::as_str));
    let pid = spawn_interactive_command(&path, &args, &command)?;

    Ok(ClaudeLaunchResult {
        command,
        pid,
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
    if !output.status.success() {
        let message = String::from_utf8_lossy(&output.stderr).trim().to_owned();
        return Err(ClaudeError::CommandFailed(message));
    }
    let stdout = String::from_utf8_lossy(&output.stdout).trim().to_owned();

    Ok(stdout)
}

fn resolve_working_directory(cwd: String) -> Result<PathBuf, ClaudeError> {
    let path = PathBuf::from(cwd);

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

fn build_agent_view_list_args(cwd: &str) -> Vec<String> {
    vec![
        "agents".to_owned(),
        "--json".to_owned(),
        "--cwd".to_owned(),
        cwd.to_owned(),
    ]
}

fn display_command<'a>(path: &Path, args: impl IntoIterator<Item = &'a str>) -> String {
    let mut parts = vec![shell_display_arg(&path.display().to_string())];
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
) -> Result<Option<u32>, ClaudeError> {
    let output = Command::new("osascript")
        .arg("-e")
        .arg("on run argv")
        .arg("-e")
        .arg("tell application \"Terminal\"")
        .arg("-e")
        .arg("activate")
        .arg("-e")
        .arg("do script (item 1 of argv)")
        .arg("-e")
        .arg("end tell")
        .arg("-e")
        .arg("end run")
        .arg(command)
        .stdin(Stdio::null())
        .output()?;

    if !output.status.success() {
        let message = String::from_utf8_lossy(&output.stderr).trim().to_owned();
        return Err(ClaudeError::CommandFailed(message));
    }

    Ok(None)
}

#[cfg(not(target_os = "macos"))]
fn spawn_interactive_command(
    path: &Path,
    args: &[String],
    _command: &str,
) -> Result<Option<u32>, ClaudeError> {
    let child = Command::new(path)
        .args(args)
        .spawn()
        .map_err(ClaudeError::Io)?;
    Ok(Some(child.id()))
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
    #[cfg(windows)]
    let extensions = ["cmd", "exe", "bat"].as_slice();
    #[cfg(not(windows))]
    let extensions: &[&str] = &[];

    executable_candidates(directory, name, extensions)
        .into_iter()
        .find(|candidate| is_executable_file(candidate))
}

fn executable_candidates(directory: &Path, name: &str, extensions: &[&str]) -> Vec<PathBuf> {
    extensions
        .iter()
        .map(|extension| directory.join(format!("{name}.{extension}")))
        .chain(std::iter::once_with(|| directory.join(name)))
        .collect()
}

#[cfg(unix)]
fn is_executable_file(path: &Path) -> bool {
    path.metadata()
        .map(|metadata| metadata.is_file() && metadata.permissions().mode() & 0o111 != 0)
        .unwrap_or(false)
}

#[cfg(not(unix))]
fn is_executable_file(path: &Path) -> bool {
    path.is_file()
}

#[cfg(test)]
mod tests {
    use super::{
        build_agent_view_args, build_agent_view_list_args, display_command, executable_candidates,
        parse_agent_views, shell_display_arg, ClaudeAgentView, ClaudePermissionMode,
    };
    use std::path::{Path, PathBuf};

    #[test]
    fn prioritizes_windows_executable_wrappers() {
        assert_eq!(
            executable_candidates(Path::new("C:/bin"), "claude", &["cmd", "exe", "bat"]),
            vec![
                PathBuf::from("C:/bin/claude.cmd"),
                PathBuf::from("C:/bin/claude.exe"),
                PathBuf::from("C:/bin/claude.bat"),
                PathBuf::from("C:/bin/claude"),
            ]
        );
    }

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
    fn builds_scoped_agent_view_list_args() {
        assert_eq!(
            build_agent_view_list_args("/workspace/agent-dock"),
            vec!["agents", "--json", "--cwd", "/workspace/agent-dock"]
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

    #[test]
    fn quotes_executable_path_with_spaces() {
        assert_eq!(
            display_command(
                Path::new("/Applications/Claude Code/claude"),
                ["auth", "login"]
            ),
            "'/Applications/Claude Code/claude' auth login"
        );
    }

    #[test]
    fn parses_active_agent_views() {
        let output = br#"[
          {
            "pid": 13064,
            "cwd": "/workspace/agent-dock",
            "kind": "interactive",
            "startedAt": 1783491256781,
            "sessionId": "2d7ca220-a621-430f-a59d-831e554f9f56",
            "status": "idle"
          },
          {
            "id": "12b56049",
            "cwd": "/workspace",
            "kind": "background",
            "startedAt": 1783905251124,
            "sessionId": "12b56049-6b4c-4fcd-a961-1a31f51749ce",
            "name": "review changes",
            "state": "working"
          }
        ]"#;

        assert_eq!(
            parse_agent_views(output).expect("agent views should parse"),
            vec![
                ClaudeAgentView {
                    id: None,
                    session_id: Some("2d7ca220-a621-430f-a59d-831e554f9f56".to_owned()),
                    pid: Some(13064),
                    cwd: "/workspace/agent-dock".to_owned(),
                    kind: "interactive".to_owned(),
                    name: None,
                    status: Some("idle".to_owned()),
                    state: None,
                    started_at: 1783491256781,
                },
                ClaudeAgentView {
                    id: Some("12b56049".to_owned()),
                    session_id: Some("12b56049-6b4c-4fcd-a961-1a31f51749ce".to_owned()),
                    pid: None,
                    cwd: "/workspace".to_owned(),
                    kind: "background".to_owned(),
                    name: Some("review changes".to_owned()),
                    status: None,
                    state: Some("working".to_owned()),
                    started_at: 1783905251124,
                },
            ]
        );
    }
}
