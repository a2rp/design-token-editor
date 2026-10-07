import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./styles.module.css";

const DeleteTokenDialog = ({ token, open, onClose, onConfirm }) => {
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        cancelButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key === "Tab") {
                const dialog =
                    event.currentTarget.querySelector("[role='dialog']");
                const buttons = dialog?.querySelectorAll("button");
                const firstButton = buttons?.[0];
                const lastButton = buttons?.[buttons.length - 1];

                if (event.shiftKey && document.activeElement === firstButton) {
                    event.preventDefault();
                    lastButton?.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === lastButton
                ) {
                    event.preventDefault();
                    firstButton?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open || !token) {
        return null;
    }

    return (
        <div
            className={styles.dialogBackdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={styles.deleteDialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-token-title"
                aria-describedby="delete-token-description"
            >
                <div className={styles.dialogIcon} aria-hidden="true">
                    <FiAlertTriangle />
                </div>
                <h2 id="delete-token-title">Delete this token?</h2>
                <p id="delete-token-description">
                    <strong>{token.name}</strong> will be removed from this
                    token set.
                </p>
                <div className={styles.dialogActions}>
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onClose}
                    >
                        Keep token
                    </button>
                    <button
                        className={styles.confirmButton}
                        type="button"
                        onClick={onConfirm}
                    >
                        Delete token
                    </button>
                </div>
            </section>
        </div>
    );
};

export default DeleteTokenDialog;
