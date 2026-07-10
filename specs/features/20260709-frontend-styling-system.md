# 프론트엔드 스타일링 시스템

## 목적

Frontend에서 타입 안전한 스타일 작성 기반을 마련한다.

## 범위

* Panda CSS를 React + TypeScript + Vite 앱에 설치한다.
* Panda CSS codegen 결과물을 TypeScript에서 import할 수 있게 설정한다.
* 전역 CSS entry에 Panda CSS layer를 추가한다.
* 기존 화면에 Panda CSS class를 최소 1곳 적용해 동작을 확인한다.
* package script와 검증 명령이 새 스타일링 설정과 맞게 동작하게 한다.

## 제외 범위

* 디자인 토큰 설계
* recipe, pattern, slot recipe 설계
* 기존 `App.css` 스타일의 전면 마이그레이션
* 화면 디자인 변경

## 사용자 경험

현재 기본 화면은 유지된다.

Panda CSS 적용 여부를 확인할 수 있는 작은 UI 표식이 화면에 표시된다.

## 기술 스택

* Panda CSS
* PostCSS
* React
* TypeScript
* Vite
* pnpm

## Acceptance Criteria

* `@pandacss/dev`가 dev dependency로 설치된다.
* `panda.config.ts`가 프로젝트 루트에 존재한다.
* Panda CSS codegen 결과물을 TypeScript에서 import할 수 있다.
* `src/index.css`가 Panda CSS layer를 정의하고 앱 entry에서 import된다.
* 기존 화면에 Panda CSS로 작성한 class가 최소 1곳 적용된다.
* 디자인 토큰은 별도로 정의하지 않는다.
* `corepack pnpm lint:ts`, `corepack pnpm format:ts:check`, `corepack pnpm typecheck`, `corepack pnpm build`가 통과한다.

## 검증 방법

```bash
corepack pnpm lint:ts
corepack pnpm format:ts:check
corepack pnpm typecheck
corepack pnpm build
```
