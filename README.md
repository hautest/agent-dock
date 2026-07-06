# agent-dock

Claude Code agent 세션을 하나의 로컬 IDE 화면에서 관리하기 위한 데스크톱 앱이다.

## Stack

* Tauri
* React
* TypeScript
* Vite
* pnpm

## Scripts

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm tauri dev
```

Rust 검증은 `src-tauri`에서 실행한다.

```bash
cargo fmt --check
cargo check
cargo clippy -- -D warnings
cargo test
```
