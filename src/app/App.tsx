import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { useAtomValue } from "jotai";
import { css } from "../../styled-system/css";
import { claudePermissionModeAtom } from "../features/claude-code/claude-code-atoms";
import { claudeCliStatusQueryOptions } from "../features/claude-code/claude-code-queries";
import { MONO_FONT } from "../shared/styles/typography";
import { ClaudeDashboard } from "./claude-launcher/ClaudeDashboard";
import { queryClient } from "./query-client";

function App() {
  const selectedMode = useAtomValue(claudePermissionModeAtom);

  return (
    <main className={appShell}>
      <div className={scanline} aria-hidden="true" />
      <section className={workspace} aria-labelledby="workspace-title">
        <header className={topbar}>
          <div>
            <p className={eyebrow}>claude code agent view</p>
            <h1 className={title} id="workspace-title">
              Agent Dock
            </h1>
            <span className={pandaBadge}>claude cli ready</span>
          </div>
          <div className={commandPill} aria-label="current launcher command">
            <span className={prompt}>$</span>
            <span>claude agents --permission-mode {selectedMode}</span>
            <span className={cursor} aria-hidden="true" />
          </div>
        </header>

        <div className={shellGrid}>
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

const appShell = css({
  background:
    "radial-gradient(circle at 72% 12%, token(colors.effect.glowPrimaryStrong), transparent 30%), radial-gradient(circle at 18% 82%, token(colors.effect.glowSuccessSoft), transparent 26%), linear-gradient(145deg, token(colors.bg.canvas) 0%, token(colors.bg.canvasRaised) 54%, token(colors.bg.code) 100%)",
  minHeight: "100vh",
  overflow: "hidden",
  padding: { base: "14px", md: "20px", lg: "28px" },
  position: "relative",
});

const scanline = css({
  backgroundImage: "linear-gradient(token(colors.effect.scanline) 1px, transparent 1px)",
  backgroundSize: "100% 4px",
  inset: "0",
  opacity: "0.4",
  pointerEvents: "none",
  position: "fixed",
});

const workspace = css({
  display: "grid",
  gap: "18px",
  minHeight: { base: "calc(100vh - 28px)", md: "calc(100vh - 56px)" },
  position: "relative",
  zIndex: "1",
});

const topbar = css({
  alignItems: { base: "start", lg: "end" },
  display: "flex",
  flexDirection: { base: "column", lg: "row" },
  gap: "20px",
  justifyContent: "space-between",
  minHeight: "96px",
  padding: "4px 2px",
});

const eyebrow = css({
  color: "status.success",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  letterSpacing: "0",
  margin: "0 0 8px",
});

const title = css({
  color: "fg.strong",
  fontSize: { base: "3.25rem", md: "5rem", lg: "6.25rem" },
  lineHeight: "0.86",
  margin: "0",
});

const pandaBadge = css({
  alignItems: "center",
  borderColor: "border.success",
  borderRadius: "6px",
  borderWidth: "1px",
  color: "status.success",
  display: "inline-flex",
  fontFamily: MONO_FONT,
  fontSize: "0.72rem",
  minHeight: "28px",
  paddingInline: "10px",
});

const commandPill = css({
  alignItems: "center",
  background: "surface.shell",
  border: "1px solid token(colors.border.success)",
  borderRadius: "8px",
  boxShadow: "0 0 34px token(colors.effect.glowSuccess)",
  color: "status.warning",
  display: "flex",
  fontFamily: MONO_FONT,
  gap: "10px",
  maxWidth: "100%",
  minHeight: "44px",
  padding: "0 16px",
  whiteSpace: { base: "normal", md: "nowrap" },
  width: { base: "100%", md: "auto" },
});

const prompt = css({
  color: "status.success",
});

const cursor = css({
  animation: "blink 1.05s steps(2, start) infinite",
  background: "status.success",
  boxShadow: "0 0 16px token(colors.effect.glowCursor)",
  height: "1.2em",
  width: "9px",
});

const shellGrid = css({
  display: "grid",
  gap: "14px",
  gridTemplateColumns: {
    base: "1fr",
    md: "1fr 1fr",
    lg: "minmax(250px, 0.82fr) minmax(380px, 1.42fr) minmax(260px, 0.82fr)",
  },
  gridTemplateRows: { base: "auto", lg: "minmax(360px, 1fr) minmax(210px, 0.45fr)" },
});
