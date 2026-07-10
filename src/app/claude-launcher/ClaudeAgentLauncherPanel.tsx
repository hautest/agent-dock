import type { ClaudePermissionMode } from "../../features/claude-code/types";
import { styles } from "../app.styles";
import { permissionModes, type PermissionModeOption } from "./permission-modes";

interface ClaudeAgentLauncherPanelProps {
  agentLaunchDisabled: boolean;
  selectedMode: ClaudePermissionMode;
  selectedModeOption: PermissionModeOption;
  onLaunch: () => void;
  onModeChange: (mode: ClaudePermissionMode) => void;
  onOpenLogin: () => void;
}

export function ClaudeAgentLauncherPanel({
  agentLaunchDisabled,
  selectedMode,
  selectedModeOption,
  onLaunch,
  onModeChange,
  onOpenLogin,
}: ClaudeAgentLauncherPanelProps) {
  return (
    <section className={`${styles.panel} ${styles.editorPanel}`} aria-label="agent launcher">
      <div className={styles.panelHeader}>
        <span>agent view</span>
        <span className={styles.muted}>test launcher</span>
      </div>
      <div className={styles.launcherBody}>
        <div className={styles.modeGrid} aria-label="permission mode">
          {permissionModes.map((mode) => (
            <button
              aria-pressed={selectedMode === mode.value}
              className={styles.modeButton(selectedMode === mode.value, mode.danger)}
              key={mode.value}
              onClick={() => onModeChange(mode.value)}
              type="button"
            >
              <span>{mode.status}</span>
              <strong>{mode.label}</strong>
              <small>{mode.description}</small>
            </button>
          ))}
        </div>

        <div className={styles.launcherActions}>
          <button
            className={styles.primaryButton(selectedModeOption.danger)}
            disabled={agentLaunchDisabled}
            onClick={onLaunch}
            type="button"
          >
            open agent view
          </button>
          <button className={styles.secondaryButton} onClick={onOpenLogin} type="button">
            login
          </button>
        </div>

        {selectedModeOption.danger ? (
          <p className={styles.warningText}>
            [DANGER] 이 모드는 Claude Code permission prompt를 건너뛰는 실행 모드다.
          </p>
        ) : null}
      </div>
    </section>
  );
}
