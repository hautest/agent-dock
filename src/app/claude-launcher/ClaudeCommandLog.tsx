import { css } from "../../../styled-system/css";
import { MONO_FONT } from "../../shared/styles/typography";
import { ClaudeMuted, ClaudePanel, ClaudePanelHeader } from "./ClaudePanel";
import type { OperationResult, StatusTone } from "./types";

interface ClaudeCommandLogProps {
  authLoggedIn: boolean;
  errorMessage: string | null;
  loading: boolean;
  operationResult: OperationResult | null;
  statusAvailable: boolean;
  statusTone: StatusTone;
  authTone: StatusTone;
}

export function ClaudeCommandLog({
  authLoggedIn,
  errorMessage,
  loading,
  operationResult,
  statusAvailable,
  statusTone,
  authTone,
}: ClaudeCommandLogProps) {
  return (
    <ClaudePanel className={terminalPanel} aria-label="command log">
      <ClaudePanelHeader>
        <span>terminal</span>
        <ClaudeMuted>launcher events</ClaudeMuted>
      </ClaudePanelHeader>
      <div className={terminalLines}>
        <p className={terminalLine(statusTone)}>
          <span>status</span>
          {statusAvailable ? "Claude Code CLI detected" : "Claude Code CLI not found"}
        </p>
        <p className={terminalLine(authTone)}>
          <span>auth</span>
          {authLoggedIn ? "Claude account authenticated" : "login required"}
        </p>
        {operationResult ? (
          <p className={terminalLine("ok")}>
            <span>{operationResult.pid ? `pid ${operationResult.pid}` : "terminal"}</span>
            {operationResult.command}
          </p>
        ) : null}
        {errorMessage ? (
          <p className={terminalLine("warn")}>
            <span>error</span>
            {errorMessage}
          </p>
        ) : null}
        <p className={terminalPrompt}>
          <span>agent-dock %</span>
          {loading ? "waiting for claude cli" : "ready"}
          <span className={cursor} aria-hidden="true" />
        </p>
      </div>
    </ClaudePanel>
  );
}

function terminalLine(tone?: "ok" | "warn"): string {
  if (tone === "ok") {
    return `${terminalLineBase} ${terminalLineOk}`;
  }

  if (tone === "warn") {
    return `${terminalLineBase} ${terminalLineWarn}`;
  }

  return terminalLineBase;
}

const terminalPanel = css({
  borderColor: "border.success",
  gridColumn: "1 / -1",
  overflow: "hidden",
});

const terminalLines = css({
  background: "bg.terminal",
  display: "grid",
  fontFamily: MONO_FONT,
  gap: "10px",
  padding: "14px",
});

const terminalLineBase = css({
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

const terminalPrompt = css({
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
});

const cursor = css({
  animation: "blink 1.05s steps(2, start) infinite",
  background: "status.success",
  boxShadow: "0 0 16px token(colors.effect.glowCursor)",
  height: "1.2em",
  width: "9px",
});
