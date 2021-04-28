export default function Period(enter, styles) {
    // Adding title
    enter
        .append("div")
        .text((d) => d.name)
        .attr("class", styles.title);

    enter.append("i").attr("class", "fas fa-expand");
}
