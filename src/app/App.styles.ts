import { css } from "../../styled-system/css";
import { editorTerminalStyles } from "./AppEditorTerminal.styles";
import { panelStyles } from "./AppPanel.styles";

const monoFont = "SFMono-Regular, Consolas, Liberation Mono, monospace";

export const styles = {
  appShell: css({
    background:
      "radial-gradient(circle at 72% 12%, token(colors.effect.glowPrimaryStrong), transparent 30%), radial-gradient(circle at 18% 82%, token(colors.effect.glowSuccessSoft), transparent 26%), linear-gradient(145deg, token(colors.bg.canvas) 0%, token(colors.bg.canvasRaised) 54%, token(colors.bg.code) 100%)",
    minHeight: "100vh",
    overflow: "hidden",
    padding: { base: "14px", md: "20px", lg: "28px" },
    position: "relative",
  }),
  scanline: css({
    backgroundImage: "linear-gradient(token(colors.effect.scanline) 1px, transparent 1px)",
    backgroundSize: "100% 4px",
    inset: "0",
    opacity: "0.4",
    pointerEvents: "none",
    position: "fixed",
  }),
  workspace: css({
    display: "grid",
    gap: "18px",
    minHeight: { base: "calc(100vh - 28px)", md: "calc(100vh - 56px)" },
    position: "relative",
    zIndex: "1",
  }),
  topbar: css({
    alignItems: { base: "start", lg: "end" },
    display: "flex",
    flexDirection: { base: "column", lg: "row" },
    gap: "20px",
    justifyContent: "space-between",
    minHeight: "96px",
    padding: "4px 2px",
  }),
  eyebrow: css({
    color: "status.success",
    fontFamily: monoFont,
    fontSize: "0.78rem",
    letterSpacing: "0",
    margin: "0 0 8px",
  }),
  title: css({
    color: "fg.strong",
    fontSize: "clamp(3.25rem, 8vw, 7rem)",
    lineHeight: "0.86",
    margin: "0",
  }),
  pandaBadge: css({
    alignItems: "center",
    borderColor: "border.success",
    borderRadius: "6px",
    borderWidth: "1px",
    color: "status.success",
    display: "inline-flex",
    fontFamily: monoFont,
    fontSize: "0.72rem",
    minHeight: "28px",
    paddingInline: "10px",
  }),
  commandPill: css({
    alignItems: "center",
    background: "surface.shell",
    border: "1px solid token(colors.border.success)",
    borderRadius: "8px",
    boxShadow: "0 0 34px token(colors.effect.glowSuccess)",
    color: "status.warning",
    display: "flex",
    fontFamily: monoFont,
    gap: "10px",
    maxWidth: "100%",
    minHeight: "44px",
    padding: "0 16px",
    whiteSpace: { base: "normal", md: "nowrap" },
    width: { base: "100%", md: "auto" },
  }),
  prompt: css({
    color: "status.success",
  }),
  cursor: css({
    animation: "blink 1.05s steps(2, start) infinite",
    background: "status.success",
    boxShadow: "0 0 16px token(colors.effect.glowCursor)",
    height: "1.2em",
    width: "9px",
  }),
  shellGrid: css({
    display: "grid",
    gap: "14px",
    gridTemplateColumns: {
      base: "1fr",
      md: "1fr 1fr",
      lg: "minmax(250px, 0.82fr) minmax(380px, 1.42fr) minmax(260px, 0.82fr)",
    },
    gridTemplateRows: { base: "auto", lg: "minmax(360px, 1fr) minmax(210px, 0.45fr)" },
  }),
  ...panelStyles,
  ...editorTerminalStyles,
};
