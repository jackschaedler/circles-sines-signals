var PHASOR = (function() {

var canvasWidth = 150;
var canvasHeight = 150;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([-1.25, 1.25]);
yRange.domain([-1.25, 1.25]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#phasor');

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

var vector = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round")
  .style('opacity', 1.0);

var sineComponent = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0))
  .attr("x2", xRange(0) + 0.5)
  .attr("y2", yRange(0))
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .style("stroke-linecap", "round");

var sineProjection = vis.append("line")
  .attr("x1", xRange(1))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .style("stroke-linecap", "round")
  .style("stroke-dasharray", ("3, 3"))
  .style("opacity", 0.5);

var axisExtension = vis.append("line")
  .attr("x1", xRange(1.25))
  .attr("y1", yRange(0))
  .attr("x2", 605)
  .attr("y2", yRange(0))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style("opacity", 0.5);

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
  .attr("stroke", "green")
  .attr("fill", "none");

var time = 0.0;

var sine = d3.svg.line()
  .x(function (d, i) { return xRange(d) + 100})
  .y(function (d, i) { return yRange(-Math.sin(d * GET_PHASOR_FREQUENCY() + time) * GET_PHASOR_AMPLITUDE()); });

var data = []
for (i = 0; i < 500; i++) {
    data.push(i / 50);
  }

var pauseCycles = 0;

var xComponent = xRange(Math.cos(time));
var yComponent = yRange(-Math.sin(time));

function draw() {

  xComponent = xRange(Math.cos(time) * GET_PHASOR_AMPLITUDE());
  yComponent = yRange(-Math.sin(time) * GET_PHASOR_AMPLITUDE());

  vector
    .attr('x2', xComponent)
    .attr('y2', yComponent);

  sineComponent
    .attr('y2', yComponent);

  var leftX = Math.min(xComponent, xRange(0));

  sineProjection
    .attr('x1', xRange(0) + 100)
    .attr('y1', yComponent)
    .attr('x2', leftX)
    .attr('y2', yComponent)

  path
    .attr('d', sine(data));

  time -= 0.0125 * GET_PHASOR_FREQUENCY();
  PHASOR_INTERPOLATION += 0.1;
  PHASOR_AMP_INTERPOLATION += 0.2;
}

d3.timer(draw, 50);
}) ();
