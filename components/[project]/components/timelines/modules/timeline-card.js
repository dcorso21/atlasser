import * as d3 from "d3";
import styles from "../timeline.module.scss";

class tlRenderer {
    static height = 40;
    static delay = 20;
    static duration = 300;

    static handleShowDescription(e) {
        console.log(e);
        const bbox = e.target.getBoundingClientRect();
        let desc = d3.select(`.${styles.desc}`).style("color", "blue");
        // .style("top", bbox.top)
        // .style("left", bbox.left)

        console.log(desc);
    }

    static standardTrans() {
        return d3.transition().ease(d3.easePoly).duration(tlRenderer.duration);
    }

    static enterPeriods(enter) {
        let delayInd = -1;
        return enter
            .append("div")
            .on("click", (_, d) => tlRenderer.handleClick(d.updateFunc, d))
            .on("mouseover", tlRenderer.handleShowDescription)
            .attr("class", styles.period)
            .style("opacity", 0)
            .style("left", (d) => d.x)
            .style("top", (_, i) => tlRenderer.height * i + "px")
            .style("height", () => tlRenderer.height + "px")
            .style("width", (d) => d.width)
            .call((enter) => {
                let title = enter
                    .append("span")
                    .text((d) => d.name)
                    .attr("class", styles.title);

                enter
                    .transition(tlRenderer.standardTrans())
                    .delay(() => {
                        delayInd++;
                        return delayInd * tlRenderer.delay;
                    })
                    .style("opacity", 1);
            });
    }

    static updatePeriods(update) {
        let delayInd = -1;
        return update.call((update) => {
            update
                .transition(tlRenderer.standardTrans)
                .delay(() => {
                    delayInd++;
                    return delayInd * tlRenderer.delay;
                })
                .style("top", (_, i) => i * tlRenderer.height + "px");
        });
    }

    static exitPeriods(exit) {
        let delayInd = -1;
        return exit.call((exit) => {
            exit.transition(tlRenderer.standardTrans)
                .delay(() => {
                    delayInd++;
                    return delayInd * tlRenderer.delay;
                })
                .style("opacity", "0")
                .remove();
        });
    }

    /**
     * Click handler for period
     * @param {funcition} setFunc Function to redefine Periods
     * @param {object} p updated period object
     * @returns void
     */
    static handleClick(setFunc, p) {
        if (!p.subPeriods.length) return;
        let updated = { ...p };
        updated.extended = !updated.extended;
        delete updated.updateFunc;
        console.log("clickhandler", { updated });
        setFunc(updated);
    }
}

class tlUtils {
    /**
     * Transpose periods objects to array.
     * @param {object} periods
     * @param {object} data array - initially an empty one
     * @param {function} setFunc func to redefine periods
     * @returns data array for d3
     */
    static calcData(periods, data, setFunc) {
        periods.map((p, i) => {
            let funcs = tlUtils.createSubFuncs(periods, i, setFunc);
            data.push({
                ...p,
                updateFunc: funcs.baseUpdate,
            });

            // recursively add subperiods
            if (p.extended && p.subPeriods.length) {
                data = tlUtils.calcData(p.subPeriods, data, funcs.subUpdate);
            }
        });
        return data;
    }

    static convertPeriodsToData(periods, setFunc) {
        let data = tlUtils.calcData(periods, [], setFunc);
        const scales = tlUtils.getScales(data);

        return data.map((d, i) => {
            let x = scales.x(d.startDate);
            d.x = x + "%";
            d.width = Math.abs(scales.x(d.endDate) - x) + "%";
            return d;
        });
    }

    static createSubFuncs(periods, index, setFunc) {
        return {
            baseUpdate: (updatedPer) => {
                let updated = [...periods];
                updated[index] = updatedPer;
                console.log("setsubfunc:", { updated });
                setFunc(updated);
            },
            subUpdate: (updatedSubPeriods) => {
                let updated = [...periods];
                updated[index].subPeriods = updatedSubPeriods;
                console.log("setsubfunc:", { updated });
                setFunc(updated);
            },
        };
    }

    static getScales(data) {
        const tlStart = data.reduce((acc, el) => {
            let sd = el.startDate;
            return acc < sd ? acc : sd;
        }, data[0].startDate);

        const tlEnd = data.reduce((acc, el) => {
            let ed = el.endDate;
            return acc > ed ? acc : ed;
        }, data[0].endDate);

        const x = d3.scaleLinear().domain([tlStart, tlEnd]).range([0, 100]);

        return { x };
    }
}

export default function renderTimelines(ref, periods, setPeriods) {
    let data = tlUtils.convertPeriodsToData(periods, setPeriods);

    let periodClass = "." + styles.period;

    let tl = d3
        .select(ref)
        .selectAll(periodClass)
        .data(data, (d) => d.name)
        .join(
            tlRenderer.enterPeriods,
            tlRenderer.updatePeriods,
            tlRenderer.exitPeriods
        )
        .call(
            d3.zoom().on("zoom", (e) => {
                tl.attr("transform", e.transform);
            })
        );

    d3.selectAll(`.${styles.desc}`).exit().remove();

    d3.select(ref)
        .append("div")
        .attr("class", styles.desc)
        .text("This is the description of the period");
}
