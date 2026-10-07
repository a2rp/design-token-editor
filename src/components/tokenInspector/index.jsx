import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import DeleteTokenDialog from "./deleteTokenDialog/index.jsx";
import { getTokenVariable } from "../../utils/tokenNames.js";
import styles from "./styles.module.css";

const TokenInspector = ({ token, groupLabel, onUpdate, onDelete }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const isColor = token?.kind === "color";
    const safeColor = /^#[0-9a-f]{6}$/i.test(token?.value || "") ? token.value : "#087E83";

    if (!token) {
        return (
            <aside className={styles.tokenInspector} aria-label="Token details">
                <p className={styles.emptyMessage}>Choose a token to edit its details.</p>
            </aside>
        );
    }

    return (
        <aside className={styles.tokenInspector} aria-label="Token details">
            <div className={styles.inspectorHeading}>
                <div>
                    <p className={styles.groupLabel}>{groupLabel}</p>
                    <h2>Token details</h2>
                </div>
                <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => setDeleteOpen(true)}
                    aria-label={"Delete " + token.name}
                >
                    <FiTrash2 aria-hidden="true" />
                </button>
            </div>

            <div className={styles.valuePreview}>
                {isColor ? (
                    <span className={styles.colorPreview} style={{ backgroundColor: safeColor }} />
                ) : (
                    <span className={styles.textPreview}>{token.value}</span>
                )}
                <span className={styles.previewName}>{token.name}</span>
            </div>

            <label className={styles.field}>
                <span>Token name</span>
                <input
                    type="text"
                    value={token.name}
                    maxLength={40}
                    onChange={(event) => onUpdate(token.id, { name: event.target.value })}
                />
            </label>

            <div className={styles.field}>
                <span>Value</span>
                <div className={styles.valueField}>
                    <input
                        type="text"
                        value={token.value}
                        onChange={(event) => onUpdate(token.id, { value: event.target.value })}
                        aria-label="Token value"
                    />
                    {isColor && (
                        <label className={styles.colorPicker}>
                            <input
                                type="color"
                                value={safeColor}
                                onChange={(event) => onUpdate(token.id, { value: event.target.value.toUpperCase() })}
                                aria-label="Choose token color"
                            />
                        </label>
                    )}
                </div>
            </div>

            <div className={styles.variableInfo}>
                <span>CSS variable</span>
                <code>{getTokenVariable(token)}</code>
                <p>Use this name in your stylesheets.</p>
            </div>

            <DeleteTokenDialog
                token={token}
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => {
                    onDelete(token.id);
                    setDeleteOpen(false);
                }}
            />
        </aside>
    );
};

export default TokenInspector;
