function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var w = 600,
    h = 300,
    padding = 3;
var eS = 30;
var svg = d3.select("body")
    .append("svg");
svg.attr("width", w)
    .attr("height", h)
    .append("rect")
    .attr("class", "background")
    .attr("width", "100%")
    .attr("height", "100%");
var events = svg.append("g");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/2 - eS)
    .attr("y", padding)
    .attr("id", 1)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#ca0020")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/2)
    .attr("y", padding)
    .attr("id", 2)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#f4a582")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/2 - eS)
    .attr("y", padding + eS)
    .attr("id", 3)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#92c5de")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/2)
    .attr("y", padding + eS)
    .attr("id", 4)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#0571b0")
    .attr("fill-opacity", "0.5");
function getSamples(){
    return Math.floor(Math.random()*4) + 1;
}
var curr = 1;
function sampleUp() {
    curr = getSamples()
    d3
    .selectAll(".event")
    .filter(function() {
        return d3.select(this).attr('id') == curr;
    })
    .transition()
    .duration(50)
    .attr("fill-opacity", "1")
    .transition()
    .duration(50)
    .attr("fill-opacity", "0.5")
    .on("end", sampleUp);
}
sampleUp();

