mod claude;
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::get_claude_cli_status,
            commands::start_claude_login,
            commands::launch_claude_agent_view,
            commands::list_claude_agent_views,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
