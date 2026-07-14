use crate::claude::{
    get_cli_status, launch_agent_view, list_agent_views, start_login, ClaudeAgentView,
    ClaudeAgentViewsRequest, ClaudeCliStatus, ClaudeLaunchRequest, ClaudeLaunchResult,
    ClaudeLoginResult,
};

async fn run_blocking<T, F>(operation: F) -> Result<T, String>
where
    T: Send + 'static,
    F: FnOnce() -> Result<T, crate::claude::ClaudeError> + Send + 'static,
{
    tauri::async_runtime::spawn_blocking(operation)
        .await
        .map_err(|error| format!("Claude Code 작업을 완료하지 못했습니다: {error}"))?
        .map_err(|error| error.to_string())
}

#[tauri::command]
pub async fn get_claude_cli_status() -> Result<ClaudeCliStatus, String> {
    run_blocking(get_cli_status).await
}

#[tauri::command]
pub async fn start_claude_login() -> Result<ClaudeLoginResult, String> {
    run_blocking(start_login).await
}

#[tauri::command]
pub async fn launch_claude_agent_view(
    request: ClaudeLaunchRequest,
) -> Result<ClaudeLaunchResult, String> {
    run_blocking(move || launch_agent_view(request)).await
}

#[tauri::command]
pub async fn list_claude_agent_views(
    request: ClaudeAgentViewsRequest,
) -> Result<Vec<ClaudeAgentView>, String> {
    run_blocking(move || list_agent_views(request)).await
}
