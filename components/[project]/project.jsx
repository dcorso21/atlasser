import styles from "./project.module.scss";
import Timeline from "./sub/timeline";

let data = [
    {
        name: "Socrates",
        desc: "this is the desc for David",
        img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biography.com%2F.image%2Ft_share%2FMTE5NTU2MzE2MzcyODk1MjQz%2Fsocrates-9488126-1-402.jpg&f=1&nofb=1",
    },
    {
        name: "Andreia",
        desc: "this is the desc for Andreia",
        img:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biography.com%2F.image%2Ft_share%2FMTE5NTU2MzE2MzcyODk1MjQz%2Fsocrates-9488126-1-402.jpg&f=1&nofb=1",
    },
];

export default function Project() {
    return (
        <div className={styles.main}>
                <Timeline/>
        </div>
    );
}
