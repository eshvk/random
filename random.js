function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var w = 600,
    h = 300,
    padding = 3,
    buttonRadius = 10,
    sampleR = 5,
    refreshT = 50,
    colorMap = {1: "#ca0020", 2: "#f4a582", 3:"#92c5de", 4: "#0571b0"};
var eS = 30;
var svg = d3.select("body")
    .append("svg");
svg.attr("width", w)
    .attr("height", h)
    .append("rect")
    .attr("class", "background")
    .attr("width", "100%")
    .attr("height", "100%");
svg
    .append("circle")
    .attr("class", "button")
    .attr("cx", w / 8 + padding)
    .attr("cy", eS / 2 + padding)
    .attr("fill-opacity", "0.5")
    .attr("r", buttonRadius);
var equation = svg
    .append("g")
    .attr("class", "equation")
    .attr("transform", "translate(0," + h/2 + ")");
equation
    .append("text")
    .attr("x", padding)
    .attr("y", padding )
    .text("X( ")
equation
    .append("circle")
    .attr("class", "randominp")
    .attr("cx", padding + 20 + sampleR)
    .attr("cy", -padding/2)
    .attr("stroke", "#111111")
    .attr("stroke-width", "1.0")
    .attr("r", sampleR)
    .attr("fill", "none");
equation
    .append("text")
    .attr("x", padding + 20 + 5  + 2* sampleR)
    .attr("y", padding )
    .text(") = ");
equation
    .append("text")
    .attr("class", "randomvalue")
    .attr("x", padding + 20 + 10 + 20 + 2* sampleR)
    .attr("y", padding)
    .attr("opacity", 0);

var events = svg.append("g");
events.append("rect")
    .attr("class", "event")
    .attr("x", w / 2 - eS)
    .attr("y", padding)
    .attr("id", 1)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", colorMap[1])
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w / 2)
    .attr("y", padding)
    .attr("id", 2)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", colorMap[2])
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w / 2 - eS)
    .attr("y", padding + eS)
    .attr("id", 3)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", colorMap[3])
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w / 2)
    .attr("y", padding + eS)
    .attr("id", 4)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", colorMap[4])
    .attr("fill-opacity", "0.5");

function getSamples() {
    return Math.floor(Math.random() * 4) + 1;
}
var curr;

function updateRVO(t, c) {
    d3
    .selectAll(".randomvalue")
    .text(c)
    .transition(t)
    .style("opacity", "1")
    .transition()
    .duration(refreshT)
    .style("opacity", "0");  
}

function updateRVI(t, c) {
    d3
    .selectAll(".randominp")
    .transition(t)
    .attr("fill", colorMap[c])
    .transition()
    .duration(refreshT)
    .attr("fill", "none");
}


function sampleUp(t) {
    curr = getSamples();
    updateRVO(t, curr);
    updateRVI(t, curr);
    d3
        .selectAll(".event")
        .filter(function() {
            return d3.select(this).attr('id') == curr;
        })
        .transition(t)
        .attr("fill-opacity", "1")
        .transition()
        .duration(refreshT)
        .attr("fill-opacity", "0.5")
        .on("end", sampleUp);
}

d3.selectAll(".button")
    .on("mouseover", function() {d3.select(this).attr("fill-opacity", "1.0");})
    .on("mouseout", function() {d3.select(this).attr("fill-opacity", "0.5")})
    .on("click", function() {
        var t = d3.transition()
        .duration(refreshT);
        sampleUp(t);
    })