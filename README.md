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
corepack pnpm install
corepack pnpm dev
corepack pnpm lint
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm build
corepack pnpm tauri dev
```

개별 검증은 다음 명령으로 실행한다.

```bash
corepack pnpm lint:ts
corepack pnpm format:ts:check
corepack pnpm lint:rust
corepack pnpm format:rust:check
```
