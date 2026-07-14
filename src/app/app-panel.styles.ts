import { css } from "../../styled-system/css";
import { MONO_FONT } from "../shared/styles/typography";

const sessionCard = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "34px minmax(0, 1fr)",
  minHeight: "96px",
  padding: "14px",
});

const sessionCardActive = css({
  background:
    "linear-gradient(135deg, token(colors.surface.selectedSuccess), token(colors.surface.selectedAccent))",
  borderColor: "border.successStrong",
  boxShadow: "0 0 34px token(colors.effect.glowPrimary)",
});

export const panelStyles = {
  panel: css({
    background:
      "linear-gradient(180deg, token(colors.fill.panelTop), token(colors.fill.panelBottom)), token(colors.surface.default)",
    border: "1px solid token(colors.border.default)",
    borderRadius: "8px",
    boxShadow:
      "inset 0 1px 0 token(colors.effect.highlight), 0 26px 80px token(colors.effect.panelShadow)",
    minWidth: "0",
  }),
  panelHeader: css({
    alignItems: "center",
    borderBottom: "1px solid token(colors.border.subtle)",
    color: "fg.default",
    display: "flex",
    fontFamily: MONO_FONT,
    fontSize: "0.78rem",
    justifyContent: "space-between",
    minHeight: "42px",
    padding: "0 14px",
  }),
  muted: css({
    color: "fg.subtle",
  }),
  statusOk: css({
    color: "status.success",
  }),
  clippedPanel: css({
    overflow: "hidden",
  }),
  stack: css({
    display: "grid",
    gap: "10px",
    padding: "14px",
  }),
  sessionCard: (active?: boolean) => (active ? `${sessionCard} ${sessionCardActive}` : sessionCard),
  sessionIndex: css({
    border: "1px solid token(colors.border.success)",
    borderRadius: "6px",
    color: "status.success",
    display: "grid",
    fontFamily: MONO_FONT,
    height: "34px",
    placeItems: "center",
    width: "34px",
  }),
  sessionCopyTitle: css({
    color: "fg.inverse",
    fontSize: "0.98rem",
    lineHeight: "1.2",
    margin: "0 0 6px",
    overflowWrap: "anywhere",
  }),
  sessionCopyText: css({
    color: "fg.muted",
    fontSize: "0.82rem",
    margin: "0",
  }),
  sessionMeta: css({
    color: "status.success",
    display: "flex",
    fontFamily: MONO_FONT,
    fontSize: "0.78rem",
    gap: "12px",
    gridColumn: "2",
    justifyContent: "space-between",

    "& span": {
      color: "fg.muted",
      fontSize: "0.82rem",
      margin: "0",
    },
  }),
  metricRow: css({
    alignItems: "center",
    borderBottom: "1px solid token(colors.border.neutralSubtle)",
    color: "fg.muted",
    display: "flex",
    fontSize: "0.9rem",
    gap: "12px",
    justifyContent: "space-between",
    padding: "12px 14px",

    "& strong": {
      color: "fg.default",
      fontFamily: MONO_FONT,
      fontSize: "0.82rem",
    },
  }),
  fileStack: css({
    display: "grid",
    gap: "10px",
    padding: "18px 14px 14px",
  }),
  fileRow: css({
    alignItems: "center",
    borderBottom: "1px solid token(colors.border.successSubtle)",
    color: "fg.muted",
    display: "flex",
    fontFamily: MONO_FONT,
    fontSize: "0.76rem",
    gap: "12px",
    justifyContent: "space-between",
    minHeight: "44px",
    overflowWrap: "anywhere",
    padding: "10px 0",

    "& strong": {
      color: "status.warning",
      flex: "0 0 44px",
      textAlign: "right",
      whiteSpace: "nowrap",
    },
  }),
};
