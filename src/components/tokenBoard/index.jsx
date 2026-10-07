import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { getTokenVariable } from "../../utils/tokenNames.js";
import styles from "./styles.module.css";

const TokenBoard = ({ group, tokens, selectedId, onSelectToken, onAddToken }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const visibleTokens = tokens.filter((token) => {
        const searchText = (token.name + " " + token.value).toLowerCase();
        return searchText.includes(searchTerm.trim().toLowerCase());
    });

    const renderPreview = (token) => {
        if (token.kind === "color") {
            return (
                <span
                    className={styles.colorSample}
                    style={{ backgroundColor: token.value }}
                    aria-label={token.value}
                />
            );
        }

        if (token.kind === "fontSize" || token.kind === "fontWeight") {
            const fontSize = token.kind === "fontSize" ? token.value : "20px";
            const fontWeight = token.kind === "fontWeight" ? token.value : "600";

            return (
                <span className={styles.typeSample} style={{ fontSize, fontWeight }}>
                    Aa
                </span>
            );
        }

        if (group.id === "radius") {
            return (
                <span
                    className={styles.radiusSample}
                    style={{ borderRadius: token.value }}
                    aria-hidden="true"
                />
            );
        }

        if (token.kind === "shadow") {
            return <span className={styles.shadowSample} style={{ boxShadow: token.value }} />;
        }

        const length = Number.parseFloat(token.value);
        const barWidth = Math.max(10, Math.min(length * 2, 112));

        return <span className={styles.spaceSample} style={{ width: barWidth + "px" }} />;
    };

    return (
        <section className={styles.tokenBoard} aria-labelledby="token-board-title">
            <div className={styles.boardToolbar}>
                <label className={styles.searchField}>
                    <FiSearch aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Find a token"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        aria-label="Find a token"
                    />
                </label>
                <button className={styles.addButton} type="button" onClick={onAddToken}>
                    <FiPlus aria-hidden="true" />
                    <span>Add token</span>
                </button>
            </div>

            <div className={styles.boardHeading}>
                <div>
                    <p className={styles.label}>Token group</p>
                    <h2 id="token-board-title">{group.label}</h2>
                </div>
                <span className={styles.tokenCount}>{tokens.length} values</span>
            </div>

            {visibleTokens.length ? (
                <div className={styles.tokenGrid}>
                    {visibleTokens.map((token) => {
                        const isSelected = token.id === selectedId;
                        const variableName = getTokenVariable(token);

                        return (
                            <button
                                className={isSelected ? styles.tokenCardSelected : styles.tokenCard}
                                type="button"
                                key={token.id}
                                onClick={() => onSelectToken(token.id)}
                                aria-pressed={isSelected}
                            >
                                <span className={styles.previewArea}>
                                    {renderPreview(token)}
                                </span>
                                <span className={styles.cardDetails}>
                                    <span className={styles.tokenName}>{token.name}</span>
                                    <span className={styles.tokenValue}>{token.value}</span>
                                    <span className={styles.variableName}>{variableName}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <h3>No tokens found</h3>
                    <p>Try another name or value.</p>
                </div>
            )}
        </section>
    );
};

export default TokenBoard;
