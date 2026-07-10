import type {
  ClaudeAuthStatus,
  ClaudeCliStatus,
  ClaudePermissionMode,
} from "../../features/claude-code/types";
import { styles } from "../app.styles";
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
    <aside className={`${styles.panel} ${styles.clippedPanel}`} aria-label="launch context">
      <div className={styles.panelHeader}>
        <span>context</span>
        <span className={styles.statusLabel(authTone)}>{auth?.loggedIn ? "[AUTH]" : "[WAIT]"}</span>
      </div>
      <div className={styles.metricRow}>
        <span>mode</span>
        <strong>{selectedMode}</strong>
      </div>
      <div className={styles.metricRow}>
        <span>org</span>
        <strong>{auth?.orgName ?? "unknown"}</strong>
      </div>
      <div className={styles.metricRow}>
        <span>plan</span>
        <strong>{auth?.subscriptionType ?? "unknown"}</strong>
      </div>
      <div className={styles.fileStack}>
        <div className={styles.fileRow}>
          <span>claude auth status</span>
          <strong>{auth?.loggedIn ? "ok" : "wait"}</strong>
        </div>
        <div className={styles.fileRow}>
          <span>claude agents</span>
          <strong>{status?.available ? "ready" : "miss"}</strong>
        </div>
      </div>
    </aside>
  );
}
