export default function Period(periodDiv, styles) {
    // circle

    periodDiv
        .append("div")
        .attr("class", styles.left)
        .call((left) => {
            left.append("div")
                .attr("class", styles.circ)
                .call((circle) => {
                    circle
                        .append("img")
                        .attr(
                            "src",
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.biography.com%2F.image%2Ft_share%2FMTE5NTU2MzE2MzcyODk1MjQz%2Fsocrates-9488126-1-402.jpg&f=1&nofb=1"
                        );
                });

            // Adding title
            left.append("div")
                .text((d) => d.name)
                .attr("class", styles.title);
        });

    periodDiv
        .append("div")
        .attr("class", styles.right)
        .call((right) => {
            right.append("span").text("ex");
            right.append("span").text("details");
        });
}
