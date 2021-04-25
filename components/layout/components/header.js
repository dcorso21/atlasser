import styles from "./header.module.scss";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={`${styles.section} ${styles.title}`}>Atlasser</div>
            <div className={styles.section}>Home</div>
            <div className={styles.section}>Projects</div>
        </div>
    );
}
