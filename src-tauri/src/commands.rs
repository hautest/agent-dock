use crate::claude::{
    get_cli_status, launch_agent_view, start_login, ClaudeCliStatus, ClaudeLaunchRequest,
    ClaudeLaunchResult, ClaudeLoginResult,
};

#[tauri::command]
pub fn get_claude_cli_status() -> Result<ClaudeCliStatus, String> {
    get_cli_status().map_err(|error| error.to_string())
}

#[tauri::command]
pub fn start_claude_login() -> Result<ClaudeLoginResult, String> {
    start_login().map_err(|error| error.to_string())
}

#[tauri::command]
pub fn launch_claude_agent_view(
    request: ClaudeLaunchRequest,
) -> Result<ClaudeLaunchResult, String> {
    launch_agent_view(request).map_err(|error| error.to_string())
}
