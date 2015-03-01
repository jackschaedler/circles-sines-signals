var LEAKAGE = (function() {

var canvasWidth = 600;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#sinc2');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRangeTime = d3.scale.linear().range([0, plotWidth]);
xRangeTime.domain([0, 2 * Math.PI]);

var yRangeTime = d3.scale.linear().range([140, 70]);
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

var currentFrequency = LEAK_FREQUENCY;

var signal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) { return yRangeTime(Math.sin(d * currentFrequency)); });

var sigData = d3.range(0, 2 * Math.PI, 0.01);

var signalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.70);

signalPath.attr("d", signal(sigData));

var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 12);

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([400 - 80, 280 - 80]);

xRange.domain([0, 12]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
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
  .attr('transform', 'translate(' + 0 + ',0)')
  .style("opacity", 0.65)
  .call(yAxis);

var sinc = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) {
    var diff = (currentFrequency - d) + 0.00001;
    var common = Math.PI * diff;
    var val = Math.sin(common) / common;
    return yRange(Math.abs(val));
  });

var sincData = d3.range(0, 12, 0.01);

var sincPath = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.50);

sincPath.attr("d", sinc(sincData));

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(0) + 5)
  .attr("y", yRange(1.2) - 5)
  .style("font-size", "11px")
  .text("Magnitude");

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", yRange(-0.25))
  .style("font-size", "12px")
  .text("Frequency (Hz)");

var frequencies = d3.range(0, 13, 1);

var points = vis.selectAll(".point")
  .data(frequencies)
  .enter().append("svg:rect")
    .attr("stroke",  "#eee")
    .style("stroke-width", 1)
    .attr("fill",  "steelblue")
    .attr("x", function(d, i) { return xRange(d) - 2.5; })
    .attr("y", function(d, i) {
      var diff = (currentFrequency - d) + 0.00001;
      var common = Math.PI * diff;
      var val = Math.sin(common) / common;
      return yRange(val) - 2; })
    .attr("width", 6)
    .attr("height", 6);


vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRangeTime(1.4))
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "#333")
  .text("Time Domain");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.4))
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "#333")
  .text("Frequency Domain");


var freqIndicator = vis.append("svg:line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1); })
  .attr("stroke-width", 1)
  .attr("stroke", "grey")
  .style("opacity", 0.75)
  .style("stroke-dasharray", ("5, 1"));

var waitCycles = 0;

function updateFrequency()
{
  document.getElementById("leakFreq").innerHTML = "Input Frequency: &nbsp; <b>" + (currentFrequency * 1.0).toFixed(2) + " Hz</b>";

  if (currentFrequency === LEAK_FREQUENCY)
  {
    return false;
  }

  currentFrequency = LEAK_FREQUENCY;

  document.getElementById("leakFreq").innerHTML = "Input Frequency: &nbsp; <b>" + (currentFrequency * 1.0).toFixed(2) + " Hz</b>";

  points
    .data(frequencies)
    .attr("y", function(d, i) {
      var diff = (currentFrequency - d) + 0.00001;
      var common = Math.PI * diff;
      var val = Math.sin(common) / common;
      return yRange(Math.abs(val)) - 2; });

  freqIndicator
    .attr("x1", function(d, i) { return xRange(currentFrequency); })
    .attr("x2", function(d, i) { return xRange(currentFrequency); });

  sincPath.attr("d", sinc(sincData));
  signalPath.attr("d", signal(sigData));
}

d3.timer(updateFrequency, 100);

}) ();
