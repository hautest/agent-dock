import type {
  ClaudeAuthStatus,
  ClaudeCliStatus,
  ClaudePermissionMode,
} from "../../features/claude-code/types";
import { css } from "../../../styled-system/css";
import { MONO_FONT } from "../../shared/styles/typography";
import { ClaudePanel, ClaudePanelHeader } from "./ClaudePanel";
import type { StatusTone } from "./types";

interface ClaudeContextPanelProps {
  auth: ClaudeAuthStatus | undefined;
  authTone: StatusTone;
  selectedMode: ClaudePermissionMode;
  status: ClaudeCliStatus | null;
}

export function ClaudeContextPanel({
  auth,
  authTone,
  selectedMode,
  status,
}: ClaudeContextPanelProps) {
  return (
    <ClaudePanel as="aside" className={clippedPanel} aria-label="launch context">
      <ClaudePanelHeader>
        <span>context</span>
        <span className={authTone === "ok" ? statusLabelOk : statusLabelWarn}>
          {auth?.loggedIn ? "[AUTH]" : "[WAIT]"}
        </span>
      </ClaudePanelHeader>
      <div className={metricRow}>
        <span>mode</span>
        <strong>{selectedMode}</strong>
      </div>
      <div className={metricRow}>
        <span>org</span>
        <strong>{auth?.orgName ?? "unknown"}</strong>
      </div>
      <div className={metricRow}>
        <span>plan</span>
        <strong>{auth?.subscriptionType ?? "unknown"}</strong>
      </div>
      <div className={fileStack}>
        <div className={fileRow}>
          <span>claude auth status</span>
          <strong>{auth?.loggedIn ? "ok" : "wait"}</strong>
        </div>
        <div className={fileRow}>
          <span>claude agents</span>
          <strong>{status?.available ? "ready" : "miss"}</strong>
        </div>
      </div>
    </ClaudePanel>
  );
}

const clippedPanel = css({
  overflow: "hidden",
});

const metricRow = css({
  alignItems: "center",
  borderBottom: "1px solid token(colors.border.neutralSubtle)",
  color: "fg.muted",
  display: "flex",
  fontSize: "0.9rem",
  gap: "12px",
  justifyContent: "space-between",
  padding: "12px 14px",

  "& strong": {
    color: "fg.default",
    fontFamily: MONO_FONT,
    fontSize: "0.82rem",
  },
});

const fileStack = css({
  display: "grid",
  gap: "10px",
  padding: "18px 14px 14px",
});

const fileRow = css({
  alignItems: "center",
  borderBottom: "1px solid token(colors.border.successSubtle)",
  color: "fg.muted",
  display: "flex",
  fontFamily: MONO_FONT,
  fontSize: "0.76rem",
  gap: "12px",
  justifyContent: "space-between",
  minHeight: "44px",
  overflowWrap: "anywhere",
  padding: "10px 0",

  "& strong": {
    color: "status.warning",
    flex: "0 0 44px",
    textAlign: "right",
    whiteSpace: "nowrap",
  },
});

const statusLabelOk = css({ color: "status.success" });
const statusLabelWarn = css({ color: "status.warning" });
