import { css } from "../../../styled-system/css";
import type { ClaudeCliStatus } from "../../features/claude-code/types";
import { MONO_FONT } from "../../shared/styles/typography";
import { ClaudePanel, ClaudePanelHeader } from "./ClaudePanel";
import type { StatusTone } from "./types";

interface ClaudeStatusPanelProps {
  loading: boolean;
  status: ClaudeCliStatus;
  statusTone: StatusTone;
  onRefresh: () => void;
}

export function ClaudeStatusPanel({
  loading,
  status,
  statusTone,
  onRefresh,
}: ClaudeStatusPanelProps) {
  const auth = status.auth;

  return (
    <ClaudePanel as="aside" className={clippedPanel} aria-label="claude status">
      <ClaudePanelHeader>
        <span>claude</span>
        <span className={statusTone === "ok" ? statusLabelOk : statusLabelWarn}>
          {status.available ? "[OK]" : "[MISS]"}
        </span>
      </ClaudePanelHeader>
      <div className={stack}>
        <div className={metricBlock}>
          <span>cli path</span>
          <strong>{status.path ?? "not found"}</strong>
        </div>
        <div className={metricBlock}>
          <span>version</span>
          <strong>{status.version ?? "unknown"}</strong>
        </div>
        <div className={metricBlock}>
          <span>auth</span>
          <strong>{auth.loggedIn ? (auth.email ?? "logged in") : "login required"}</strong>
        </div>
        <button className={refreshButton} disabled={loading} onClick={onRefresh} type="button">
          refresh status
        </button>
      </div>
    </ClaudePanel>
  );
}

const clippedPanel = css({
  overflow: "hidden",
});

const stack = css({
  display: "grid",
  gap: "10px",
  padding: "14px",
});

const metricBlock = css({
  border: "1px solid token(colors.border.neutralSubtle)",
  borderRadius: "7px",
  display: "grid",
  gap: "8px",
  minHeight: "70px",
  padding: "12px",

  "& span": {
    color: "fg.subtle",
    fontFamily: MONO_FONT,
    fontSize: "0.72rem",
  },

  "& strong": {
    color: "fg.default",
    fontFamily: MONO_FONT,
    fontSize: "0.78rem",
    overflowWrap: "anywhere",
  },
});

const statusLabelOk = css({ color: "status.success" });
const statusLabelWarn = css({ color: "status.warning" });

const refreshButton = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  color: "fg.default",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  minHeight: "38px",
  paddingInline: "13px",

  _disabled: {
    cursor: "not-allowed",
    opacity: "0.5",
  },
});
