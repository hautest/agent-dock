# 디자인 색상 토큰 가이드

## 목적

이 문서는 Agent Dock의 색상 token을 어떤 상황에서 사용하는지 정의한다.

색상 값은 `panda.config.ts`의 primitive token에 둔다.

화면 구현은 semantic token을 우선 사용한다.

## 기본 원칙

Primitive token은 색상 값의 출처를 보존한다.

Semantic token은 UI 의도를 표현한다.

새 UI는 `core`, `text`, `brand`, `signal`, `line`, `fill`, `fx` 같은 primitive token을 직접 사용하지 않고 `bg`, `surface`, `fg`, `border`, `accent`, `status`, `terminal`, `code`, `effect` semantic token을 사용한다.

## 배경

`bg.canvas`는 앱 전체의 가장 낮은 배경에 사용한다.

`bg.canvasRaised`는 전체 배경 안에서 깊이를 만들 때 사용한다.

`bg.code`는 코드 preview, editor surface, grid texture가 필요한 코드 영역에 사용한다.

`bg.terminal`은 terminal output과 log stream의 내부 배경에 사용한다.

## 표면

`surface.default`는 기본 panel과 sidebar surface에 사용한다.

`surface.elevated`는 기본 panel보다 한 단계 높은 표면에 사용한다.

`surface.shell`은 command pill, prompt-like control, terminal shell chrome에 사용한다.

`surface.subtle`은 list row, inactive tab, 약한 반복 항목 배경에 사용한다.

`surface.selected`는 선택된 tab이나 선택된 control의 배경에 사용한다.

`surface.selectedSuccess`와 `surface.selectedAccent`는 활성 agent row처럼 선택 상태와 정상 연결 상태가 함께 필요한 경우 gradient stop으로 사용한다.

## 텍스트

`fg.default`는 기본 본문 텍스트에 사용한다.

`fg.strong`은 제품명, 주요 제목, 강한 헤드라인에 사용한다.

`fg.inverse`는 어두운 surface 위에서 가장 강한 텍스트에 사용한다.

`fg.code`는 code preview 본문에 사용한다.

`fg.muted`는 보조 설명, repo 이름, path metadata에 사용한다.

`fg.subtle`은 panel header의 보조 값처럼 낮은 우선순위 텍스트에 사용한다.

`fg.dim`은 거의 배경에 가까운 보조 정보에 사용한다.

`fg.tab`은 inactive tab label에 사용한다.

## 경계선

`border.default`는 기본 panel 경계선에 사용한다.

`border.subtle`은 panel header divider처럼 내부 구분선에 사용한다.

`border.selected`는 selected tab, selected control 경계에 사용한다.

`border.code`는 code window 경계에 사용한다.

`border.success`는 정상 연결, terminal, prompt 계열 경계에 사용한다.

`border.successSubtle`은 terminal green 계열의 낮은 구분선에 사용한다.

`border.successStrong`은 active agent row처럼 현재 선택과 정상 상태가 동시에 중요한 항목에 사용한다.

`border.neutral`과 `border.neutralSubtle`은 색상 의미를 부여하지 않는 반복 항목 경계에 사용한다.

## 액센트와 상태

`accent.primary`는 Modern Dark의 주 액센트인 indigo에 사용한다.

`accent.secondary`는 syntax highlight, 보조 액센트, violet emphasis에 사용한다.

`status.success`는 `[OK]`, 연결됨, 실행 중, sync 완료, 정상 상태에 사용한다.

`status.warning`은 대기, 주의, 변경 감지, 강조가 필요한 terminal value에 사용한다.

`status.danger`는 실패, 위험, 삭제, 충돌 상태에 사용한다.

상태 색상은 가능한 경우 `[OK]`, `[WAIT]`, `dirty`, `failed` 같은 텍스트 라벨과 함께 사용한다.

## Terminal과 Code

`terminal.text`는 terminal log의 기본 출력에 사용한다.

`terminal.dim`은 timestamp, prompt prefix, 낮은 우선순위 terminal metadata에 사용한다.

`code.keyword`는 코드 preview의 keyword syntax에 사용한다.

`code.string`은 코드 preview의 string과 성공 계열 code value에 사용한다.

`code.lineNumber`는 line number와 editor gutter 정보에 사용한다.

## 효과

`effect.glowPrimary`는 selected item의 indigo glow에 사용한다.

`effect.glowPrimaryStrong`은 앱 배경의 약한 spotlight에 사용한다.

`effect.glowSuccess`는 terminal prompt나 shell control 주변의 낮은 glow에 사용한다.

`effect.glowSuccessSoft`는 앱 배경의 terminal green spotlight에 사용한다.

`effect.glowCursor`는 terminal cursor glow에 사용한다.

`effect.panelShadow`는 panel depth shadow에 사용한다.

`effect.scanline`은 CRT scanline texture에 사용한다.

`effect.highlight`는 panel 내부 상단 highlight에 사용한다.

효과 token은 제품 맥락을 강화할 때만 사용한다.

## 적용 규칙

React 컴포넌트 스타일은 Panda CSS `css`, `cva`, `sva` 같은 유틸 함수로 작성한다.

기존 CSS 파일은 점진 정리 대상이며, 새 색상 적용은 semantic token을 사용한다.

복합 background, gradient, shadow 안에서는 `token(colors.<semantic>)` 표현을 사용한다.

Primitive token 직접 사용은 `panda.config.ts` 내부 semantic token 정의에 한정한다.
