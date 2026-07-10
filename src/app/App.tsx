import { useEffect, useMemo, useState } from "react";
import { ClaudeAgentLauncherPanel } from "./claude-launcher/ClaudeAgentLauncherPanel";
import { ClaudeCommandLog } from "./claude-launcher/ClaudeCommandLog";
import { ClaudeContextPanel } from "./claude-launcher/ClaudeContextPanel";
import { ClaudeLoginModal } from "./claude-launcher/ClaudeLoginModal";
import { ClaudeStatusPanel } from "./claude-launcher/ClaudeStatusPanel";
import { permissionModes } from "./claude-launcher/permission-modes";
import type { OperationResult } from "./claude-launcher/types";
import { styles } from "./app.styles";
import {
  getClaudeCliStatus,
  launchClaudeAgentView,
  startClaudeLogin,
} from "../features/claude-code/claude-code-client";
import type { ClaudeCliStatus, ClaudePermissionMode } from "../features/claude-code/types";

function App() {
  const [status, setStatus] = useState<ClaudeCliStatus | null>(null);
  const [selectedMode, setSelectedMode] = useState<ClaudePermissionMode>("default");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [operationResult, setOperationResult] = useState<OperationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedModeOption = useMemo(
    () => permissionModes.find((mode) => mode.value === selectedMode) ?? permissionModes[0],
    [selectedMode],
  );

  async function refreshStatus() {
    setLoading(true);
    setErrorMessage(null);

    try {
      setStatus(await getClaudeCliStatus());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleStartLogin() {
    setLoading(true);
    setErrorMessage(null);

    try {
      setOperationResult(await startClaudeLogin());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleLaunchAgentView() {
    setLoading(true);
    setErrorMessage(null);

    try {
      setOperationResult(await launchClaudeAgentView({ mode: selectedMode }));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshStatus();
  }, []);

  const auth = status?.auth;
  const agentLaunchDisabled = loading || !status?.available || !auth?.loggedIn;
  const statusTone = status?.available ? "ok" : "warn";
  const authTone = auth?.loggedIn ? "ok" : "warn";

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
          <ClaudeStatusPanel
            onRefresh={() => void refreshStatus()}
            status={status}
            statusTone={statusTone}
          />
          <ClaudeAgentLauncherPanel
            agentLaunchDisabled={agentLaunchDisabled}
            onLaunch={() => void handleLaunchAgentView()}
            onModeChange={setSelectedMode}
            onOpenLogin={() => setLoginModalOpen(true)}
            selectedMode={selectedMode}
            selectedModeOption={selectedModeOption}
          />
          <ClaudeContextPanel
            auth={auth}
            authTone={authTone}
            selectedMode={selectedMode}
            status={status}
          />
          <ClaudeCommandLog
            authLoggedIn={auth?.loggedIn ?? false}
            authTone={authTone}
            errorMessage={errorMessage}
            loading={loading}
            operationResult={operationResult}
            statusAvailable={status?.available ?? false}
            statusTone={statusTone}
          />
        </div>
      </section>

      {loginModalOpen ? (
        <ClaudeLoginModal
          disabled={loading || !status?.available}
          onClose={() => setLoginModalOpen(false)}
          onRefreshStatus={() => void refreshStatus()}
          onStartLogin={() => void handleStartLogin()}
        />
      ) : null}
    </main>
  );
}

export default App;
