import { styles } from "./App.styles";

interface AgentSession {
  id: string;
  name: string;
  repo: string;
  branch: string;
  status: string;
  changes: string;
  active?: boolean;
}

interface FileNode {
  path: string;
  state: string;
}

interface LogLine {
  prefix: string;
  message: string;
  tone?: "ok" | "warn";
}

const sessions: AgentSession[] = [
  {
    id: "01",
    name: "claude-code/main",
    repo: "agent-dock",
    branch: "main",
    status: "[OK] attached",
    changes: "+12 -3",
    active: true,
  },
  {
    id: "02",
    name: "review/fix-shell",
    repo: "agent-dock",
    branch: "ui-modern-terminal",
    status: "[SYNC] idle",
    changes: "+4 -1",
  },
  {
    id: "03",
    name: "docs/spec-pass",
    repo: "agent-dock",
    branch: "spec-first",
    status: "[WAIT] paused",
    changes: "+2 -0",
  },
];

const files: FileNode[] = [
  { path: "src/app/App.tsx", state: "open" },
  { path: "src/app/App.styles.ts", state: "dirty" },
  { path: "docs/modern-terminal-design-guide.md", state: "new" },
  { path: ".codex/skills/modern-terminal-design/SKILL.md", state: "new" },
];

const logs: LogLine[] = [
  { prefix: "09:42:13", message: "session restored for claude-code/main", tone: "ok" },
  { prefix: "09:42:18", message: "worktree attached ~/workspace/agent-dock" },
  { prefix: "09:42:22", message: "git status scanned: 4 changed files", tone: "warn" },
  { prefix: "09:42:29", message: "terminal pane linked to active agent", tone: "ok" },
];

function App() {
  return (
    <main className={styles.appShell}>
      <div className={styles.scanline} aria-hidden="true" />
      <section className={styles.workspace} aria-labelledby="workspace-title">
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>agent-aware local editor shell</p>
            <h1 className={styles.title} id="workspace-title">
              Agent Dock
            </h1>
            <span className={styles.pandaBadge}>panda css ready</span>
          </div>
          <div className={styles.commandPill} aria-label="current workspace path">
            <span className={styles.prompt}>$</span>
            <span>~/workspace/agent-dock</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        </header>

        <div className={styles.shellGrid}>
          <aside className={`${styles.panel} ${styles.clippedPanel}`} aria-label="agent sessions">
            <div className={styles.panelHeader}>
              <span>agents</span>
              <span className={styles.muted}>3 live</span>
            </div>
            <div className={styles.stack}>
              {sessions.map((session) => (
                <article className={styles.sessionCard(session.active)} key={session.id}>
                  <div className={styles.sessionIndex}>{session.id}</div>
                  <div>
                    <h2 className={styles.sessionCopyTitle}>{session.name}</h2>
                    <p className={styles.sessionCopyText}>{session.repo}</p>
                    <span className={styles.sessionCopyText}>{session.branch}</span>
                  </div>
                  <div className={styles.sessionMeta}>
                    <strong>{session.status}</strong>
                    <span>{session.changes}</span>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <section className={`${styles.panel} ${styles.editorPanel}`} aria-label="editor preview">
            <div className={styles.panelHeader}>
              <span>editor</span>
              <span className={styles.muted}>App.tsx</span>
            </div>
            <div className={styles.editorTabs} aria-label="open tabs">
              <span className={`${styles.tab} ${styles.tabActive}`}>App.tsx</span>
              <span className={styles.tab}>App.styles.ts</span>
              <span className={styles.tab}>design-tokens.md</span>
            </div>
            <div className={styles.codeWindow} aria-label="code preview">
              <p>
                <span className={styles.codeLineNumber}>01</span>
                <span className={styles.keyword}>const</span> activeAgent =
                <span className={styles.string}> "claude-code/main"</span>;
              </p>
              <p>
                <span className={styles.codeLineNumber}>02</span>
                syncWorkspace(activeAgent, repo, terminal);
              </p>
              <p>
                <span className={styles.codeLineNumber}>03</span>
                renderShell(
                <span className={styles.string}>"modern-terminal"</span>);
              </p>
              <p>
                <span className={styles.codeLineNumber}>04</span>
                status.write(
                <span className={styles.string}>"[OK] context switched"</span>);
              </p>
            </div>
          </section>

          <aside
            className={`${styles.panel} ${styles.clippedPanel}`}
            aria-label="workspace context"
          >
            <div className={styles.panelHeader}>
              <span>context</span>
              <span className={styles.statusOk}>[OK]</span>
            </div>
            <div className={styles.metricRow}>
              <span>worktree</span>
              <strong>attached</strong>
            </div>
            <div className={styles.metricRow}>
              <span>git</span>
              <strong>+12 -3</strong>
            </div>
            <div className={styles.metricRow}>
              <span>terminal</span>
              <strong>restored</strong>
            </div>
            <div className={styles.fileStack}>
              {files.map((file) => (
                <div className={styles.fileRow} key={file.path}>
                  <span>{file.path}</span>
                  <strong>{file.state}</strong>
                </div>
              ))}
            </div>
          </aside>

          <section
            className={`${styles.panel} ${styles.terminalPanel}`}
            aria-label="terminal preview"
          >
            <div className={styles.panelHeader}>
              <span>terminal</span>
              <span className={styles.muted}>session: claude-code/main</span>
            </div>
            <div className={styles.terminalLines}>
              {logs.map((log) => (
                <p className={styles.terminalLine(log.tone)} key={log.message}>
                  <span>{log.prefix}</span>
                  {log.message}
                </p>
              ))}
              <p className={styles.terminalPrompt}>
                <span>agent-dock %</span> pnpm build
                <span className={styles.cursor} aria-hidden="true" />
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
