# 프론트엔드 컨벤션

## 기본 원칙

React + TypeScript를 사용한다.

TypeScript type은 철저하게 작성한다.

`any`는 사용하지 않는다.

컴포넌트는 가능한 작게 유지한다.

UI 상태는 명시적으로 관리한다.

주요 상태는 도메인별로 분리한다.

TDD 원칙을 따른다.

프론트엔드 기능을 작성할 때는 테스트 코드를 함께 작성한다.

## 타입 컨벤션

`any`는 사용하지 않는다.

외부 입력, Tauri command 응답, 이벤트 핸들러, 상태 값에는 명시적인 타입을 선언한다.

컴포넌트 props는 interface로 선언한다.

props interface 이름은 컴포넌트 이름 뒤에 `Props`를 붙인다.

예시는 다음과 같다.

```tsx
interface AgentListProps {
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
}
```

## 폴더 구조

Frontend 폴더는 FSD 구조로 관리한다.

초기 구조는 다음 단위를 기준으로 나눈다.

* `app`
* `pages`
* `features`
* `shared`

새 파일을 만들 때는 역할에 맞는 FSD layer를 먼저 결정한다.

공용 UI, hook, util은 `shared`로 분리한다.

사용자 행동 단위는 `features`에 둔다.

화면 단위는 `pages`에 둔다.

## 스타일링

스타일링 시스템은 Panda CSS를 사용한다.

Panda CSS 설정은 프로젝트 루트 `panda.config.ts`에서 관리한다.

Panda CSS layer는 `src/index.css`에서 정의하고 앱 entry에서 import한다.

Panda CSS codegen 결과물은 `styled-system` 폴더에서 import한다.

컴포넌트 스타일은 Panda CSS `css`, `cva`, `sva` 같은 유틸 함수로 작성한다.

Panda CSS JSX 컴포넌트를 직접 import해 화면 구조를 만들지 않는다.

반복되는 variant 스타일은 `cva`로 분리한다.

여러 slot이 함께 움직이는 컴포넌트 스타일은 `sva`로 분리한다.

단일 화면 또는 단일 UI 조각의 고정 스타일은 `css`로 분리한다.

컴포넌트 전용 스타일 선언은 해당 컴포넌트 파일에 함께 둔다.

컴포넌트 파일은 import, type과 props, 컴포넌트와 로직, 스타일 선언 순서로 작성한다.

Panda CSS `css`, `cva`, `sva` 선언은 컴포넌트와 로직 아래의 파일 하단에 둔다.

여러 화면이 공유하는 시각 패턴은 공용 UI 컴포넌트로 표현하고 해당 컴포넌트 파일 하단에 스타일을 둔다.

전역 layer와 reset처럼 앱 전체에 적용되는 CSS는 `src/index.css`에서 관리한다.

디자인 토큰, recipe, pattern은 별도 스펙에서 정의한 뒤 추가한다.

## 컴포넌트 분리

UI를 작성할 때는 적절한 UI 단위로 컴포넌트를 나누고 파일을 분리한다.

한 컴포넌트가 여러 책임을 가지면 더 작은 컴포넌트로 나눈다.

한 파일이 200줄 이상이 되는 것을 지양한다.

파일이 커지면 컴포넌트, hook, util, 타입 파일로 분리한다.

재사용 가능한 로직은 custom hook으로 분리한다.

재사용 가능한 순수 계산은 util 함수로 분리한다.

재사용 가능한 UI 패턴은 custom component로 분리한다.

## Tauri command 호출

Tauri command 호출은 컴포넌트 내부에 흩뿌리지 않고 별도 client layer로 감싼다.

컴포넌트는 가능한 한 UI 상태와 사용자 상호작용에 집중한다.

로컬 시스템 작업은 Rust backend command를 통해 수행한다.

## 상태 관리

Tauri command에서 조회하는 server state는 TanStack Query로 관리한다.

Suspense가 적용되는 server state 경계는 Suspensive 컴포넌트로 명시한다.

여러 컴포넌트가 공유하는 launcher 상태는 Jotai atom으로 관리한다.

Modal과 confirm UI의 생명주기는 overlay-kit으로 관리한다.

컴포넌트 내부에서만 사용하는 임시 UI 상태는 React local state로 관리한다.

## 테스트

TDD 원칙을 따른다.

새로운 UI 동작, 상태 변경, hook, util을 작성할 때는 테스트 코드를 함께 작성한다.

프론트엔드 단위 테스트는 Vitest와 Testing Library로 작성한다.

버그를 수정할 때는 먼저 실패하는 테스트를 추가하거나 기존 테스트로 재현한다.

테스트하기 어려운 코드는 UI, hook, util, client layer의 책임을 다시 분리한다.

## 문서 싱크

프론트엔드 구조나 command client layer 방식이 바뀌면 이 문서를 함께 수정한다.
