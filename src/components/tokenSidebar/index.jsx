import { FiDroplet, FiLayers, FiMove, FiSquare, FiType } from "react-icons/fi";
import styles from "./styles.module.css";

const groupIcons = {
    color: FiDroplet,
    type: FiType,
    space: FiMove,
    radius: FiSquare,
    shadow: FiLayers,
};

const TokenSidebar = ({ groups, tokens, activeGroup, onSelectGroup }) => {
    return (
        <aside className={styles.tokenSidebar} aria-label="Token categories">
            <div className={styles.sidebarHeading}>
                <h2>Library</h2>
                <span>{tokens.length}</span>
            </div>
            <p className={styles.sidebarDescription}>Foundation tokens</p>
            <nav className={styles.groupList} aria-label="Token groups">
                {groups.map((group) => {
                    const Icon = groupIcons[group.id];
                    const count = tokens.filter(
                        (token) => token.group === group.id,
                    ).length;
                    const isActive = group.id === activeGroup;

                    return (
                        <button
                            className={
                                isActive
                                    ? styles.groupButtonActive
                                    : styles.groupButton
                            }
                            type="button"
                            key={group.id}
                            onClick={() => onSelectGroup(group.id)}
                            aria-pressed={isActive}
                        >
                            <span
                                className={styles.groupIcon}
                                aria-hidden="true"
                            >
                                <Icon />
                            </span>
                            <span className={styles.groupText}>
                                <span className={styles.groupName}>
                                    {group.label}
                                </span>
                                <span className={styles.groupDescription}>
                                    {group.description}
                                </span>
                            </span>
                            <span className={styles.groupCount}>{count}</span>
                        </button>
                    );
                })}
            </nav>
            <div className={styles.sidebarNote}>
                <span className={styles.noteDot} aria-hidden="true" />
                <p>Edits are saved in this browser.</p>
            </div>
        </aside>
    );
};

export default TokenSidebar;
