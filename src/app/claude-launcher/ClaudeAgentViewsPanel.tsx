import { css } from "../../../styled-system/css";
import type { ClaudeAgentView } from "../../features/claude-code/types";
import { MONO_FONT } from "../../shared/styles/typography";
import { styles } from "../app.styles";

const panel = css({
  gridColumn: "1 / -1",
  overflow: "hidden",
});

const headerActions = css({
  alignItems: "center",
  display: "flex",
  gap: "8px",
});

const refreshButton = css({
  background: "transparent",
  border: "0",
  color: "fg.muted",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  fontSize: "0.72rem",
  minHeight: "32px",
  paddingInline: "4px",

  _disabled: {
    cursor: "not-allowed",
    opacity: "0.5",
  },

  _hover: {
    color: "status.success",
  },
});

const list = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
});

const row = css({
  borderBottom: "1px solid token(colors.border.neutralSubtle)",
  display: "grid",
  gap: "8px",
  minWidth: "0",
  padding: "12px 14px",

  _hover: {
    background: "surface.subtle",
  },
});

const identity = css({
  alignItems: "center",
  display: "flex",
  gap: "9px",
  minWidth: "0",

  "& strong": {
    color: "fg.default",
    fontSize: "0.84rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const kind = css({
  color: "status.success",
  flex: "0 0 auto",
  fontFamily: MONO_FONT,
  fontSize: "0.7rem",
});

const state = css({
  color: "status.success",
  fontFamily: MONO_FONT,
  fontSize: "0.7rem",
  marginLeft: "auto",
});

const blockedState = css({ color: "status.warning" });

const path = css({
  color: "fg.muted",
  fontFamily: MONO_FONT,
  fontSize: "0.72rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const meta = css({
  color: "fg.subtle",
  display: "flex",
  flexWrap: "wrap",
  fontFamily: MONO_FONT,
  fontSize: "0.68rem",
  gap: "12px",
});

const empty = css({
  color: "fg.muted",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  margin: "0",
  padding: "18px 14px",
});

interface ClaudeAgentViewsPanelProps {
  agentViews: ClaudeAgentView[];
  loading: boolean;
  onRefresh: () => void;
}

export function formatStartedAt(startedAt: number): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(startedAt));
}

function agentViewKey(agentView: ClaudeAgentView): string {
  return agentView.sessionId ?? agentView.id ?? `${agentView.cwd}:${agentView.startedAt}`;
}

export function ClaudeAgentViewsPanel({
  agentViews,
  loading,
  onRefresh,
}: ClaudeAgentViewsPanelProps) {
  return (
    <section className={`${styles.panel} ${panel}`} aria-label="active agent views">
      <div className={styles.panelHeader}>
        <span>active agent views</span>
        <div className={headerActions}>
          <span className={styles.muted}>{agentViews.length} sessions</span>
          <button className={refreshButton} disabled={loading} onClick={onRefresh} type="button">
            refresh
          </button>
        </div>
      </div>
      {agentViews.length > 0 ? (
        <div className={list}>
          {agentViews.map((agentView) => {
            const activity = agentView.state ?? agentView.status ?? "active";

            return (
              <article className={row} key={agentViewKey(agentView)}>
                <div className={identity}>
                  <span className={kind}>[{agentView.kind}]</span>
                  <strong>{agentView.name ?? "Claude session"}</strong>
                  <span className={`${state} ${activity === "blocked" ? blockedState : ""}`}>
                    {activity}
                  </span>
                </div>
                <span className={path} title={agentView.cwd}>
                  {agentView.cwd}
                </span>
                <div className={meta}>
                  <span>{agentView.id ?? agentView.sessionId?.slice(0, 8) ?? "no id"}</span>
                  <span>{agentView.pid ? `pid ${agentView.pid}` : "managed"}</span>
                  <time dateTime={new Date(agentView.startedAt).toISOString()}>
                    {formatStartedAt(agentView.startedAt)}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className={empty}>
          {loading ? "reading claude agents" : "no active agent sessions reported"}
        </p>
      )}
    </section>
  );
}
