# 디자인 색상 토큰

## 목적

Modern Terminal 디자인 가이드의 색상 기준을 Panda CSS 디자인 토큰으로 정의한다.

## 범위

* Panda CSS `colors` primitive token을 만든다.
* Panda CSS `colors` semantic token을 만든다.
* 색상 token 사용 상황을 설명하는 가이드 문서를 만든다.
* 현재 샘플 UI의 대표 색상 사용부를 semantic token 기반으로 바꾼다.
* 색상 토큰은 `docs/modern-terminal-design-guide.md`의 색상 기준과 일치시킨다.

## 제외 범위

* spacing, radius, typography, shadow token 설계
* recipe, pattern, slot recipe 설계
* 실제 agent, repo, worktree, 파일 트리, Git, 터미널 세션 기능 구현

## 사용자 경험

현재 샘플 UI는 modern dark + terminal 분위기를 유지한다.

화면의 배경, 패널, 텍스트, 경계선, 상태 색상은 의미 기반 token을 통해 적용된다.

## 토큰 구조

Primitive token은 디자인 가이드의 색상 값을 보존한다.

Semantic token은 UI 사용 의도를 표현한다.

* `bg`: 앱 배경, 코드 영역, 터미널 영역
* `surface`: 패널, 선택 행, 약한 표면
* `fg`: 기본 텍스트, 강조 텍스트, 보조 텍스트
* `border`: 기본 경계선, 선택 경계선, 성공 상태 경계선
* `accent`: primary 인디고, secondary 보라
* `status`: success, warning, danger
* `code`: keyword, string, line number
* `effect`: glow, shadow, scanline

## Acceptance Criteria

* `panda.config.ts`에 primitive color token이 정의된다.
* `panda.config.ts`에 semantic color token이 정의된다.
* 샘플 UI는 Panda CSS 문법으로 대표 색상에 semantic token을 사용한다.
* `docs/design-color-tokens.md`는 색상 token의 사용 상황을 설명한다.
* 디자인 가이드의 핵심 색상 값이 primitive token에 반영된다.
* `corepack pnpm lint:ts`, `corepack pnpm format:ts:check`, `corepack pnpm typecheck`, `corepack pnpm build`가 통과한다.

## 검증 방법

```bash
corepack pnpm lint:ts
corepack pnpm format:ts:check
corepack pnpm typecheck
corepack pnpm build
```
