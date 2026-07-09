# 스펙 인덱스

이 폴더는 제품 요구사항, 기능 정의, acceptance criteria, 데이터 모델, 구현 순서를 기록한다.

AI 작업자는 기능을 구현하기 전에 반드시 이 인덱스에서 관련 스펙을 찾고 읽는다.

관련 스펙이 없으면 구현 전에 새 스펙을 작성하거나 기존 스펙을 수정한다.

## 스펙 목록

* `project-setup.md`: Tauri + React + TypeScript + Vite + pnpm 기반 초기 프로젝트 세팅
* `features/20260709-design-color-tokens.md`: Modern Terminal 디자인 가이드 기반 색상 디자인 토큰
* `features/20260709-frontend-styling-system.md`: Panda CSS 기반 프론트엔드 스타일링 시스템
* `features/modern-terminal-design-skill.md`: 프로젝트 로컬 modern-terminal 디자인 스킬과 기능 없는 샘플 UI

개발 중 새 스펙을 만들면 이 인덱스에 추가한다.

## 작성 규칙

스펙 파일 이름은 `YYYYMMDD-feature-name.md` 형식을 사용한다.

예시는 다음과 같다.

* `features/20260709-agent-session-switching.md`
* `features/20260709-file-tree.md`

하나의 PR은 하나의 스펙 문서를 기준으로 진행한다.

PR에서 새 기능 스펙이 필요하면 날짜가 붙은 새 스펙 하나를 만들고 이 인덱스에 추가한다.

PR에서 기존 스펙을 이어서 다루면 새 스펙을 추가하지 않고 기존 스펙 하나를 수정한다.

각 스펙은 다음 항목을 가능한 한 포함한다.

* 목적
* 범위
* 제외 범위
* 사용자 경험
* 데이터 모델
* acceptance criteria
* 검증 방법

## 싱크 규칙

스펙에 정의된 동작과 실제 코드 동작은 항상 일치해야 한다.

구현 중 스펙과 다른 결정을 내리면 같은 작업 안에서 스펙을 먼저 수정한다.
