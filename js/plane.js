var PLANE_1 = (function() {
var lineData = [
  {x: 0, y: 0}
, {x: 10, y: 6000}
, {x: 20, y: 15000}
, {x: 30, y: 20000}
, {x: 40, y: 35000}
, {x: 50, y: 32000}
, {x: 60, y: 31000}
, {x: 65, y: 28000}
, {x: 70, y: 31000}
, {x: 80, y: 28000}
, {x: 90, y: 12000}
, {x: 100, y: 3500}
, {x: 110, y: 1200}
, {x: 120, y: 0}
];

var canvasWidth = 700;
var canvasHeight = 150;
var MARGINS =
  {
    top: 5,
    right: 10,
    bottom: 2,
    left: 40
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([0, d3.max(lineData, function(d) { return d.x; })]);
yRange.domain([0, d3.max(lineData, function(d) { return d.y; })]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(1)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .tickValues([10000, 20000, 30000])
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#plane');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight - 0.5) + ')')
  .style("opacity", 0.6)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .style("opacity", 0.6)
  .call(yAxis);

var path = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 2.5)
  .attr('fill', 'none');

var intendedPath = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'grey')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('opacity', 0.25);

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", 110)
  .attr("y", 10)
  .text("Altitude (feet)")
  .style("opacity", 0.75);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", canvasWidth / 2)
  .attr("y", 175)
  .text("Time (minutes)")
  .style("opacity", 0.75);

var totalLength = path.node().getTotalLength(); 

// function transPath() {
//   path
//     .attr("stroke-dasharray", totalLength + " " + totalLength)
//     .attr("stroke-dashoffset", totalLength)
//     .transition()
//       .duration(20000)
//       .ease("linear")
//       .attr("stroke-dashoffset", 0)
//       .each("end", transPath);  
// };

// transPath();

}) ();

