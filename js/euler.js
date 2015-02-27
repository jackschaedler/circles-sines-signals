var EULER = (function() {

var canvasWidth = 250;
var canvasHeight = 250;
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

var vis = d3.select('#euler');

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

var phaseArc = d3.svg.arc()
  .innerRadius(0)
  .outerRadius(30)
  .startAngle(0)
  .endAngle(-Math.PI / 2);
    
var arcPath = vis.append("path")
  .attr("d", phaseArc)
  .attr("fill", 'orange')
  .attr("opacity", 0.45)
  .attr("transform", "translate(" + plotWidth / 2 + "," + (plotHeight / 2) + ") rotate(90)")

var sineComponent = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "green")
  .style("stroke-linecap", "round")
  .style('opacity', 0.5);

var cosComponent = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "red")
  .style("stroke-linecap", "round")
  .style('opacity', 0.5);

var vector = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round")
  .style('opacity', 0.40);

var circle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', xRange(1) - xRange(0))
  .attr('stroke-width', 2.0)
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('opacity', 0.4);

var xRangeSine = d3.scale.linear().range([25, 225]);
var yRangeSine = d3.scale.linear().range([310, 260]);

var yRangeCos = d3.scale.linear().range([370, 320]);

xRangeSine.domain([0, 2 * Math.PI]);
yRangeSine.domain([-1.25, 1.25]);
yRangeCos.domain([-1.25, 1.25]);

var sineAxis = vis.append("line")
  .attr("x1", xRangeSine(0))
  .attr("y1", yRangeSine(0) + 0.5)
  .attr("x2", xRangeSine(2 * Math.PI))
  .attr("y2", yRangeSine(0) + 0.5)
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style('opacity', 0.25);

var cosAxis = vis.append("line")
  .attr("x1", xRangeSine(0))
  .attr("y1", yRangeCos(0) + 0.5)
  .attr("x2", xRangeSine(2 * Math.PI))
  .attr("y2", yRangeCos(0) + 0.5)
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style('opacity', 0.25);

var sinePath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none");

var cosPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "red")
  .attr("fill", "none");

var sineAxis = vis.append("line")
  .attr("x1", xRangeSine(0) + 0.5)
  .attr("y1", yRangeSine(1.25))
  .attr("x2", xRangeSine(0) + 0.5)
  .attr("y2", yRangeSine(-1.25))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style('opacity', 0.25);

var cosAxis = vis.append("line")
  .attr("x1", xRangeSine(0) + 0.5)
  .attr("y1", yRangeCos(1.25))
  .attr("x2", xRangeSine(0) + 0.5)
  .attr("y2", yRangeCos(-1.25))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style('opacity', 0.25);

var sineText = vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangeSine(Math.PI))
  .attr("y", yRangeSine(1.25))
  .text("sin (φ)");

var cosText = vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangeSine(Math.PI))
  .attr("y", yRangeCos(1.25))
  .text("cos (φ)");

var ejpi = vis.append('svg:circle')
  .attr('r', 3.5)
  .attr('stroke-width', 1.5)
  .attr('stroke', 'white')
  .attr('fill', 'black')
  .style("opacity", 0.7);


var eText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("font-weight", "bold")
  .text("e");

var ejpiText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("font-weight", "bold")
  .text("");


var sinePoint = vis.append('svg:circle')
  .attr('r', 3.5)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

var cosinePoint = vis.append('svg:circle')
  .attr('r', 3.5)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

var phase = 0;

var sine = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeSine(Math.sin(d)); });

var cosFunc = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeCos(Math.cos(d)); });

sinePath.attr("d", sine(d3.range(0, 2 * Math.PI, 0.1)));
cosPath.attr("d", cosFunc(d3.range(0, 2 * Math.PI, 0.1)));

var xComponent = xRange(Math.cos(phase));
var yComponent = yRange(Math.sin(phase));


var Im = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(0) + 5)
  .attr("y", yRange(1.15))
  .text("Imaginary Axis");


var Re = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(1) + 5)
  .attr("y", yRange(0.05))
  .text("Real");


function draw() {

  phase += 0.01;
  if (phase > 2 * Math.PI)
  {
    phase = 0;
  }

  xComponent = xRange(Math.cos(phase));
  yComponent = yRange(Math.sin(phase));

  vector
    .attr('x2', xComponent)
    .attr('y2', yComponent);

  sineComponent
    .attr('x1', xComponent)
    .attr('y1', yComponent)
    .attr('x2', xComponent)
    .attr('y2', yRange(0));

  cosComponent
    .attr('x2', xComponent)
    .attr('y2', yRange(0) + 0.5);

  ejpi
    .attr('cx', xComponent)
    .attr('cy', yComponent);

  eText
    .attr('x', xComponent + 10)
    .attr('y', yComponent);

  ejpiText
    .text(phase.toPrecision(3) + "i")
    .attr('x', xComponent + 16)
    .attr('y', yComponent - 4);

 sinePoint
    .attr("cx", xRangeSine(phase))
    .attr("cy", yRangeSine(Math.sin(phase)));

  cosinePoint
    .attr("cx", xRangeSine(phase))
    .attr("cy", yRangeCos(Math.cos(phase)));

  arcPhase = Math.atan2(yRange.invert(yComponent), yRange.invert(xComponent));
  if (arcPhase > 0)
  {
    arcPhase = Math.PI - arcPhase;
  }
  else
  {
    arcPhase = -(Math.PI + arcPhase);
  }

  phaseArc.endAngle(-arcPhase);
  arcPath.attr('d', phaseArc);
}

d3.timer(draw, 50);
}) ();
