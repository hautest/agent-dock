import { css } from "../../styled-system/css";

const monoFont = "SFMono-Regular, Consolas, Liberation Mono, monospace";

export const claudeModalStyles = {
  modalBackdrop: css({
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.68)",
    display: "flex",
    inset: "0",
    justifyContent: "center",
    padding: "18px",
    position: "fixed",
    zIndex: "10",
  }),
  modal: css({
    background:
      "linear-gradient(180deg, token(colors.fill.panelTop), token(colors.fill.panelBottom)), token(colors.surface.default)",
    border: "1px solid token(colors.border.success)",
    borderRadius: "8px",
    boxShadow: "0 26px 80px token(colors.effect.panelShadow)",
    color: "fg.default",
    margin: "0",
    maxWidth: "520px",
    overflow: "hidden",
    padding: "0",
    width: "100%",
  }),
  modalBody: css({
    display: "grid",
    gap: "16px",
    padding: "16px",
  }),
  modalCopy: css({
    color: "fg.muted",
    fontFamily: monoFont,
    fontSize: "0.82rem",
    lineHeight: "1.6",
    margin: "0",
  }),
};
