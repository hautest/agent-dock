# Claude Code CLI 연동

## 목적

Agent Dock에서 Claude Code CLI를 기본 agent view로 실행할 수 있게 한다.

## 범위

* mise는 Node.js, pnpm, Rust를 고정한다.
* Rust backend는 Claude Code CLI 상태 확인, 인증 상태 확인, 로그인 실행, agent view 실행, active agent session 조회 command를 제공한다.
* Frontend는 Claude Code 연동 상태를 보여주는 테스트용 agent view 화면을 기본 진입 화면으로 연다.
* 로그인되어 있지 않으면 별도 로그인 모달에서 Terminal 로그인 실행 버튼을 제공한다.
* agent view 실행 옵션은 기본 모드, auto 모드, 권한 전부 허용 모드를 제공한다.
* 권한 전부 허용 모드는 Claude Code CLI의 `bypassPermissions` permission mode를 사용한다.
* Claude Code CLI 실행은 Rust backend command를 통해서만 수행한다.
* Frontend server state는 TanStack Query와 Suspensive로 관리한다.
* launcher 전역 상태는 Jotai로 관리한다.
* 로그인과 위험 실행 확인 modal은 overlay-kit으로 관리한다.
* 컴포넌트 전용 Panda CSS 선언은 해당 컴포넌트 파일의 컴포넌트와 로직 아래에 둔다.
* launcher가 공유하는 패널 시각 패턴은 공용 패널 컴포넌트와 같은 파일에서 관리한다.

## 제외 범위

* 실제 파일 트리, Git 상태, 에디터 탭, 터미널 세션 context switching
* Claude Code agent output streaming
* Claude Code background session attach/logs/stop 관리
* Claude Code 설치 자동화
* 사용자가 임의 CLI 인자를 직접 입력하는 기능

## 사용자 경험

앱을 열면 Claude Code agent view 실행 화면이 먼저 보인다.

화면은 Claude Code CLI 설치 여부와 로그인 상태를 표시한다.

화면은 실행할 repo 경로를 명시적으로 표시하고 수정할 수 있다.

화면은 `claude agents --json --cwd <repo>`가 반환하는 현재 repo의 active agent session 목록을 표시하고 사용자가 새로고침할 수 있다.

로그인되지 않은 상태에서는 로그인 모달을 열어 별도 Terminal에서 `claude auth login`을 실행할 수 있다.

로그인된 상태에서는 permission mode를 선택하고 별도 Terminal에서 `claude agents --cwd <repo> --permission-mode <mode>`를 실행할 수 있다.

권한 전부 허용 옵션은 위험한 실행 모드임을 화면에 명확히 표시한다.

권한 전부 허용 옵션은 별도 확인 modal에서 사용자가 다시 확인한 뒤 실행한다.

## 데이터 모델

### ClaudeCliStatus

* `available`: Claude Code CLI 실행 가능 여부
* `version`: CLI version 문자열
* `path`: CLI path
* `defaultCwd`: launcher가 처음 표시할 현재 작업 경로
* `auth`: 인증 상태

### ClaudeAuthStatus

* `loggedIn`: 로그인 여부
* `authMethod`: 인증 방식
* `apiProvider`: 인증 API provider
* `email`: 계정 email
* `orgName`: 조직 이름
* `subscriptionType`: subscription 종류

### ClaudePermissionMode

* `default`: Claude Code 기본 permission mode
* `auto`: Claude Code auto permission mode
* `bypassPermissions`: 권한 전부 허용 mode

### ClaudeLaunchResult

* `command`: 실행한 command 문자열
* `pid`: 직접 실행한 Claude process id. 별도 Terminal launcher를 거치면 null
* `mode`: 실행 mode
* `cwd`: 실행 경로

### ClaudeAgentView

* `id`: background agent short id
* `sessionId`: Claude session id
* `pid`: 실행 중인 process id
* `cwd`: session 작업 경로
* `kind`: interactive 또는 background
* `name`: session 이름
* `status`: process 상태
* `state`: agent 작업 상태
* `startedAt`: session 시작 Unix timestamp milliseconds

## Command

* `get_claude_cli_status`
* `start_claude_login`
* `launch_claude_agent_view`
* `list_claude_agent_views`

`launch_claude_agent_view`는 허용된 enum option만 CLI 인자로 변환한다.

`launch_claude_agent_view`와 `list_claude_agent_views`는 사용자가 명시한 repo 경로를 검증한 뒤 CLI에 전달한다.

## Acceptance Criteria

* `mise install`은 Node.js, pnpm, Rust를 설치한다.
* `pnpm --version`은 `11.7.0`을 출력한다.
* 앱 기본 화면은 Claude Code agent view 테스트 UI다.
* Claude Code CLI가 없으면 UI가 설치 필요 상태를 표시한다.
* 로그인 상태는 `claude auth status` 결과를 기반으로 표시한다.
* 로그인 버튼은 `claude auth login`을 별도 Terminal process로 실행한다.
* agent view 실행 버튼은 사용자가 확인한 repo 경로로 `claude agents --cwd <repo>`를 별도 Terminal process에서 실행한다.
* active agent view 영역은 `claude agents --json --cwd <repo>` 결과의 session 종류, 이름, 상태, 경로, 시작 시각을 표시한다.
* active agent view 목록은 사용자가 새로고침할 수 있다.
* permission mode 선택은 `--permission-mode default`, `--permission-mode auto`, `--permission-mode bypassPermissions` 중 하나만 전달한다.
* 권한 전부 허용 mode는 UI에서 위험 상태로 표시하고 별도 확인 뒤 실행한다.
* Rust command 인자 조립은 unit test로 검증한다.
* Windows의 Claude CLI 탐색은 `.cmd`, `.exe`, `.bat` wrapper를 확장자 없는 경로보다 먼저 확인한다.
* server state는 TanStack Query와 Suspensive 경계에서 조회하고 갱신한다.
* permission mode, repo 경로, 최근 실행 결과는 Jotai atom으로 관리한다.
* 로그인과 권한 전부 허용 확인 modal은 overlay-kit으로 연다.
* Claude launcher 컴포넌트의 Panda CSS 선언은 컴포넌트와 로직 다음의 파일 하단에 위치한다.
* 공유 패널 스타일은 공용 패널 컴포넌트 파일의 컴포넌트 선언 아래에 위치한다.
* `pnpm lint:ts`, `pnpm format:ts:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, Rust 검증 명령이 통과한다.

## 검증 방법

```bash
mise install
pnpm --version
pnpm lint:ts
pnpm format:ts:check
pnpm typecheck
pnpm test
pnpm build
cd src-tauri
cargo fmt --check
cargo check
cargo clippy -- -D warnings
cargo test
```

가능한 경우 다음 명령으로 로컬 앱 실행까지 확인한다.

```bash
pnpm tauri dev
```

`claude agents --json --cwd <repo>`는 해당 repo에서 Claude agent view가 관리하는 session을 반환한다. session을 아직 만들지 않은 agent view process 자체는 목록에 나타나지 않을 수 있다.
