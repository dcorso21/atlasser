export default function Entry({ styles, d }) {
    return (
        <div className={styles.prof}>
            <img className={styles.photo} src={d.img} alt={d.name} />
            <div className={styles.tag}>{d.name}</div>
        </div>
    );
}
