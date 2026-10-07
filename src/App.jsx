import { useState } from "react";
import SiteHeader from "./components/siteHeader/index.jsx";
import TokenSidebar from "./components/tokenSidebar/index.jsx";
import { starterTokens, tokenGroups } from "./data/tokenGroups.js";
import styles from "./App.module.css";

const App = () => {
    const [activeGroup, setActiveGroup] = useState("color");
    const activeDetails = tokenGroups.find((group) => group.id === activeGroup);
    const groupCount = starterTokens.filter((token) => token.group === activeGroup).length;

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.mainContent}>
                <section className={styles.pageIntro}>
                    <div>
                        <p className={styles.label}>Design system workspace</p>
                        <h1>One source for every design decision.</h1>
                        <p className={styles.description}>
                            Keep colors, type, spacing, and shape values ready to use across your product.
                        </p>
                    </div>
                    <span className={styles.saveState}>Changes save on this device</span>
                </section>
                <section className={styles.workspace} id="tokens" aria-label="Token workspace">
                    <TokenSidebar
                        groups={tokenGroups}
                        tokens={starterTokens}
                        activeGroup={activeGroup}
                        onSelectGroup={setActiveGroup}
                    />
                    <div className={styles.tokenArea}>
                        <div className={styles.workspaceHeading}>
                            <div>
                                <p className={styles.label}>Token group</p>
                                <h2>{activeDetails?.label}</h2>
                            </div>
                            <span>{groupCount} tokens</span>
                        </div>
                        <div className={styles.placeholder}>
                            <h3>{activeDetails?.label} values</h3>
                            <p>Select a category to view its design values.</p>
                        </div>
                    </div>
                </section>
                <section className={styles.placeholder} id="preview">
                    <h2>Live preview</h2>
                    <p>See how the design values work together.</p>
                </section>
                <section className={styles.placeholder} id="export">
                    <h2>Export tokens</h2>
                    <p>Copy reusable values into your project.</p>
                </section>
            </main>
        </div>
    );
};

export default App;
