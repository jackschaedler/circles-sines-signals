var PRESSURE = (function() {
var lineData = [
  {x: 0, y: 5}
, {x: 5, y: 8}
, {x: 10, y: 12}
, {x: 15, y: 19}
, {x: 20, y: 23}
, {x: 25, y: 22}
, {x: 30, y: 15}
, {x: 35, y: 7}
, {x: 40, y: 14}
, {x: 45, y: 19}
, {x: 50, y: 20}
, {x: 55, y: 16}
, {x: 60, y: 14}
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
  .ticks(3)
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#pressure');

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
  .attr('stroke', 'teal')
  .attr('stroke-width', 2.0)
  .attr('fill', 'none');

var intendedPath = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'grey')
  .attr('stroke-width', 1.5)
  .attr('fill', 'none')
  .attr('opacity', 0.25);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", canvasWidth / 2)
  .attr("y", 175)
  .text("Time (seconds)")
  .style("opacity", 0.75);

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(0) + 8)
  .attr("y", 10)
  .text("Speed (Mph)")
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

//transPath();

}) ();

