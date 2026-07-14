import { css } from "../../../styled-system/css";
import type { ClaudePermissionMode } from "../../features/claude-code/types";
import { MONO_FONT } from "../../shared/styles/typography";
import { permissionModes } from "./permission-modes";

interface ClaudePermissionModeSelectorProps {
  selectedMode: ClaudePermissionMode;
  onModeChange: (mode: ClaudePermissionMode) => void;
}

export function ClaudePermissionModeSelector({
  selectedMode,
  onModeChange,
}: ClaudePermissionModeSelectorProps) {
  return (
    <div className={grid} aria-label="permission mode">
      {permissionModes.map((mode) => {
        const classes = [button];
        if (selectedMode === mode.value) classes.push(activeButton);
        if (mode.danger) classes.push(dangerButton);

        return (
          <button
            aria-pressed={selectedMode === mode.value}
            className={classes.join(" ")}
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            type="button"
          >
            <span>{mode.status}</span>
            <strong>{mode.label}</strong>
            <small>{mode.description}</small>
          </button>
        );
      })}
    </div>
  );
}

const grid = css({
  display: "grid",
  gap: "10px",
  gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
});

const button = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  color: "fg.default",
  cursor: "pointer",
  display: "grid",
  gap: "7px",
  minHeight: "128px",
  padding: "14px",
  textAlign: "left",

  "& span": {
    color: "fg.subtle",
    fontFamily: MONO_FONT,
    fontSize: "0.72rem",
  },

  "& strong": {
    color: "fg.inverse",
    fontSize: "0.92rem",
  },

  "& small": {
    color: "fg.muted",
    fontSize: "0.78rem",
    lineHeight: "1.5",
  },
});

const activeButton = css({
  background: "surface.selected",
  borderColor: "border.selected",
  boxShadow: "0 0 28px token(colors.effect.glowPrimary)",
});

const dangerButton = css({
  borderColor: "status.danger",

  "& span": {
    color: "status.danger",
  },
});
