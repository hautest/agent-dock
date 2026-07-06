---
name: address-pr-review
description: PR 코드 리뷰, 리뷰 코멘트, CodeRabbit 또는 사람 리뷰어의 피드백을 처리한다. 리뷰가 달린 PR에서 각 의견을 적대적으로 검증하고, 타당한 의견은 반영한 뒤 커밋 링크를 포함해 리뷰 댓글에 답하며, 타당하지 않은 의견은 근거를 들어 반박해야 할 때 사용한다.
---

# Address PR Review

## 원칙

리뷰 의견은 항상 적대적으로 검증한다.

리뷰어의 말이 맞다고 가정하지 않는다.

행동은 다음 둘만 가능하다.

* `찬성 후 반영`
* `반박`

의견 보류, 부분 동의, 묵살, 조용한 수정은 사용하지 않는다.

## 작업 흐름

1. 현재 브랜치, working tree, 대상 PR, remote를 확인한다.
2. PR의 일반 코멘트, 리뷰 본문, inline review comments를 모두 가져온다.
3. 각 리뷰 의견을 현재 코드와 문서 기준으로 검증한다.
4. 각 의견에 대해 `찬성 후 반영` 또는 `반박` 중 하나를 결정한다.
5. `찬성 후 반영` 항목만 최소 범위로 수정한다.
6. repo 문서 규칙에 따라 코드와 문서 싱크를 맞춘다.
7. 관련 검증 명령을 실행한다.
8. 변경 사항을 커밋하고 push한다.
9. 반영한 리뷰 댓글에는 커밋 링크를 포함해 답글을 남긴다.
10. 반박한 리뷰 댓글에는 코드, 문서, 검증 결과에 근거한 답글을 남긴다.
11. 최종 응답에 반영/반박 목록, 검증, 커밋, push, PR 상태를 요약한다.

## 리뷰 수집

가능하면 `gh`를 사용한다.

```bash
gh pr view <pr-number> --json url,headRefName,baseRefName,headRefOid,reviewDecision
gh api repos/<owner>/<repo>/issues/<pr-number>/comments
gh api repos/<owner>/<repo>/pulls/<pr-number>/reviews
gh api repos/<owner>/<repo>/pulls/<pr-number>/comments
```

자동 생성 walkthrough, 광고, checkbox, 단순 요약은 리뷰 의견으로 취급하지 않는다.

사용자 리뷰와 inline review comment를 우선한다.

## 결정 기준

### 찬성 후 반영

다음 중 하나라도 참이면 반영한다.

* 현재 코드나 문서에 실제 오류가 있다.
* 재현성, 보안, 타입 안정성, 유지보수성이 명확히 좋아진다.
* 사용자 의도와 repo 규칙에 맞는다.
* 변경 범위가 작고 부작용이 낮다.

반영할 때는 다음을 지킨다.

* 리뷰가 요구한 것보다 넓게 고치지 않는다.
* 관련 문서와 스펙 싱크를 확인한다.
* 검증 명령을 실행한다.
* 커밋 후 push한다.
* 해당 리뷰 댓글에 답글을 남긴다.
* 답글에는 커밋 링크를 포함한다.

답글 형식:

```md
찬성 후 반영했습니다.

- 반영 내용: <짧은 요약>
- 검증: `<명령>` 통과
- 커밋: <commit-url>
```

## 반박

다음 중 하나라도 참이면 반박한다.

* 리뷰가 현재 코드와 맞지 않는다.
* 리뷰가 repo 정책, 스펙, 사용자 의도와 충돌한다.
* 제안이 현재 범위보다 크거나 불필요한 복잡도를 만든다.
* 검증 가능한 이득이 없고 코드/문서 소음만 늘린다.

반박할 때는 다음을 지킨다.

* 감정 표현 없이 코드와 문서 근거만 제시한다.
* 필요한 경우 명령 출력이나 파일 경로를 언급한다.
* 코드 변경 없이 리뷰 댓글에 답한다.

답글 형식:

```md
반박합니다.

- 이유: <현재 코드/문서 기준 근거>
- 확인: <검증 또는 파일 경로>
```

## 댓글 작성

inline review comment에는 가능한 경우 해당 comment thread에 답한다.

```bash
gh api repos/<owner>/<repo>/pulls/<pr-number>/comments/<comment-id>/replies \
  -f body='<reply-body>'
```

일반 PR 코멘트나 리뷰 본문에는 PR comment로 답한다.

```bash
gh pr comment <pr-number> --body '<reply-body>'
```

커밋 링크는 push 후 최신 커밋 SHA로 만든다.

```bash
sha=$(git rev-parse HEAD)
gh api repos/<owner>/<repo>/commits/$sha --jq .html_url
```

## 완료 조건

다음을 모두 만족해야 작업을 완료로 보고한다.

* 모든 actionable 리뷰 의견이 `찬성 후 반영` 또는 `반박`으로 분류됐다.
* `찬성 후 반영` 항목은 코드/문서 수정, 검증, 커밋, push가 끝났다.
* 반영 댓글에는 커밋 링크가 포함됐다.
* `반박` 항목은 근거가 포함된 댓글을 남겼다.
* 최종 응답에 남은 한계와 PR 상태가 포함됐다.
