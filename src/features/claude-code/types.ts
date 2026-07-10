export type ClaudePermissionMode = "default" | "auto" | "bypassPermissions";

export interface ClaudeAuthStatus {
  loggedIn: boolean;
  authMethod: string | null;
  apiProvider: string | null;
  email: string | null;
  orgName: string | null;
  subscriptionType: string | null;
}

export interface ClaudeCliStatus {
  available: boolean;
  version: string | null;
  path: string | null;
  auth: ClaudeAuthStatus;
}

export interface ClaudeLaunchRequest {
  cwd?: string;
  mode: ClaudePermissionMode;
}

export interface ClaudeLaunchResult {
  command: string;
  pid: number;
  mode: ClaudePermissionMode;
  cwd: string;
}

export interface ClaudeLoginResult {
  command: string;
  pid: number;
}
