# Claude Code CLI 연동

## 목적

Agent Dock에서 Claude Code CLI를 기본 agent view로 실행할 수 있게 한다.

## 범위

* mise는 Node.js와 Rust를 고정하고 pnpm은 Corepack이 `package.json`의 `packageManager` 기준으로 활성화한다.
* Rust backend는 Claude Code CLI 상태 확인, 인증 상태 확인, 로그인 실행, agent view 실행 command를 제공한다.
* Frontend는 Claude Code 연동 상태를 보여주는 테스트용 agent view 화면을 기본 진입 화면으로 연다.
* 로그인되어 있지 않으면 별도 로그인 모달에서 Terminal 로그인 실행 버튼을 제공한다.
* agent view 실행 옵션은 기본 모드, auto 모드, 권한 전부 허용 모드를 제공한다.
* 권한 전부 허용 모드는 Claude Code CLI의 `bypassPermissions` permission mode를 사용한다.
* Claude Code CLI 실행은 Rust backend command를 통해서만 수행한다.

## 제외 범위

* 실제 파일 트리, Git 상태, 에디터 탭, 터미널 세션 context switching
* Claude Code agent output streaming
* Claude Code background session attach/logs/stop 관리
* Claude Code 설치 자동화
* 사용자가 임의 CLI 인자를 직접 입력하는 기능

## 사용자 경험

앱을 열면 Claude Code agent view 실행 화면이 먼저 보인다.

화면은 Claude Code CLI 설치 여부와 로그인 상태를 표시한다.

로그인되지 않은 상태에서는 로그인 모달을 열어 별도 Terminal에서 `claude auth login`을 실행할 수 있다.

로그인된 상태에서는 permission mode를 선택하고 별도 Terminal에서 `claude agents --cwd <repo> --permission-mode <mode>`를 실행할 수 있다.

권한 전부 허용 옵션은 위험한 실행 모드임을 화면에 명확히 표시한다.

## 데이터 모델

### ClaudeCliStatus

* `available`: Claude Code CLI 실행 가능 여부
* `version`: CLI version 문자열
* `path`: CLI path
* `auth`: 인증 상태

### ClaudeAuthStatus

* `loggedIn`: 로그인 여부
* `authMethod`: 인증 방식
* `email`: 계정 email
* `orgName`: 조직 이름
* `subscriptionType`: subscription 종류

### ClaudePermissionMode

* `default`: Claude Code 기본 permission mode
* `auto`: Claude Code auto permission mode
* `bypassPermissions`: 권한 전부 허용 mode

### ClaudeLaunchResult

* `command`: 실행한 command 문자열
* `pid`: 실행된 process id
* `mode`: 실행 mode
* `cwd`: 실행 경로

## Command

* `get_claude_cli_status`
* `start_claude_login`
* `launch_claude_agent_view`

`launch_claude_agent_view`는 허용된 enum option만 CLI 인자로 변환한다.

## Acceptance Criteria

* `.mise.toml`에서 pnpm aqua backend 설치 오류가 발생하지 않는다.
* `corepack pnpm --version`은 `11.7.0`을 출력한다.
* 앱 기본 화면은 Claude Code agent view 테스트 UI다.
* Claude Code CLI가 없으면 UI가 설치 필요 상태를 표시한다.
* 로그인 상태는 `claude auth status` 결과를 기반으로 표시한다.
* 로그인 버튼은 `claude auth login`을 별도 Terminal process로 실행한다.
* agent view 실행 버튼은 `claude agents --cwd <repo>`를 별도 Terminal process로 실행한다.
* permission mode 선택은 `--permission-mode default`, `--permission-mode auto`, `--permission-mode bypassPermissions` 중 하나만 전달한다.
* 권한 전부 허용 mode는 UI에서 위험 상태로 표시한다.
* Rust command 인자 조립은 unit test로 검증한다.
* `corepack pnpm lint:ts`, `corepack pnpm format:ts:check`, `corepack pnpm typecheck`, `corepack pnpm build`, Rust 검증 명령이 통과한다.

## 검증 방법

```bash
mise install
corepack pnpm --version
corepack pnpm lint:ts
corepack pnpm format:ts:check
corepack pnpm typecheck
corepack pnpm build
cd src-tauri
cargo fmt --check
cargo check
cargo clippy -- -D warnings
cargo test
```

가능한 경우 다음 명령으로 로컬 앱 실행까지 확인한다.

```bash
corepack pnpm tauri dev
```
