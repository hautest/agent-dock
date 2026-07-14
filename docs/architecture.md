# 아키텍처

## 기본 구조

Frontend는 UI와 사용자 상호작용을 담당한다.

Rust backend는 로컬 시스템 작업을 담당한다.

Frontend와 Rust backend 사이에는 명확한 command/API layer를 둔다.

## Rust backend 책임

Rust backend가 담당할 수 있는 영역은 다음과 같다.

* 파일 시스템 접근
* 프로세스 실행
* 터미널 세션 관리
* Git 명령 실행
* 파일 변경 감지
* 로컬 상태 저장

## Frontend 책임

Frontend는 다음 영역을 담당한다.

* agent 선택 UI
* sidebar UI
* 파일 트리 UI
* 에디터 탭 UI
* 터미널 패널 UI
* Git 상태 표시 UI
* 사용자 상호작용 상태 관리

## Frontend 상태 경계

Tauri command에서 조회하는 server state와 mutation은 TanStack Query가 관리한다.

Suspense 기반 server state 경계는 Suspensive로 표현한다.

여러 화면 조각이 공유하는 agent launcher 상태는 Jotai가 관리한다.

Modal과 confirm UI의 생명주기는 overlay-kit이 관리한다.

## 경계

Frontend에서 임의의 shell command를 직접 실행하지 않는다.

로컬 시스템 접근은 Rust backend command를 통해 수행한다.

command 입력과 출력 타입은 명확하게 정의한다.

외부 process를 기다리는 Tauri command는 async command와 blocking worker 경계를 사용한다.
