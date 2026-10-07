import { useEffect, useState } from "react";
import ExportPanel from "./components/exportPanel/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SystemPreview from "./components/systemPreview/index.jsx";
import TokenBoard from "./components/tokenBoard/index.jsx";
import TokenInspector from "./components/tokenInspector/index.jsx";
import TokenSidebar from "./components/tokenSidebar/index.jsx";
import { starterTokens, tokenGroups } from "./data/tokenGroups.js";
import styles from "./App.module.css";

const storageKey = "design-token-editor-tokens";

const readSavedTokens = () => {
    try {
        const savedTokens = localStorage.getItem(storageKey);
        const parsedTokens = savedTokens ? JSON.parse(savedTokens) : null;
        return Array.isArray(parsedTokens) ? parsedTokens : starterTokens.map((token) => ({ ...token }));
    } catch {
        return starterTokens.map((token) => ({ ...token }));
    }
};

const newTokenDefaults = {
    color: { value: "#A4CEC9", kind: "color" },
    type: { value: "16px", kind: "fontSize" },
    space: { value: "16px", kind: "length" },
    radius: { value: "8px", kind: "length" },
    shadow: { value: "0 4px 12px rgb(29 50 55 / 12%)", kind: "shadow" },
};

const App = () => {
    const [activeGroup, setActiveGroup] = useState("color");
    const [tokens, setTokens] = useState(readSavedTokens);
    const [selectedTokenId, setSelectedTokenId] = useState("color-primary");
    const activeDetails = tokenGroups.find((group) => group.id === activeGroup);
    const activeTokens = tokens.filter((token) => token.group === activeGroup);
    const selectedToken = activeTokens.find((token) => token.id === selectedTokenId) || activeTokens[0];

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(tokens));
        } catch {
            return;
        }
    }, [tokens]);

    const addToken = () => {
        let name = "new-token";
        let suffix = 2;

        while (tokens.some((token) => token.group === activeGroup && token.name === name)) {
            name = "new-token-" + suffix;
            suffix += 1;
        }

        const token = {
            id: "custom-" + Date.now(),
            group: activeGroup,
            name,
            ...newTokenDefaults[activeGroup],
        };

        setTokens([...tokens, token]);
        setSelectedTokenId(token.id);
    };

    const updateToken = (tokenId, updates) => {
        setTokens(tokens.map((token) => token.id === tokenId ? { ...token, ...updates } : token));
    };

    const deleteToken = (tokenId) => {
        const nextTokens = tokens.filter((token) => token.id !== tokenId);
        const nextSelection = nextTokens.find((token) => token.group === activeGroup);

        setTokens(nextTokens);
        setSelectedTokenId(nextSelection?.id || "");
    };

    const selectGroup = (groupId) => {
        setActiveGroup(groupId);
        const firstToken = tokens.find((token) => token.group === groupId);
        setSelectedTokenId(firstToken?.id || "");
    };

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
                        tokens={tokens}
                        activeGroup={activeGroup}
                        onSelectGroup={selectGroup}
                    />
                    <div className={styles.tokenArea}>
                        <TokenBoard
                            group={activeDetails}
                            tokens={activeTokens}
                            selectedId={selectedToken?.id}
                            onSelectToken={setSelectedTokenId}
                            onAddToken={addToken}
                        />
                    </div>
                    <TokenInspector
                        token={selectedToken}
                        groupLabel={activeDetails?.label}
                        onUpdate={updateToken}
                        onDelete={deleteToken}
                    />
                </section>
                <SystemPreview tokens={tokens} />
                <ExportPanel tokens={tokens} />
            </main>
        </div>
    );
};

export default App;
