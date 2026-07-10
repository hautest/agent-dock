import type { ClaudeCliStatus } from "../../features/claude-code/types";
import { styles } from "../app.styles";
import type { StatusTone } from "./types";

interface ClaudeStatusPanelProps {
  status: ClaudeCliStatus | null;
  statusTone: StatusTone;
  onRefresh: () => void;
}

export function ClaudeStatusPanel({ status, statusTone, onRefresh }: ClaudeStatusPanelProps) {
  const auth = status?.auth;

  return (
    <aside className={`${styles.panel} ${styles.clippedPanel}`} aria-label="claude status">
      <div className={styles.panelHeader}>
        <span>claude</span>
        <span className={styles.statusLabel(statusTone)}>
          {status?.available ? "[OK]" : "[MISS]"}
        </span>
      </div>
      <div className={styles.stack}>
        <div className={styles.metricBlock}>
          <span>cli path</span>
          <strong>{status?.path ?? "not found"}</strong>
        </div>
        <div className={styles.metricBlock}>
          <span>version</span>
          <strong>{status?.version ?? "unknown"}</strong>
        </div>
        <div className={styles.metricBlock}>
          <span>auth</span>
          <strong>{auth?.loggedIn ? (auth.email ?? "logged in") : "login required"}</strong>
        </div>
        <button className={styles.secondaryButton} onClick={onRefresh} type="button">
          refresh status
        </button>
      </div>
    </aside>
  );
}
