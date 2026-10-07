import { useState } from "react";
import { FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { getTokenVariable } from "../../utils/tokenNames.js";
import styles from "./styles.module.css";

const ExportPanel = ({ tokens }) => {
    const [format, setFormat] = useState("css");
    const [status, setStatus] = useState("");
    const cssText = ":root {\n" + tokens.map((token) => "  " + getTokenVariable(token) + ": " + token.value + ";").join("\n") + "\n}";
    const jsonText = JSON.stringify(tokens.map(({ id, group, name, value, kind }) => ({ id, group, name, value, kind })), null, 2);
    const currentCode = format === "css" ? cssText : jsonText;

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(currentCode);
            setStatus((format === "css" ? "CSS" : "JSON") + " copied.");
        } catch {
            setStatus("Clipboard access is unavailable. Select and copy the code below.");
        }
    };

    const downloadCode = () => {
        const fileType = format === "css" ? "text/css" : "application/json";
        const fileName = format === "css" ? "design-tokens.css" : "design-tokens.json";
        const file = new Blob([currentCode], { type: fileType });
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = fileUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(fileUrl);
        setStatus(fileName + " downloaded.");
    };

    return (
        <section className={styles.exportPanel} id="export" aria-labelledby="export-title">
            <div className={styles.exportHeading}>
                <div>
                    <p className={styles.label}>Export</p>
                    <h2 id="export-title">Take your tokens with you.</h2>
                    <p>Copy the CSS variables or download your token list as JSON.</p>
                </div>
                <div className={styles.exportActions}>
                    <button className={styles.secondaryButton} type="button" onClick={copyCode}>
                        {status.includes("copied") ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                        <span>Copy code</span>
                    </button>
                    <button className={styles.primaryButton} type="button" onClick={downloadCode}>
                        <FiDownload aria-hidden="true" />
                        <span>Download file</span>
                    </button>
                </div>
            </div>

            <div className={styles.codeCard}>
                <div className={styles.codeToolbar}>
                    <div className={styles.formatTabs} role="group" aria-label="Export format">
                        <button
                            className={format === "css" ? styles.formatTabActive : styles.formatTab}
                            type="button"
                            aria-pressed={format === "css"}
                            onClick={() => {
                                setFormat("css");
                                setStatus("");
                            }}
                        >
                            CSS
                        </button>
                        <button
                            className={format === "json" ? styles.formatTabActive : styles.formatTab}
                            type="button"
                            aria-pressed={format === "json"}
                            onClick={() => {
                                setFormat("json");
                                setStatus("");
                            }}
                        >
                            JSON
                        </button>
                    </div>
                    <span className={styles.fileName}>{format === "css" ? "design-tokens.css" : "design-tokens.json"}</span>
                </div>
                <pre className={styles.codeOutput}><code>{currentCode}</code></pre>
                <p className={styles.exportStatus} role="status" aria-live="polite">{status}</p>
            </div>
        </section>
    );
};

export default ExportPanel;
