import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => {
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
                <section className={styles.placeholder} id="tokens">
                    <h2>Token library</h2>
                    <p>Your design values will be ready to edit here.</p>
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
