import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { css } from "../../../styled-system/css";
import { claudeOperationResultAtom } from "../../features/claude-code/claude-code-atoms";
import { startClaudeLogin } from "../../features/claude-code/claude-code-client";
import { claudeCliStatusQueryOptions } from "../../features/claude-code/claude-code-queries";
import { MONO_FONT } from "../../shared/styles/typography";
import { ClaudeDialog } from "./ClaudeDialog";

interface ClaudeLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClaudeLoginModal({ isOpen, onClose }: ClaudeLoginModalProps) {
  const queryClient = useQueryClient();
  const setOperationResult = useSetAtom(claudeOperationResultAtom);
  const loginMutation = useMutation({
    mutationFn: startClaudeLogin,
    onSuccess: setOperationResult,
  });
  const refreshMutation = useMutation({
    mutationFn: () =>
      queryClient.fetchQuery({
        ...claudeCliStatusQueryOptions,
        staleTime: 0,
      }),
  });
  const disabled = loginMutation.isPending || refreshMutation.isPending;
  const modalError = loginMutation.error ?? refreshMutation.error;

  return (
    <ClaudeDialog isOpen={isOpen} onClose={onClose} title="claude login">
      <div className={body}>
        <p className={copy}>
          <code>claude auth login</code>을 별도 Terminal process로 실행한다. 브라우저 인증이 끝나면
          status를 다시 확인한다.
        </p>
        {modalError ? (
          <p className={copy} role="alert">
            {modalError.message}
          </p>
        ) : null}
        <div className={actions}>
          <button
            className={button}
            disabled={disabled}
            onClick={() => loginMutation.mutate()}
            type="button"
          >
            start login
          </button>
          <button
            className={button}
            disabled={disabled}
            onClick={() => refreshMutation.mutate()}
            type="button"
          >
            check status
          </button>
        </div>
      </div>
    </ClaudeDialog>
  );
}

const body = css({
  display: "grid",
  gap: "16px",
  padding: "16px",
});

const copy = css({
  color: "fg.muted",
  fontFamily: MONO_FONT,
  fontSize: "0.82rem",
  lineHeight: "1.6",
  margin: "0",
});

const actions = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
});

const button = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  color: "fg.default",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  fontSize: "0.78rem",
  minHeight: "38px",
  paddingInline: "13px",

  _disabled: {
    cursor: "not-allowed",
    opacity: "0.5",
  },

  _hover: {
    borderColor: "border.success",
    color: "status.success",
  },
});
