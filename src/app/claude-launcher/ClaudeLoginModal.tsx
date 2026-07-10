import { styles } from "../app.styles";

interface ClaudeLoginModalProps {
  disabled: boolean;
  onClose: () => void;
  onRefreshStatus: () => void;
  onStartLogin: () => void;
}

export function ClaudeLoginModal({
  disabled,
  onClose,
  onRefreshStatus,
  onStartLogin,
}: ClaudeLoginModalProps) {
  return (
    <div className={styles.modalBackdrop}>
      <dialog aria-labelledby="login-title" className={styles.modal} open>
        <div className={styles.panelHeader}>
          <span id="login-title">claude login</span>
          <button className={styles.iconButton} onClick={onClose} type="button">
            x
          </button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalCopy}>
            `claude auth login`을 별도 Terminal process로 실행한다. 브라우저 인증이 끝나면 status를
            다시 확인한다.
          </p>
          <div className={styles.launcherActions}>
            <button
              className={styles.primaryButton(false)}
              disabled={disabled}
              onClick={onStartLogin}
              type="button"
            >
              start login
            </button>
            <button className={styles.secondaryButton} onClick={onRefreshStatus} type="button">
              check status
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
