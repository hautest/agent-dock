import { css } from "../../styled-system/css";
import { claudeModalStyles } from "./app-claude-modal.styles";

const monoFont = "SFMono-Regular, Consolas, Liberation Mono, monospace";

const buttonBase = css({
  alignItems: "center",
  borderRadius: "7px",
  borderWidth: "1px",
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: monoFont,
  fontSize: "0.78rem",
  justifyContent: "center",
  minHeight: "38px",
  paddingInline: "13px",
  transition: "border-color 160ms ease, color 160ms ease, background 160ms ease",

  _disabled: {
    cursor: "not-allowed",
    opacity: "0.5",
  },
});

const primaryButton = css({
  background: "surface.selected",
  borderColor: "border.selected",
  color: "fg.inverse",

  _hover: {
    borderColor: "border.success",
    color: "status.success",
  },
});

const dangerButton = css({
  background: "rgba(255, 95, 122, 0.12)",
  borderColor: "status.danger",
  color: "status.danger",
});

const secondaryButton = css({
  background: "surface.subtle",
  borderColor: "border.neutral",
  color: "fg.default",

  _hover: {
    borderColor: "border.success",
    color: "status.success",
  },
});

const modeButton = css({
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
    fontFamily: monoFont,
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

const modeButtonActive = css({
  background: "surface.selected",
  borderColor: "border.selected",
  boxShadow: "0 0 28px token(colors.effect.glowPrimary)",
});

const modeButtonDanger = css({
  borderColor: "status.danger",

  "& span": {
    color: "status.danger",
  },
});

const statusLabelOk = css({
  color: "status.success",
});

const statusLabelWarn = css({
  color: "status.warning",
});

export const claudeLauncherStyles = {
  launcherBody: css({
    display: "grid",
    gap: "16px",
    padding: "14px",
  }),
  modeGrid: css({
    display: "grid",
    gap: "10px",
    gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
  }),
  modeButton: (active: boolean, danger?: boolean) => {
    const classes = [modeButton];

    if (active) {
      classes.push(modeButtonActive);
    }

    if (danger) {
      classes.push(modeButtonDanger);
    }

    return classes.join(" ");
  },
  launcherActions: css({
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  }),
  primaryButton: (danger?: boolean) =>
    danger ? `${buttonBase} ${primaryButton} ${dangerButton}` : `${buttonBase} ${primaryButton}`,
  secondaryButton: `${buttonBase} ${secondaryButton}`,
  iconButton: css({
    background: "transparent",
    border: "0",
    color: "fg.muted",
    cursor: "pointer",
    fontFamily: monoFont,
    fontSize: "0.92rem",
    minHeight: "32px",
    minWidth: "32px",

    _hover: {
      color: "status.success",
    },
  }),
  warningText: css({
    borderLeft: "2px solid token(colors.status.danger)",
    color: "status.danger",
    fontFamily: monoFont,
    fontSize: "0.78rem",
    lineHeight: "1.6",
    margin: "0",
    paddingLeft: "12px",
  }),
  metricBlock: css({
    border: "1px solid token(colors.border.neutralSubtle)",
    borderRadius: "7px",
    display: "grid",
    gap: "8px",
    minHeight: "70px",
    padding: "12px",

    "& span": {
      color: "fg.subtle",
      fontFamily: monoFont,
      fontSize: "0.72rem",
    },

    "& strong": {
      color: "fg.default",
      fontFamily: monoFont,
      fontSize: "0.78rem",
      overflowWrap: "anywhere",
    },
  }),
  statusLabel: (tone: "ok" | "warn") => (tone === "ok" ? statusLabelOk : statusLabelWarn),
  ...claudeModalStyles,
};
