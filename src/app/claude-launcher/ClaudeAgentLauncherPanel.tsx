import { css } from "../../../styled-system/css";
import { useEffect, useState } from "react";
import type { ClaudePermissionMode } from "../../features/claude-code/types";
import { MONO_FONT } from "../../shared/styles/typography";
import { styles } from "../app.styles";
import { ClaudePermissionModeSelector } from "./ClaudePermissionModeSelector";
import type { PermissionModeOption } from "./permission-modes";

const body = css({
  display: "grid",
  gap: "16px",
  padding: "14px",
});

const cwdLabel = css({
  color: "fg.muted",
  display: "grid",
  fontFamily: MONO_FONT,
  fontSize: "0.72rem",
  gap: "7px",
});

const cwdInput = css({
  background: "bg.code",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  color: "fg.default",
  fontFamily: MONO_FONT,
  minHeight: "40px",
  paddingInline: "12px",

  _focusVisible: {
    borderColor: "border.success",
    outline: "2px solid token(colors.border.successSubtle)",
  },
});

const cwdForm = css({
  alignItems: "end",
  display: "grid",
  gap: "10px",
  gridTemplateColumns: { base: "1fr", md: "minmax(0, 1fr) auto" },
});

const actions = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
});

const button = css({
  alignItems: "center",
  background: "surface.selected",
  borderColor: "border.selected",
  borderRadius: "7px",
  borderWidth: "1px",
  color: "fg.inverse",
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  justifyContent: "center",
  minHeight: "38px",
  paddingInline: "13px",

  _disabled: {
    cursor: "not-allowed",
    opacity: "0.5",
  },

  _hover: {
    borderColor: "border.success",
    color: "status.success",
  },
});

const secondaryButton = css({
  background: "surface.subtle",
  borderColor: "border.neutral",
  color: "fg.default",
});

const dangerButton = css({
  background: "rgba(255, 95, 122, 0.12)",
  borderColor: "status.danger",
  color: "status.danger",

  _hover: {
    borderColor: "status.danger",
    color: "status.danger",
  },
});

const warningText = css({
  borderLeft: "2px solid token(colors.status.danger)",
  color: "status.danger",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  lineHeight: "1.6",
  margin: "0",
  paddingLeft: "12px",
});

interface ClaudeAgentLauncherPanelProps {
  agentLaunchDisabled: boolean;
  cwd: string;
  selectedMode: ClaudePermissionMode;
  selectedModeOption: PermissionModeOption;
  onCwdApply: (cwd: string) => void;
  onLaunch: () => void;
  onModeChange: (mode: ClaudePermissionMode) => void;
  onOpenLogin: () => void;
}

export function ClaudeAgentLauncherPanel({
  agentLaunchDisabled,
  cwd,
  selectedMode,
  selectedModeOption,
  onCwdApply,
  onLaunch,
  onModeChange,
  onOpenLogin,
}: ClaudeAgentLauncherPanelProps) {
  const [draftCwd, setDraftCwd] = useState(cwd);

  useEffect(() => {
    setDraftCwd(cwd);
  }, [cwd]);

  return (
    <section className={`${styles.panel} ${styles.editorPanel}`} aria-label="agent launcher">
      <div className={styles.panelHeader}>
        <span>agent view</span>
        <span className={styles.muted}>test launcher</span>
      </div>
      <div className={body}>
        <form
          className={cwdForm}
          onSubmit={(event) => {
            event.preventDefault();
            onCwdApply(draftCwd.trim());
          }}
        >
          <label className={cwdLabel}>
            repo path
            <input
              aria-label="repo path"
              className={cwdInput}
              onChange={(event) => setDraftCwd(event.currentTarget.value)}
              spellCheck={false}
              value={draftCwd}
            />
          </label>
          <button className={`${button} ${secondaryButton}`} type="submit">
            use repo
          </button>
        </form>

        <ClaudePermissionModeSelector onModeChange={onModeChange} selectedMode={selectedMode} />

        <div className={actions}>
          <button
            className={`${button} ${selectedModeOption.danger ? dangerButton : ""}`}
            disabled={agentLaunchDisabled}
            onClick={onLaunch}
            type="button"
          >
            open agent view
          </button>
          <button className={`${button} ${secondaryButton}`} onClick={onOpenLogin} type="button">
            login
          </button>
        </div>

        {selectedModeOption.danger ? (
          <p className={warningText}>
            [DANGER] 이 모드는 Claude Code permission prompt를 건너뛰는 실행 모드다.
          </p>
        ) : null}
      </div>
    </section>
  );
}
