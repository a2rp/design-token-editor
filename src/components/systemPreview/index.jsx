import { FiArrowUpRight, FiCheck, FiLayers } from "react-icons/fi";
import { getTokenValue } from "../../utils/tokenValues.js";
import styles from "./styles.module.css";

const SystemPreview = ({ tokens }) => {
    const canvas = getTokenValue(tokens, "color-canvas", "#EDF1F1");
    const surface = getTokenValue(tokens, "color-surface", "#FFFFFF");
    const ink = getTokenValue(tokens, "color-ink", "#1C2D32");
    const muted = getTokenValue(tokens, "color-muted", "#63777C");
    const primary = getTokenValue(tokens, "color-primary", "#087E83");
    const border = getTokenValue(tokens, "color-border", "#D7E1E1");
    const titleSize = getTokenValue(tokens, "type-title", "32px");
    const bodySize = getTokenValue(tokens, "type-body", "16px");
    const cardRadius = getTokenValue(tokens, "radius-large", "18px");
    const buttonRadius = getTokenValue(tokens, "radius-medium", "10px");
    const panelShadow = getTokenValue(
        tokens,
        "shadow-card",
        "0 2px 8px rgb(29 50 55 / 10%)",
    );
    const space = getTokenValue(tokens, "space-6", "24px");

    return (
        <section
            className={styles.systemPreview}
            id="preview"
            aria-labelledby="preview-title"
        >
            <div className={styles.previewHeading}>
                <div>
                    <p className={styles.label}>Preview</p>
                    <h2 id="preview-title">See your system at work.</h2>
                    <p>
                        Changes in the token library update this sample right
                        away.
                    </p>
                </div>
                <span className={styles.liveStatus}>
                    <span aria-hidden="true" />
                    Live preview
                </span>
            </div>

            <div
                className={styles.previewStage}
                style={{ backgroundColor: canvas }}
            >
                <article
                    className={styles.sampleCard}
                    style={{
                        backgroundColor: surface,
                        borderColor: border,
                        borderRadius: cardRadius,
                        boxShadow: panelShadow,
                        padding: space,
                    }}
                >
                    <div className={styles.cardTop}>
                        <span
                            className={styles.productMark}
                            style={{ backgroundColor: primary }}
                        >
                            <FiLayers aria-hidden="true" />
                        </span>
                        <span
                            className={styles.cardCategory}
                            style={{ color: muted }}
                        >
                            Workspace
                        </span>
                        <button
                            className={styles.openButton}
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("tokens")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            style={{
                                backgroundColor: primary,
                                borderRadius: buttonRadius,
                            }}
                        >
                            Edit tokens
                            <FiArrowUpRight aria-hidden="true" />
                        </button>
                    </div>
                    <h3 style={{ color: ink, fontSize: titleSize }}>
                        Bring clarity to every choice.
                    </h3>
                    <p
                        className={styles.cardDescription}
                        style={{ color: muted, fontSize: bodySize }}
                    >
                        Keep shared decisions visible and help every detail feel
                        connected.
                    </p>
                    <div
                        className={styles.cardFooter}
                        style={{ borderColor: border }}
                    >
                        <span style={{ color: muted }}>
                            <FiCheck aria-hidden="true" />
                            All values linked
                        </span>
                        <span className={styles.sampleDate}>Updated today</span>
                    </div>
                </article>

                <aside className={styles.tokenReadout}>
                    <h3>Applied values</h3>
                    <p>These are used by the sample card.</p>
                    <ul>
                        <li>
                            <span>Primary</span>
                            <code>{primary}</code>
                        </li>
                        <li>
                            <span>Title size</span>
                            <code>{titleSize}</code>
                        </li>
                        <li>
                            <span>Card radius</span>
                            <code>{cardRadius}</code>
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    );
};

export default SystemPreview;
