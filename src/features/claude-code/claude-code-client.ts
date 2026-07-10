import { invoke } from "@tauri-apps/api/core";
import type {
  ClaudeCliStatus,
  ClaudeLaunchRequest,
  ClaudeLaunchResult,
  ClaudeLoginResult,
} from "./types";

function isTauriRuntime(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export function getClaudeCliStatus(): Promise<ClaudeCliStatus> {
  if (!isTauriRuntime()) {
    return Promise.resolve({
      available: false,
      version: null,
      path: null,
      auth: {
        loggedIn: false,
        authMethod: null,
        apiProvider: null,
        email: null,
        orgName: null,
        subscriptionType: null,
      },
    });
  }

  return invoke<ClaudeCliStatus>("get_claude_cli_status");
}

export function startClaudeLogin(): Promise<ClaudeLoginResult> {
  if (!isTauriRuntime()) {
    return Promise.reject(new Error("Tauri desktop app에서만 Claude login을 실행할 수 있습니다."));
  }

  return invoke<ClaudeLoginResult>("start_claude_login");
}

export function launchClaudeAgentView(request: ClaudeLaunchRequest): Promise<ClaudeLaunchResult> {
  if (!isTauriRuntime()) {
    return Promise.reject(
      new Error("Tauri desktop app에서만 Claude agent view를 실행할 수 있습니다."),
    );
  }

  return invoke<ClaudeLaunchResult>("launch_claude_agent_view", { request });
}
