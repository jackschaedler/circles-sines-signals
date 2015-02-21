var ICECREAM2 = (function() {
var lineData = [
  {x: 0, y: 3.1}
, {x: 1, y: 6.2}
, {x: 2, y: 7.8}
, {x: 3, y: 5.5}
, {x: 4, y: 2.3}
, {x: 5, y: 11.2}
, {x: 6, y: 4.3}
, {x: 7, y: 9.7}
, {x: 8, y: 5.2}
, {x: 9, y: 10.9}
, {x: 10, y: 9.1}
, {x: 11, y: 7.5}
, {x: 12, y: 10.5}
];

var canvasWidth = 700;
var canvasHeight = 150;
var MARGINS =
  {
    top: 2,
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
  //.tickValues([10000, 20000, 30000])
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('basis');



var vis = d3.select('#icecream');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight - 0.5) + ')')
  .style("opacity", 0.6)
  .call(xAxis);
 
// vis.append('svg:g')
//   .attr('class', 'y axis')
//   .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
//   .style("opacity", 0.6)
//   .call(yAxis);

var path = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'brown')
  .attr('stroke-width', 2.0)
  .attr('fill', 'none')
  .style("opacity", 0.7);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", canvasWidth / 2)
  .attr("y", 175)
  .text("Time (hours)")
  .style("opacity", 0.75);


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

//transPath();

}) ();

