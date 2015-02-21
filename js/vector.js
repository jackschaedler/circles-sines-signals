var VECTOR = (function() {
  
var canvasWidth = 200;
var canvasHeight = 200;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

plotWidth = canvasWidth - MARGINS.left - MARGINS.right,
plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([-4, 4]);
yRange.domain([-4, 4]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(2)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4]);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4])
  .orient('left');

var gridAxisX = d3.svg.axis()
  .scale(xRange)
  .tickSize(-plotHeight, 0)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4])
  .orient('bottom')
  .tickFormat("");

var gridAxisY = d3.svg.axis()
  .scale(yRange)
  .tickSize(-plotWidth, 0)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4])
  .orient('left')
  .tickFormat("");


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#vector');

// vis.append('svg:g')
//   .attr('class', 'gridAxis')
//   .attr('transform', 'translate(0,' + plotHeight + ')')
//   .call(gridAxisX);

// vis.append('svg:g')
//   .attr('class', 'gridAxis')
//   .attr('transform', 'translate(' + 0 + ',0)')
//   .call(gridAxisY);

vis.append('svg:g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style("opacity", 0.6)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + (plotWidth / 2) + ',0)')
  .style("opacity", 0.6)
  .call(yAxis);

vis.append("circle")
  .attr("cx", xRange(3))
  .attr("cy", yRange(2))
  .attr("r", 3)
  .attr("fill", "grey");

}) ();



