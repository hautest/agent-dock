import type { ClaudeLaunchResult, ClaudeLoginResult } from "../../features/claude-code/types";

export type StatusTone = "ok" | "warn";

export type OperationResult = ClaudeLaunchResult | ClaudeLoginResult;
