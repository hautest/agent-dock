import type { ClaudePermissionMode } from "../../features/claude-code/types";

export interface PermissionModeOption {
  value: ClaudePermissionMode;
  label: string;
  description: string;
  status: string;
  danger?: boolean;
}

export const permissionModes: PermissionModeOption[] = [
  {
    value: "default",
    label: "기본 모드",
    description: "Claude Code 기본 permission mode로 agent view를 연다.",
    status: "[BASE]",
  },
  {
    value: "auto",
    label: "auto 모드",
    description: "Claude Code auto permission mode로 agent view를 연다.",
    status: "[AUTO]",
  },
  {
    value: "bypassPermissions",
    label: "권한 전부 허용",
    description: "bypassPermissions mode로 승인 절차를 건너뛴다.",
    status: "[DANGER]",
    danger: true,
  },
];
