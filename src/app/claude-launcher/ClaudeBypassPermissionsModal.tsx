import { css } from "../../../styled-system/css";
import { MONO_FONT } from "../../shared/styles/typography";
import { ClaudeDialog } from "./ClaudeDialog";

const body = css({
  display: "grid",
  gap: "16px",
  padding: "16px",
});

const warning = css({
  borderLeft: "2px solid token(colors.status.danger)",
  color: "status.danger",
  fontFamily: MONO_FONT,
  fontSize: "0.82rem",
  lineHeight: "1.6",
  margin: "0",
  overflowWrap: "anywhere",
  paddingLeft: "12px",
});

const actions = css({
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
});

const button = css({
  background: "surface.subtle",
  border: "1px solid token(colors.border.neutral)",
  borderRadius: "7px",
  color: "fg.default",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  minHeight: "38px",
  paddingInline: "13px",
});

const dangerButton = css({
  background: "rgba(255, 95, 122, 0.12)",
  borderColor: "status.danger",
  color: "status.danger",

  _hover: {
    borderColor: "status.danger",
    color: "status.danger",
  },
});

interface ClaudeBypassPermissionsModalProps {
  cwd: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ClaudeBypassPermissionsModal({
  cwd,
  isOpen,
  onCancel,
  onConfirm,
}: ClaudeBypassPermissionsModalProps) {
  return (
    <ClaudeDialog isOpen={isOpen} onClose={onCancel} title="confirm bypass permissions">
      <div className={body}>
        <p className={warning}>
          {cwd}에서 Claude Code permission prompt를 건너뛰고 실행한다. 이 경로와 실행 모드를 다시
          확인한다.
        </p>
        <div className={actions}>
          <button className={button} onClick={onCancel} type="button">
            cancel
          </button>
          <button className={`${button} ${dangerButton}`} onClick={onConfirm} type="button">
            confirm launch
          </button>
        </div>
      </div>
    </ClaudeDialog>
  );
}
