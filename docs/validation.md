# 검증

## Frontend 검증

Frontend 변경 후 가능한 경우 다음을 실행한다.

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Rust 검증

Rust 변경 후 가능한 경우 다음을 실행한다.

```bash
cargo fmt
cargo check
cargo clippy
cargo test
```

## 실행하지 못한 경우

프로젝트에 아직 해당 명령이 없거나 실행할 수 없는 상태라면, 실행하지 못한 이유를 작업 요약에 남긴다.

## 로컬 앱 확인

테스트가 통과하면 가능한 경우 로컬에서 앱을 직접 실행한다.

데스크탑 앱은 가능한 경우 Tauri dev app을 실행해 주요 화면과 상호작용을 확인한다.

로컬 실행이 불가능한 환경이면 이유와 대신 수행한 검증을 작업 요약에 남긴다.

## 문서 싱크

검증 명령, package script, Rust lint 정책이 바뀌면 이 문서를 함께 수정한다.
