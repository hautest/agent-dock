# 검증

## 런타임 준비

프로젝트 루트에서 mise로 고정된 런타임을 사용한다.

pnpm `11.7.0` 설치를 위해 현재 mise 릴리스를 사용한다.

```bash
mise install
node --version
pnpm --version
rustc --version
cargo --version
```

기대 버전은 Node.js `24.7.0`, pnpm `11.7.0`, Rust `1.96.0`이다.

## TypeScript 검증

TypeScript 변경 후 가능한 경우 다음을 실행한다.

```bash
pnpm lint:ts
pnpm format:ts:check
pnpm typecheck
pnpm build
```

전체 lint와 format 검증은 루트에서 다음 명령으로 실행한다.

```bash
pnpm lint
pnpm format:check
```

## Rust 검증

Rust 변경 후 가능한 경우 다음을 실행한다.

```bash
cd src-tauri
cargo fmt --check
cargo check
cargo clippy -- -D warnings
cargo test
```

루트 package script로 실행할 때는 다음 명령을 사용할 수 있다.

```bash
pnpm lint:rust
pnpm format:rust:check
```

## 실행하지 못한 경우

프로젝트에 아직 해당 명령이 없거나 실행할 수 없는 상태라면, 실행하지 못한 이유를 작업 요약에 남긴다.

## 로컬 앱 확인

테스트가 통과하면 가능한 경우 로컬에서 앱을 직접 실행한다.

데스크탑 앱은 가능한 경우 Tauri dev app을 실행해 주요 화면과 상호작용을 확인한다.

로컬 실행이 불가능한 환경이면 이유와 대신 수행한 검증을 작업 요약에 남긴다.

## 문서 싱크

검증 명령, package script, TypeScript lint/format 도구, Rust lint 정책이 바뀌면 이 문서를 함께 수정한다.
