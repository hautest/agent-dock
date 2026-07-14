import { css } from "../../styled-system/css";
import { MONO_FONT } from "../shared/styles/typography";

const terminalLine = css({
  color: "terminal.text",
  fontSize: "0.86rem",
  lineHeight: "1.55",
  margin: "0",
  overflowWrap: "anywhere",

  "& span": {
    color: "terminal.dim",
    marginRight: "14px",
  },
});

const terminalLineOk = css({
  color: "status.success",
});

const terminalLineWarn = css({
  color: "status.warning",
});

export const editorTerminalStyles = {
  editorPanel: css({
    gridColumn: { base: "1", md: "1 / -1", lg: "auto" },
    overflow: "hidden",
  }),
  editorTabs: css({
    display: "flex",
    gap: "8px",
    minWidth: "0",
    overflowX: "auto",
    padding: "12px 14px 0",
  }),
  tab: css({
    background: "surface.subtle",
    border: "1px solid token(colors.border.neutral)",
    borderRadius: "7px 7px 0 0",
    color: "fg.tab",
    flex: "0 0 auto",
    fontFamily: MONO_FONT,
    fontSize: "0.78rem",
    padding: "8px 11px",
  }),
  tabActive: css({
    background: "surface.selected",
    borderColor: "border.selected",
    color: "fg.inverse",
  }),
  codeWindow: css({
    background:
      "linear-gradient(90deg, token(colors.border.successSubtle) 1px, transparent 1px), token(colors.bg.code)",
    backgroundSize: "32px 32px",
    border: "1px solid token(colors.border.code)",
    borderRadius: "0 7px 7px",
    color: "fg.code",
    fontFamily: MONO_FONT,
    fontSize: "clamp(0.8rem, 1.5vw, 0.98rem)",
    lineHeight: "1.9",
    margin: "0 14px 14px",
    minHeight: "282px",
    padding: "20px",

    "& p": {
      margin: "0",
      overflowWrap: "anywhere",
    },
  }),
  codeLineNumber: css({
    color: "code.lineNumber",
    display: "inline-block",
    width: "34px",
  }),
  keyword: css({
    color: "code.keyword",
  }),
  string: css({
    color: "code.string",
  }),
  terminalPanel: css({
    borderColor: "border.success",
    gridColumn: "1 / -1",
    overflow: "hidden",
  }),
  terminalLines: css({
    background: "bg.terminal",
    display: "grid",
    fontFamily: MONO_FONT,
    gap: "10px",
    padding: "14px",
  }),
  terminalLine: (tone?: "ok" | "warn") => {
    if (tone === "ok") {
      return `${terminalLine} ${terminalLineOk}`;
    }

    if (tone === "warn") {
      return `${terminalLine} ${terminalLineWarn}`;
    }

    return terminalLine;
  },
  terminalPrompt: css({
    alignItems: "center",
    color: "fg.default",
    display: "flex",
    fontSize: "0.86rem",
    gap: "8px",
    lineHeight: "1.55",
    margin: "0",
    overflowWrap: "anywhere",

    "& span:first-child": {
      color: "terminal.dim",
      marginRight: "14px",
    },
  }),
};
