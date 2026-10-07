import styles from "./App.module.css";

const App = () => {
    return (
        <main className={styles.appShell}>
            <section className={styles.welcome}>
                <h1>Design token editor</h1>
                <p>Organize the values that make a design system consistent.</p>
            </section>
        </main>
    );
};

export default App;
