# agent-dock

Claude Code agent 세션을 하나의 로컬 IDE 화면에서 관리하기 위한 데스크톱 앱이다.

## Stack

* Tauri
* React
* TypeScript
* Vite
* pnpm
* TanStack Query + Suspensive
* Jotai
* overlay-kit

## Scripts

```bash
pnpm install
pnpm dev
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm tauri dev
```

개별 검증은 다음 명령으로 실행한다.

```bash
pnpm lint:ts
pnpm format:ts:check
pnpm lint:rust
pnpm format:rust:check
```
