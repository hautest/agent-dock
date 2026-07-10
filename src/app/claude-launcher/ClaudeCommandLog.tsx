import { styles } from "../app.styles";
import type { OperationResult, StatusTone } from "./types";

interface ClaudeCommandLogProps {
  authLoggedIn: boolean;
  errorMessage: string | null;
  loading: boolean;
  operationResult: OperationResult | null;
  statusAvailable: boolean;
  statusTone: StatusTone;
  authTone: StatusTone;
}

export function ClaudeCommandLog({
  authLoggedIn,
  errorMessage,
  loading,
  operationResult,
  statusAvailable,
  statusTone,
  authTone,
}: ClaudeCommandLogProps) {
  return (
    <section className={`${styles.panel} ${styles.terminalPanel}`} aria-label="command log">
      <div className={styles.panelHeader}>
        <span>terminal</span>
        <span className={styles.muted}>launcher events</span>
      </div>
      <div className={styles.terminalLines}>
        <p className={styles.terminalLine(statusTone)}>
          <span>status</span>
          {statusAvailable ? "Claude Code CLI detected" : "Claude Code CLI not found"}
        </p>
        <p className={styles.terminalLine(authTone)}>
          <span>auth</span>
          {authLoggedIn ? "Claude account authenticated" : "login required"}
        </p>
        {operationResult ? (
          <p className={styles.terminalLine("ok")}>
            <span>pid {operationResult.pid}</span>
            {operationResult.command}
          </p>
        ) : null}
        {errorMessage ? (
          <p className={styles.terminalLine("warn")}>
            <span>error</span>
            {errorMessage}
          </p>
        ) : null}
        <p className={styles.terminalPrompt}>
          <span>agent-dock %</span>
          {loading ? "waiting for claude cli" : "ready"}
          <span className={styles.cursor} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
