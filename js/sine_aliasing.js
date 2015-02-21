var SINC = (function() {

var canvasWidth = 700;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var frequencies = [1, 7, -5, 13, -11, 19, -17, 25, -23];
var currentFrequency = 0;

var vis = d3.select('#sinc');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRangeTime = d3.scale.linear().range([0, plotWidth]);
xRangeTime.domain([0, 2 * Math.PI]);

var yRangeTime = d3.scale.linear().range([140, 40]);
yRangeTime.domain([-1, 1]);

var xAxisTime = d3.svg.axis()
  .scale(xRangeTime)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime);

var signal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) { return yRangeTime(Math.sin(d)); });

var aliasSignal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) { return yRangeTime(Math.sin(d * frequencies[currentFrequency])); });

var sigData = d3.range(0, 2 * Math.PI, 0.01);

var signalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.50);

var aliasSignalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "grey")
  .attr("fill", "none")
  //.style("stroke-dasharray", ("5, 1"))
  .attr("opacity", 0.30);

signalPath.attr("d", signal(sigData));
aliasSignalPath.attr("d", aliasSignal(sigData));

var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 6);

var samples = vis.selectAll(".point1")
  .data(sampleData)
  .enter().append("svg:circle")
    .attr("stroke", "steelblue")
    .style("stroke-width", 1.5)
    .attr("fill", "steelblue")
    .attr("cx", function(d, i) { return xRangeTime(d); })
    .attr("cy", function(d, i) { return yRangeTime(Math.sin(d)); })
    .attr("r", function(d, i) { return 1.5 });

samples.data(sampleData)
  .attr("cx", function(d, i) { return xRangeTime(d); })
  .attr("cy", function(d, i) { return yRangeTime(Math.sin(d)); });

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([400 - 80, 280 - 80]);

xRange.domain([-30, 30]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
  .tickValues([-23, -17, -11, 7, 13, 19, 25, 1, 3, -5])
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .tickValues([1])
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRange(0) + ')')
  .style("opacity", 0.65)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (plotWidth/2) + ',0)')
  .style("opacity", 0.65)
  .call(yAxis);

// vis.append("text")
//   .attr("text-anchor", "end")
//   .attr("x", plotWidth / 2 - 5)
//   .attr("y", yRange(1.2))
//   .style("font-size", "12px")
//   .text("Magnitude");

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", yRange(-0.25))
  .style("font-size", "10px")
  .text("Frequency (Hz)");

var points = vis.selectAll(".point")
  .data(frequencies)
  .enter().append("svg:rect")
    .attr("stroke",  function(d, i) { return d == 1 ? "steelblue" : "grey"; })
    .style("stroke-width", 1)
    .attr("fill",  function(d, i) { return d == 1 ? "steelblue" : "grey"; })
    .attr("x", function(d, i) { return xRange(d) - 2; })
    .attr("y", function(d, i) { return yRange(1.0) + 0.5; })
    .attr("width", 4)
    .attr("height", 4);

var sticks = vis.selectAll(".sticks")
  .data(frequencies)
  .enter().append("line")
    .attr("x1", function(d, i) { return xRange(d); })
    .attr("y1", function(d, i) { return yRange(0);} )
    .attr("x2", function(d, i) { return xRange(d); })
    .attr("y2", function(d, i) { return yRange(1.0); })
    .attr("stroke-width", 2)
    .attr("stroke", function(d, i) { return d == 1 ? "steelblue" : "grey"; })
    .style("opacity", function(d, i) { return d == 1 ? 0.70 : 0.25})
    //.style("stroke-dasharray", function(d, i) { return d == 1 ? ("0, 0") : ("5, 1"); })
    //.style("stroke-dasharray", ("5, 1"))
    ;

// vis.append("svg:line")
//   .attr("x1", function(d, i) { return xRange(-3); })
//   .attr("y1", function(d, i) { return yRange(0);} )
//   .attr("x2", function(d, i) { return xRange(-3); })
//   .attr("y2", function(d, i) { return yRange(1.1); })
//   .attr("stroke-width", 2)
//   .attr("stroke", "grey")
//   .style("opacity", 0.5)
//   .style("stroke-dasharray", ("5, 1"));


vis.append("svg:line")
  .attr("x1", function(d, i) { return xRange(3); })
  .attr("y1", function(d, i) { return yRange(-0.25);} )
  .attr("x2", function(d, i) { return xRange(3); })
  .attr("y2", function(d, i) { return yRange(1.25); })
  .attr("stroke-width", 1)
  .attr("stroke", "grey")
  .style("opacity", 0.5)
  //.style("stroke-dasharray", ("5, 1"))
  ;

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRange(3))
  .attr("y", yRange(-0.35))
  .style("font-size", "10px")
  .text("Nyquist Frequency");


vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRangeTime(1.4))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Time Domain");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.4))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Frequency Domain");


// vis.append("svg:line")
//   .attr("x1", function(d, i) { return xRange(3); })
//   .attr("y1", function(d, i) { return yRange(0);} )
//   .attr("x2", function(d, i) { return xRange(3); })
//   .attr("y2", function(d, i) { return yRange(1.1); })
//   .attr("stroke-width", 2)
//   .attr("stroke", "grey")
//   .style("opacity", 0.5)
//   .style("stroke-dasharray", ("5, 1"));

// vis.append("svg:line")
//   .attr("x1", function(d, i) { return xRange(3); })
//   .attr("y1", function(d, i) { return yRange(1.1);} )
//   .attr("x2", function(d, i) { return xRange(-3); })
//   .attr("y2", function(d, i) { return yRange(1.1); })
//   .attr("stroke-width", 2)
//   .attr("stroke", "grey")
//   .style("opacity", 0.5)
//   .style("stroke-dasharray", ("5, 1"));

aliasSignalPath.style("opacity", 0.0);

var indicator = vis.append("svg:circle")
  .attr("stroke", "grey")
  .style("stroke-width", 4.0)
  .attr("fill",  "none")
  .attr("cx", xRange(frequencies[currentFrequency]))
  .attr("cy", yRange(1)+ 3)
  .attr("r", 10)
  .style("opacity", 0.50);

currentFrequency++;

indicator
  .transition()
    .duration(1000)
    .attr("cx", xRange(frequencies[currentFrequency]))
    .each("end", showAlias);

function switchFrequency()
{
  currentFrequency++;

  if (currentFrequency >= frequencies.length)
  {
    currentFrequency = 0;
  }

  indicator
    .transition()
      .duration(1000)
      .delay(3000)
      .attr("cx", xRange(frequencies[currentFrequency]))
      .each("end", showAlias);

  aliasSignalPath
    .transition()
      .delay(3000)
      .duration(500)
      .style("opacity", 0.0);
}

function showAlias()
{
  aliasSignalPath.attr("d", aliasSignal(sigData));

  aliasSignalPath
    .transition()
      .duration(1000)
      .style("opacity", 0.35)
      .each("end", switchFrequency);
}

}) ();
