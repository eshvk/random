function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var w = 600,
    h = 300,
    padding = 3,
    buttonRadius = 10,
    sampleR = 5,
    refreshT = 50,
    dataset = [{"id": 1, "f": 0},
    {"id": 2, "f": 0},
    {"id": 3, "f": 0},
    {"id": 4, "f": 0},
    ],
    colorMap = {1: "#ca0020", 2: "#f4a582", 3:"#92c5de", 4: "#0571b0"},
    nSamples = 0,
    buttonStatus = false;
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
    .attr("fill", "#009E73")
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

var xScale = d3
    .scalePoint()
    .domain([1, 2, 3, 4])
    .range([padding, w/2 - padding]);
var yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, -h/3]);
var numberLine = d3
    .axisBottom()
    .scale(xScale)
    .ticks(4);

var pmf = svg
    .append("g")
    .attr("transform", "translate(" + w/2 +  "," + 2*h/3 + ")");
pmf.append("g").call(numberLine);
var chart = pmf.append("g")
    .attr("class", "chart");
chart.selectAll("line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("class", "pointmf")
    .attr("x1", function (d) {return xScale(d.id)})
    .attr("x2", function (d) {return xScale(d.id)})
    .attr("y1", function (d) {return yScale(0)})
    .attr("y2", function (d) {return yScale(d.f)})
    .attr("stroke", function (d) {return colorMap[d.id]});

function getSamples() {
    nSamples += 1
    return Math.floor(Math.random() * 4) + 1;
}

function updateButton(buttonStatus) {
    if(buttonStatus) {
        d3
        .selectAll(".button")
        .attr("fill", "salmon");
    } else {
        d3
        .selectAll(".button")
        .attr("fill", "#009E73");
    }
}
function updateRVO(t, c) {
    d3
    .selectAll(".randomvalue")
    .text(c)
    .transition(t)
    .on("interrupt", function() {
        d3.select(this).style("opacity", 0);
    })
    .style("opacity", "1")
    .transition()
    .duration(refreshT)
    .style("opacity", "0");
}

function updateRVI(t, c) {
    d3
    .selectAll(".randominp")
    .transition(t)
    .on("interrupt", function() {
        d3.select(this).attr("fill", "none");
    })
    .attr("fill", colorMap[c])
    .transition()
    .duration(refreshT)
    .attr("fill", "none");
}
function resetData(){
    dataset.forEach(x => x.f = 0);
    nSamples  = 0;
    return dataset;
}
function updatePMF(t, c) {
   var ii = dataset.findIndex(x => x.id == c);
   dataset[ii].f += 1;
   chart
        .selectAll("line")
        .data(dataset)
        .transition(t)
        .on("interrupt", function() {
            chart
            .selectAll("line")
            .data(resetData())
            .attr("y2", function(d) {return yScale(d.f/1); });
        })
        .attr("y2", function(d) {return yScale(d.f/nSamples); });
}

function sampleUp(t) {
    let curr = getSamples();
    updatePMF(t, curr);
    updateRVO(t, curr);
    updateRVI(t, curr);
    d3
        .selectAll(".event")
        .filter(function() {
            return d3.select(this).attr('id') == curr;
        })
        .transition(t)
        .on("interrupt", function() {
            d3.select(this).attr("fill-opacity", "0.5");
        })
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
        if(!buttonStatus) {
            var t = d3.transition().duration(refreshT)
            buttonStatus = true;
            sampleUp(t);
        } else {
            buttonStatus = false;
            svg.selectAll("*").interrupt();
        }
        updateButton(buttonStatus);
    })