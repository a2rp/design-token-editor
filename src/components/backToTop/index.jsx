import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styles from "./styles.module.css";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => setVisible(window.scrollY > 50);

        window.addEventListener("scroll", updateVisibility, { passive: true });
        updateVisibility();

        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <button
            className={styles.backToTop}
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <FiArrowUp aria-hidden="true" />
        </button>
    );
};

export default BackToTop;
