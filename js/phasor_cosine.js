var PHASOR2 = (function() {

var canvasWidth = 150;
var canvasHeight = 150;
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

xRange.domain([-1.25, 1.25]);
yRange.domain([-1.25, 1.25]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  //.tickValues([1])
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  //.tickValues([1])
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#phasor2');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + plotWidth / 2 + ',0)')
  .style('opacity', 0.25)
  .call(yAxis);

var axisExtension = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(1.25))
  .attr("x2", xRange(0))
  .attr("y2", 500)
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style("opacity", 0.5);

var cosComponent = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0))
  .attr("x2", xRange(0) + 0.5)
  .attr("y2", yRange(0))
  .attr("stroke-width", 2.0)
  .attr("stroke", "red")
  .style("stroke-linecap", "round");

var cosProjection = vis.append("line")
  .attr("x1", xRange(1))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 2.0)
  .attr("stroke", "red")
  .style("stroke-linecap", "round")
  .style("stroke-dasharray", ("3, 3"))
  .style("opacity", 0.5);

var vector = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round");

var circle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', xRange(1) - xRange(0))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('opacity', 0.5);

var path = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "red")
  .attr("fill", "none");

var time = 0.0;

cos = d3.svg.line()
  .x(function (d, i) { return xRange(Math.cos(d * 2 + time))})
  .y(function (d, i) { return yRange(-d) + 75; });

var data = []
for (i = 0; i < 1000; i++) {
    data.push(i / 100);
  }

var pauseCycles = 0;

var xComponent = xRange(Math.cos(time));
var yComponent = yRange(-Math.sin(time));

function draw() {

  xComponent = xRange(Math.cos(time));
  yComponent = yRange(-Math.sin(time));

  vector
    .attr('x2', xComponent)
    .attr('y2', yComponent);

  cosComponent
    .attr('x2', xComponent);

  var minY = Math.min(yComponent, yRange(0));

  cosProjection
    .attr('x1', xComponent)
    .attr('y1', yRange(0) + 75)
    .attr('x2', xComponent)
    .attr('y2', minY)

  path
    .attr('d', cos(data));

  time -= .025;
}

d3.timer(draw, 50);
}) ();

