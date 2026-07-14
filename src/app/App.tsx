import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { useAtomValue } from "jotai";
import { css } from "../../styled-system/css";
import { claudePermissionModeAtom } from "../features/claude-code/claude-code-atoms";
import { claudeCliStatusQueryOptions } from "../features/claude-code/claude-code-queries";
import { MONO_FONT } from "../shared/styles/typography";
import { styles } from "./app.styles";
import { ClaudeDashboard } from "./claude-launcher/ClaudeDashboard";
import { queryClient } from "./query-client";

const boundaryMessage = css({
  color: "status.warning",
  fontFamily: MONO_FONT,
  gridColumn: "1 / -1",
  margin: "0",
  padding: "24px",
});

const boundaryButton = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.success)",
  borderRadius: "7px",
  color: "status.success",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  marginLeft: "12px",
  minHeight: "36px",
  paddingInline: "12px",
});

function App() {
  const selectedMode = useAtomValue(claudePermissionModeAtom);

  return (
    <main className={styles.appShell}>
      <div className={styles.scanline} aria-hidden="true" />
      <section className={styles.workspace} aria-labelledby="workspace-title">
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>claude code agent view</p>
            <h1 className={styles.title} id="workspace-title">
              Agent Dock
            </h1>
            <span className={styles.pandaBadge}>claude cli ready</span>
          </div>
          <div className={styles.commandPill} aria-label="current launcher command">
            <span className={styles.prompt}>$</span>
            <span>claude agents --permission-mode {selectedMode}</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        </header>

        <div className={styles.shellGrid}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <p className={boundaryMessage} role="alert">
                Claude Code 상태를 읽지 못했습니다: {error.message}
                <button
                  className={boundaryButton}
                  onClick={() => {
                    void queryClient.resetQueries({
                      queryKey: claudeCliStatusQueryOptions.queryKey,
                    });
                    reset();
                  }}
                  type="button"
                >
                  retry
                </button>
              </p>
            )}
          >
            <Suspense fallback={<p className={boundaryMessage}>reading claude cli status</p>}>
              <SuspenseQuery {...claudeCliStatusQueryOptions}>
                {(statusQuery) => <ClaudeDashboard statusQuery={statusQuery} />}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </main>
  );
}

export default App;
