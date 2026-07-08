# Rust 컨벤션

## 역할

Rust backend는 로컬 시스템 기능을 안전하게 감싸는 layer다.

Rust 코드는 Frontend가 직접 수행하면 위험하거나 불가능한 작업을 담당한다.

## 기본 원칙

간단하고 명시적인 코드를 우선한다.

과한 추상화, 복잡한 lifetime 설계, 불필요한 macro 사용을 피한다.

Tauri command의 입력과 출력 타입은 명확하게 정의한다.

파일 경로, 프로세스 실행, Git 명령, 터미널 세션은 작은 함수로 분리한다.

## 에러 처리

실패 가능한 작업은 `Result`로 표현한다.

에러를 무시하지 않는다.

사용자에게 보여줄 메시지와 내부 디버깅 정보를 구분한다.

`unwrap`과 `expect`는 테스트 코드나 명확하게 안전한 초기화 코드에서만 사용한다.

## Tauri command

Frontend에 노출되는 command는 얇게 유지한다.

command 내부에 모든 로직을 몰아넣지 않는다.

실제 로직은 별도 함수나 module로 분리한다.

command의 request와 response 타입은 `serde` 직렬화가 가능한 struct로 정의한다.

## 로컬 시스템 작업

사용자 입력으로 임의 shell command를 실행하는 구조를 만들지 않는다.

파일 시스템 접근은 허용된 workspace 또는 명시적으로 선택된 경로를 기준으로 한다.

Git 명령은 필요한 인자만 명시적으로 조립한다.

프로세스 실행은 목적별 함수로 감싼다.

## 모듈 구조

기능 기준으로 module을 나눈다.

예상 module은 다음과 같다.

* `commands`
* `fs`
* `git`
* `terminal`
* `process`
* `state`

## 테스트

Rust 코드는 테스트 코드를 함께 작성한다.

순수 로직은 unit test로 검증한다.

파일 시스템, Git, 프로세스 실행처럼 외부 상태를 다루는 코드는 작은 함수로 분리하고 테스트 가능한 경계를 만든다.

버그를 수정할 때는 먼저 실패하는 테스트를 추가하거나 기존 테스트로 재현한다.

테스트하기 어려운 코드는 command, domain logic, system boundary의 책임을 다시 분리한다.

## 금지 사항

사용자 입력으로 임의 명령을 실행할 수 있는 구조를 만들지 않는다.

Frontend가 직접 shell command를 실행하도록 우회 API를 만들지 않는다.

## 담당 영역

Rust backend는 다음 영역을 담당할 수 있다.

* 파일 시스템 접근
* 프로세스 실행
* 터미널 세션 관리
* Git 명령 실행
* 파일 변경 감지
* 로컬 상태 저장

## 검증

Rust 변경 후 가능한 경우 다음을 실행한다.

```bash
cargo fmt --check
cargo check
cargo clippy -- -D warnings
cargo test
```

## 문서 싱크

Rust command 구조, 입력과 출력 타입, 로컬 시스템 접근 방식이 바뀌면 이 문서를 함께 수정한다.
