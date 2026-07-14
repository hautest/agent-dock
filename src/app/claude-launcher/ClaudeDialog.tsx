import { css } from "../../../styled-system/css";
import { useEffect, useRef, type ReactNode } from "react";
import { MONO_FONT } from "../../shared/styles/typography";
import { styles } from "../app.styles";

const dialog = css({
  background:
    "linear-gradient(180deg, token(colors.fill.panelTop), token(colors.fill.panelBottom)), token(colors.surface.default)",
  border: "1px solid token(colors.border.success)",
  borderRadius: "8px",
  boxShadow: "0 26px 80px token(colors.effect.panelShadow)",
  color: "fg.default",
  margin: "auto",
  maxWidth: "520px",
  overflow: "hidden",
  padding: "0",
  width: "calc(100% - 36px)",

  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.68)",
  },
});

const closeButton = css({
  background: "transparent",
  border: "0",
  color: "fg.muted",
  cursor: "pointer",
  fontFamily: MONO_FONT,
  fontSize: "0.92rem",
  minHeight: "32px",
  minWidth: "32px",

  _hover: {
    color: "status.success",
  },
});

interface ClaudeDialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ClaudeDialog({ children, isOpen, onClose, title }: ClaudeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialogRef.current;
    if (!element) {
      return;
    }

    if (isOpen && !element.open) {
      element.showModal();
    } else if (!isOpen && element.open) {
      element.close();
    }

    return () => {
      if (element.open) {
        element.close();
      }
    };
  }, [isOpen]);

  return (
    <dialog
      aria-labelledby="claude-dialog-title"
      className={dialog}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      ref={dialogRef}
    >
      <div className={styles.panelHeader}>
        <span id="claude-dialog-title">{title}</span>
        <button aria-label="close" className={closeButton} onClick={onClose} type="button">
          x
        </button>
      </div>
      {children}
    </dialog>
  );
}
