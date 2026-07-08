import "./App.css";

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
  { path: "src/app/App.css", state: "dirty" },
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
    <main className="app-shell">
      <div className="scanline" aria-hidden="true" />
      <section className="workspace" aria-labelledby="workspace-title">
        <header className="topbar">
          <div>
            <p className="eyebrow">agent-aware local editor shell</p>
            <h1 id="workspace-title">Agent Dock</h1>
          </div>
          <div className="command-pill" aria-label="current workspace path">
            <span className="prompt">$</span>
            <span>~/workspace/agent-dock</span>
            <span className="cursor" aria-hidden="true" />
          </div>
        </header>

        <div className="shell-grid">
          <aside className="panel session-panel" aria-label="agent sessions">
            <div className="panel-header">
              <span>agents</span>
              <span className="muted">3 live</span>
            </div>
            <div className="session-list">
              {sessions.map((session) => (
                <article
                  className={session.active ? "session-card active" : "session-card"}
                  key={session.id}
                >
                  <div className="session-index">{session.id}</div>
                  <div className="session-copy">
                    <h2>{session.name}</h2>
                    <p>{session.repo}</p>
                    <span>{session.branch}</span>
                  </div>
                  <div className="session-meta">
                    <strong>{session.status}</strong>
                    <span>{session.changes}</span>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <section className="panel editor-panel" aria-label="editor preview">
            <div className="panel-header">
              <span>editor</span>
              <span className="muted">App.tsx</span>
            </div>
            <div className="editor-tabs" aria-label="open tabs">
              <span className="tab active">App.tsx</span>
              <span className="tab">App.css</span>
              <span className="tab">design-guide.md</span>
            </div>
            <div className="code-window" aria-label="code preview">
              <p>
                <span className="line">01</span>
                <span className="keyword">const</span> activeAgent =
                <span className="string"> "claude-code/main"</span>;
              </p>
              <p>
                <span className="line">02</span>
                syncWorkspace(activeAgent, repo, terminal);
              </p>
              <p>
                <span className="line">03</span>
                renderShell(
                <span className="string">"modern-terminal"</span>);
              </p>
              <p>
                <span className="line">04</span>
                status.write(
                <span className="string">"[OK] context switched"</span>);
              </p>
            </div>
          </section>

          <aside className="panel context-panel" aria-label="workspace context">
            <div className="panel-header">
              <span>context</span>
              <span className="status-ok">[OK]</span>
            </div>
            <div className="metric-row">
              <span>worktree</span>
              <strong>attached</strong>
            </div>
            <div className="metric-row">
              <span>git</span>
              <strong>+12 -3</strong>
            </div>
            <div className="metric-row">
              <span>terminal</span>
              <strong>restored</strong>
            </div>
            <div className="file-stack">
              {files.map((file) => (
                <div className="file-row" key={file.path}>
                  <span>{file.path}</span>
                  <strong>{file.state}</strong>
                </div>
              ))}
            </div>
          </aside>

          <section className="panel terminal-panel" aria-label="terminal preview">
            <div className="panel-header">
              <span>terminal</span>
              <span className="muted">session: claude-code/main</span>
            </div>
            <div className="terminal-lines">
              {logs.map((log) => (
                <p
                  className={log.tone ? `terminal-line ${log.tone}` : "terminal-line"}
                  key={log.message}
                >
                  <span>{log.prefix}</span>
                  {log.message}
                </p>
              ))}
              <p className="terminal-prompt">
                <span>agent-dock %</span> pnpm build
                <span className="cursor" aria-hidden="true" />
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
