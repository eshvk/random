function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var w = 600,
    h = 300,
    padding = 15;
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
    .attr("x", w/4 - eS)
    .attr("y", w/4 - eS)
    .attr("id", 1)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#ca0020")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/4 - eS)
    .attr("y", w/4)
    .attr("id", 2)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#f4a582")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/4)
    .attr("y", w/4 - eS)
    .attr("id", 3)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#92c5de")
    .attr("fill-opacity", "0.5");
events.append("rect")
    .attr("class", "event")
    .attr("x", w/4)
    .attr("y", w/4)
    .attr("id", 4)
    .attr("width", eS)
    .attr("height", eS)
    .attr("fill", "#0571b0")
    .attr("fill-opacity", "0.5");

// sys.append("rect")
//     .attr("class", "system")
//     .attr("x", w/2 - w/12)
//     .attr("y", h/2 - h/12)
//     .attr("width", w/6)
//     .attr("height", h/6);

