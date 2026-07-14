import type { HTMLAttributes } from "react";
import { css } from "../../../styled-system/css";
import { MONO_FONT } from "../../shared/styles/typography";

interface ClaudePanelProps extends HTMLAttributes<HTMLElement> {
  as?: "aside" | "section";
}

export function ClaudePanel({ as: Element = "section", className, ...props }: ClaudePanelProps) {
  return <Element className={[panel, className].filter(Boolean).join(" ")} {...props} />;
}

export function ClaudePanelHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={[panelHeader, className].filter(Boolean).join(" ")} {...props} />;
}

export function ClaudeMuted({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={[muted, className].filter(Boolean).join(" ")} {...props} />;
}

const panel = css({
  background:
    "linear-gradient(180deg, token(colors.fill.panelTop), token(colors.fill.panelBottom)), token(colors.surface.default)",
  border: "1px solid token(colors.border.default)",
  borderRadius: "8px",
  boxShadow:
    "inset 0 1px 0 token(colors.effect.highlight), 0 26px 80px token(colors.effect.panelShadow)",
  minWidth: "0",
});

const panelHeader = css({
  alignItems: "center",
  borderBottom: "1px solid token(colors.border.subtle)",
  color: "fg.default",
  display: "flex",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  justifyContent: "space-between",
  minHeight: "42px",
  padding: "0 14px",
});

const muted = css({
  color: "fg.subtle",
});
