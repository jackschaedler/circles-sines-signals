var VECTOR_3 = (function() {

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
  .tickValues([-4, -3, -2, -1,  1, 2, 3, 4]);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .tickValues([-4, -3, -2, -1,  1, 2, 3, 4])
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


var vis = d3.select('#vector3');


vis.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 5)
    .attr("refY", 2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .attr("fill", "steelblue")
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

vis.append("defs").append("marker")
    .attr("id", "arrowhead_red")
    .attr("refX", 5)
    .attr("refY", 2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .attr("fill", "rgb(243,48,110)")
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

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


vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 2)
  .attr("stroke", "steelblue")
  .attr("marker-end", "url(#arrowhead)");

vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(1))
  .attr("stroke-width", 2)
  .attr("stroke", "rgb(243,48,110)")
  .attr("marker-end", "url(#arrowhead_red)");

}) ();



