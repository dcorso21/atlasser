import { useEffect, useRef, useState } from "react";
import renderTimelines from "./modules/renderPeriods";
import { getPeriods } from "./funcs";
import styles from "./timeline.module.scss"

export default function Timeline() {
    const [periods, setPeriods] = useState(getPeriods());
    const mainRef = useRef();

    useEffect(d3Connection, []);
    useEffect(d3Connection, [periods]);

    function d3Connection() {
        renderTimelines(mainRef.current, periods, setPeriods);
    }

    return (
        <div
            ref={mainRef}
            className={styles.timeline}
        >
            {/* <div className={styles.desc}> This is the description</div> */}
            {/* <svg width="100%" height="100%" ref={svgRef}></svg> */}
            {/* <pre>{JSON.stringify(periods, null, 4)}</pre> */}
        </div>
    );
}
