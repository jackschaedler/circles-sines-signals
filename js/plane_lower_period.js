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

var alternativeLineData = [
  {x: 0, y: 0}
, {x: 10, y: 6000}
, {x: 15, y: 1000}
, {x: 20, y: 15000}
, {x: 30, y: 20000}
, {x: 40, y: 35000}
, {x: 45, y: 30000}
, {x: 50, y: 32000}
, {x: 60, y: 31000}
, {x: 65, y: 35000}
, {x: 70, y: 31000}
, {x: 80, y: 28000}
, {x: 90, y: 12000}
, {x: 100, y: 3500}
, {x: 110, y: 1200}
, {x: 120, y: 0}
];

var alternativeLineData3 = [
  {x: 0, y: 0}
, {x: 10, y: 6000}
, {x: 15, y: 14000}
, {x: 20, y: 15000}
, {x: 30, y: 20000}
, {x: 40, y: 35000}
, {x: 50, y: 32000}
, {x: 55, y: 37000}
, {x: 60, y: 31000}
, {x: 65, y: 10000}
, {x: 70, y: 31000}
, {x: 80, y: 28000}
, {x: 90, y: 12000}
, {x: 100, y: 3500}
, {x: 110, y: 1200}
, {x: 120, y: 0}
];

var alternativeLineData2 = [
  {x: 0, y: 0}
, {x: 10, y: 6000}
, {x: 20, y: 15000}
, {x: 25, y: 22000}
, {x: 30, y: 20000}
, {x: 35, y: 16000}
, {x: 40, y: 35000}
, {x: 50, y: 32000}
, {x: 60, y: 31000}
, {x: 65, y: 1000}
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
yRange.domain([0, d3.max(lineData, function(d) { return d.y + 5000; })]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .ticks(26)
  .tickSize(1)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .ticks(3)
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#plane5');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight - 0.5) + ')')
  .style('opacity', 0.6)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .style('opacity', 0.6)
  .call(yAxis);

var colorScale = d3.scale.category10();
colorScale.domain(d3.range(0,10,1));

var path = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', colorScale(0))
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .style('opacity', 0.50);

var alternativePath = vis.append('svg:path')
  .attr('d', line(alternativeLineData))
  .attr('stroke', colorScale(1))
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .style('opacity', 0.70);

var alternativePath3 = vis.append('svg:path')
  .attr('d', line(alternativeLineData3))
  .attr('stroke', colorScale(2))
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .style('opacity', 0.70);

var alternativePath2 = vis.append('svg:path')
  .attr('d', line(alternativeLineData2))
  .attr('stroke', colorScale(3))
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .style('opacity', 0.70);

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", 110)
  .attr("y", 8)
  .style('opacity', 0.6)
  .text("Altitude (feet)");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", plotWidth / 2)
  .attr("y", 180)
  .style('opacity', 0.6)
  .text("Time (minutes)");

var findYatXbyBisection = function(x, path, error){
  var length_end = path.getTotalLength()
    , length_start = 0
    , point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
    , bisection_iterations_max = 50
    , bisection_iterations = 0

  error = error || 0.01

  while (x < point.x - error || x > point.x + error) {
    // get the middle point
    point = path.getPointAtLength((length_end + length_start) / 2)

    if (x < point.x) {
      length_end = (length_start + length_end)/2
    } else {
      length_start = (length_start + length_end)/2
    }

    // Increase iteration
    if(bisection_iterations_max < ++ bisection_iterations)
      break;
  }
  return point.y
}

var num_samples = 25; //8

var points = vis.selectAll(".point")
  .data(d3.range(num_samples))
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .style("stroke-width", 1.5)
    .attr("fill", "steelblue")
    .attr("cx", function(d, i) { return xRange(d * 5); } )
    .attr("cy", function(d, i) { 
      return findYatXbyBisection(xRange(d * 5), path.node(), 0.1);})
    .attr("r", function(d, i) { return 3.0 });

var sticks = vis.selectAll(".sticks")
  .data(d3.range(num_samples))
  .enter().append("line")
    .attr("x1", function(d, i) { return xRange(d * 5); })
    .attr("y1", function(d, i) { return findYatXbyBisection(xRange(d * 5), path.node(), 0.1);} )
    .attr("x2", function(d, i) { return xRange(d * 5); })
    .attr("y2", function(d, i) { return yRange(0); })
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.50)
    .style("stroke-dasharray", ("3, 3"))
    ;

