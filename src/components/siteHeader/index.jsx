import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLayers, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const closeMenu = (event) => {
            if (event.type === "keydown" && event.key === "Escape") {
                setMenuOpen(false);
            }

            if (
                event.type === "mousedown" &&
                headerRef.current &&
                !headerRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", closeMenu);
        document.addEventListener("mousedown", closeMenu);

        return () => {
            document.removeEventListener("keydown", closeMenu);
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    const closeAfterNavigation = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.headerInner}>
                <a
                    className={styles.brand}
                    href="#top"
                    onClick={closeAfterNavigation}
                >
                    <span className={styles.brandMark} aria-hidden="true">
                        <FiLayers />
                    </span>
                    <span>Token Desk</span>
                </a>

                <button
                    className={styles.menuButton}
                    type="button"
                    aria-label={
                        menuOpen ? "Close navigation" : "Open navigation"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <FiX aria-hidden="true" />
                    ) : (
                        <FiMenu aria-hidden="true" />
                    )}
                </button>

                <nav
                    className={
                        menuOpen ? styles.navigationOpen : styles.navigation
                    }
                    aria-label="Main navigation"
                    id="main-navigation"
                >
                    <a href="#tokens" onClick={closeAfterNavigation}>
                        Tokens
                    </a>
                    <a href="#preview" onClick={closeAfterNavigation}>
                        Preview
                    </a>
                    <a href="#export" onClick={closeAfterNavigation}>
                        Export
                    </a>
                </nav>

                <a
                    className={styles.repositoryLink}
                    href="https://github.com/a2rp/design-token-editor"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Repository"
                >
                    <FiGithub aria-hidden="true" />
                    <span>Repository</span>
                </a>
            </div>
        </header>
    );
};

export default SiteHeader;
