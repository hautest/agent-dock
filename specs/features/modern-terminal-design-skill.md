# Modern Terminal 디자인 스킬

## 목적

사용자가 말로 정의한 `modern dark + terminal` 디자인 취향을 프로젝트 안에 재사용 가능한 기준으로 남긴다.

## 범위

* 프로젝트 로컬 Codex 스킬을 `.codex/skills/modern-terminal-design`에 만든다.
* 스킬은 전부 한국어로 작성한다.
* 디자인 기준은 별도 피그마 파일 없이 사용자 설명과 `designprompts.dev`의 `Modern Dark`, `Terminal` 스타일 관찰 내용을 바탕으로 정리한다.
* 프로젝트 디자인 가이드를 문서로 작성한다.
* 기능 없는 샘플 UI를 현재 React 앱 첫 화면에 구현한다.

## 제외 범위

* 실제 agent, repo, worktree, 파일 트리, Git, 터미널 세션 기능 구현
* Tauri backend command 추가
* 외부 디자인 시스템 또는 피그마 연동
* 패키지 추가 설치

## 사용자 경험

앱 첫 화면은 agent-aware local editor shell의 분위기를 보여주는 정적 UI다.

화면은 고급 다크 개발 도구의 레이어드 패널, 부드러운 인디고/보라 액센트, 터미널의 모노스페이스 정보 밀도, 초록 상태 신호, CRT 느낌의 얇은 라인을 함께 사용한다.

## 디자인 기준

* `Modern Dark`: 어두운 배경, 깊이감 있는 패널, 보라/인디고 액센트, 정제된 SaaS형 구성
* `Terminal`: 모노스페이스, 초록 상태 신호, CLI 프롬프트, 경계선, tmux 분할 화면 감각
* 이 프로젝트의 화면은 장식보다 작업 상태, 세션 전환, 파일/터미널 맥락을 빠르게 읽는 경험을 우선한다.

## Acceptance Criteria

* `.codex/skills/modern-terminal-design/SKILL.md`가 존재한다.
* 스킬 본문은 한국어로 작성된다.
* `docs/modern-terminal-design-guide.md`가 디자인 기준을 설명한다.
* React 첫 화면은 기능 없는 modern-terminal 샘플 UI를 보여준다.
* 샘플 UI는 모바일과 데스크톱에서 레이아웃이 깨지지 않는다.
* 문서와 코드의 디자인 기준이 서로 일치한다.

## 검증 방법

```bash
pnpm typecheck
pnpm build
```

가능한 경우 로컬 앱을 실행해 화면을 직접 확인한다.
