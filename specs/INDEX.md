# 스펙 인덱스

이 폴더는 제품 요구사항, 기능 정의, acceptance criteria, 데이터 모델, 구현 순서를 기록한다.

AI 작업자는 기능을 구현하기 전에 반드시 이 인덱스에서 관련 스펙을 찾고 읽는다.

관련 스펙이 없으면 구현 전에 새 스펙을 작성하거나 기존 스펙을 수정한다.

## 스펙 목록

* `project-setup.md`: Tauri + React + TypeScript + Vite + pnpm 기반 초기 프로젝트 세팅
* `features/modern-terminal-design-skill.md`: 프로젝트 로컬 modern-terminal 디자인 스킬과 기능 없는 샘플 UI

개발 중 새 스펙을 만들면 이 인덱스에 추가한다.

## 작성 규칙

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
