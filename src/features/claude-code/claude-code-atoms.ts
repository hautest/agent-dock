import { atom } from "jotai";
import type { ClaudePermissionMode, ClaudeLaunchResult, ClaudeLoginResult } from "./types";

export type ClaudeOperationResult = ClaudeLaunchResult | ClaudeLoginResult;

export const claudePermissionModeAtom = atom<ClaudePermissionMode>("default");
export const claudeWorkingDirectoryAtom = atom("");
export const claudeOperationResultAtom = atom<ClaudeOperationResult | null>(null);
