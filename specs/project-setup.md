# 프로젝트 초기 세팅

## 목적

빌드 가능한 Tauri 데스크톱 앱 기반을 만든다.

## 범위

* Tauri + React + TypeScript + Vite 기반 앱을 구성한다.
* 패키지 매니저는 pnpm을 사용한다.
* TypeScript lint는 oxlint로 실행한다.
* TypeScript와 루트 설정 format은 oxfmt로 실행한다.
* Rust lint와 format은 cargo clippy와 cargo fmt로 실행한다.
* mise에 명시한 Node.js, pnpm, Rust 버전을 프로젝트 루트의 실행 버전으로 사용한다.
* mise `2026.7.5` 이상에서 pnpm을 npm backend로 `11.7.0` 설치한다.
* 로컬에서 Tauri dev app을 실행할 수 있는 상태를 목표로 한다.
* Frontend와 Rust backend의 기본 진입점을 만든다.
* 기본 검증 명령을 package script와 문서에 맞춘다.

## 제외 범위

* agent 목록, 파일 트리, 에디터, 터미널 같은 실제 앱 셸 UI 구현
* Git, 파일 시스템, 터미널 세션, process 실행 기능 구현
* Tauri command/API layer의 제품 기능 구현
* 배포, signing, auto update 설정

## 사용자 경험

앱을 실행하면 기본 React 화면이 데스크톱 창에서 열린다.

## 기술 스택

* Tauri
* React
* TypeScript
* Vite
* pnpm
* Rust
* oxlint
* oxfmt
* mise

## 런타임 버전

프로젝트 루트 `.mise.toml`은 다음 버전을 정확히 고정한다.

* Node.js `24.7.0`
* pnpm `11.7.0`
* Rust `1.96.0`

## Acceptance Criteria

* mise `2026.7.5` 이상이 프로젝트 루트에서 Node.js `24.7.0`, npm backend의 pnpm `11.7.0`, Rust `1.96.0`을 활성화한다.
* pnpm 의존성이 설치된다.
* `pnpm dev`로 Vite dev server를 실행할 수 있다.
* `pnpm tauri dev`로 Tauri dev app을 실행할 수 있다.
* `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `cd src-tauri && cargo check`, `cd src-tauri && cargo test`가 실행 가능한 상태다.
* 검증 명령은 `docs/validation.md`와 package scripts가 서로 일치한다.

## 검증 방법

```bash
mise install
node --version
pnpm --version
rustc --version
cargo --version
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
cd src-tauri
cargo check
cargo test
```

가능한 경우 다음 명령으로 로컬 앱 실행까지 확인한다.

```bash
pnpm tauri dev
```
