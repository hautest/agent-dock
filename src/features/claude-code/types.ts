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
  defaultCwd: string;
  auth: ClaudeAuthStatus;
}

export interface ClaudeLaunchRequest {
  cwd: string;
  mode: ClaudePermissionMode;
}

export interface ClaudeAgentViewsRequest {
  cwd: string;
}

export interface ClaudeLaunchResult {
  command: string;
  pid: number | null;
  mode: ClaudePermissionMode;
  cwd: string;
}

export interface ClaudeLoginResult {
  command: string;
  pid: number | null;
}

export interface ClaudeAgentView {
  id: string | null;
  sessionId: string | null;
  pid: number | null;
  cwd: string;
  kind: string;
  name: string | null;
  status: string | null;
  state: string | null;
  startedAt: number;
}
