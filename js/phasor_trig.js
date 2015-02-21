var PHASOR_TRIG = (function() {

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

var vis = d3.select('#phasorTrig');

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
  .attr("opacity", 0.5)
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
  .attr("stroke", "steelblue")
  .style("stroke-linecap", "round")
  .style('opacity', 1.0);

var circle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', xRange(1) - xRange(0))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('opacity', 0.5);

var unitPoint = vis.append('svg:circle')
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

var xRangeSine = d3.scale.linear().range([25, 225]);
var yRangeSine = d3.scale.linear().range([310 + 20, 260 + 20]);

var yRangeCos = d3.scale.linear().range([370 + 20, 320 + 20]);

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
  .text("Sine");

var cosText = vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangeSine(Math.PI))
  .attr("y", yRangeCos(1.25))
  .text("Cosine");

// vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("font-size", 12)
//   .attr("x",  xRange(Math.cos(Math.PI / 4)) + 3)
//   .attr("y", yRange(Math.sin(Math.PI / 4)) - 3)
//   .text("𝛑/4");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("font-size", 11)
  .attr("x",  xRange(Math.cos(Math.PI / 2)))
  .attr("y", yRange(Math.sin(Math.PI / 2)) - 3)
  .text("𝛑/2");

// vis.append("text")
//   .attr("text-anchor", "end")
//   .attr("font-size", 12)
//   .attr("x",  xRange(Math.cos(3 * Math.PI / 4)) -3)
//   .attr("y", yRange(Math.sin(3 * Math.PI / 4)) - 3)
//   .text("3𝛑/4");

vis.append("text")
  .attr("text-anchor", "end")
  .attr("font-size", 11)
  .attr("x",  xRange(Math.cos(Math.PI)) - 5)
  .attr("y", yRange(Math.sin(Math.PI)) + 3)
  .text("𝛑");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("font-size", 11)
  .attr("x",  xRange(Math.cos(3 * Math.PI / 2)))
  .attr("y", yRange(Math.sin(3 * Math.PI / 2)) + 14)
  .text("3𝛑/2");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("font-size", 11)
  .attr("x",  xRange(Math.cos(0)) + 3)
  .attr("y", yRange(Math.sin(0)) + 3)
  .text("2𝛑");

var phase = Math.PI / 4;

// var intersect1 = vis.append("line")
//   .attr("x1", xRangeSine(Math.PI/2 - phase))
//   .attr("y1", yRangeSine(1.25))
//   .attr("x2", xRangeSine(Math.PI/2 - phase))
//   .attr("y2", yRangeCos(-1.25))
//   .attr("stroke-width", 1.0)
//   .attr("stroke", "black")
//   .style('opacity', 0.25);

// var intersect2 = vis.append("line")
//   .attr("x1", xRangeSine(Math.PI - phase))
//   .attr("y1", yRangeSine(1.25))
//   .attr("x2", xRangeSine(Math.PI - phase))
//   .attr("y2", yRangeCos(-1.25))
//   .attr("stroke-width", 1.0)
//   .attr("stroke", "black")
//   .style('opacity', 0.25);

// var intersect3 = vis.append("line")
//   .attr("x1", xRangeSine(3 * Math.PI / 2 - phase))
//   .attr("y1", yRangeSine(1.25))
//   .attr("x2", xRangeSine(3 * Math.PI / 2 - phase))
//   .attr("y2", yRangeCos(-1.25))
//   .attr("stroke-width", 1.0)
//   .attr("stroke", "black")
//   .style('opacity', 0.25);

// var intersect4 = vis.append("line")
//   .attr("x1", xRangeSine(2 * Math.PI - phase))
//   .attr("y1", yRangeSine(1.25))
//   .attr("x2", xRangeSine(2 * Math.PI - phase))
//   .attr("y2", yRangeCos(-1.25))
//   .attr("stroke-width", 1.0)
//   .attr("stroke", "black")
//   .style('opacity', 0.25);


var sine = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeSine(Math.sin(d + phase)); });

var cosFunc = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeCos(Math.cos(d + phase)); });

var xComponent = xRange(Math.cos(phase));
var yComponent = yRange(Math.sin(phase));

var phaseText = vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", 220)
  .attr("y", 10)
  .text("Phase: 45°");

var phaseTextRad = vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", 220)
  .attr("y", 20)
  .text("rad");

var sinePoint = vis.append('svg:circle')
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

var cosinePoint = vis.append('svg:circle')
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

function draw() {
  phase = GET_TRIG_PHASE() * 2 * Math.PI;

  sinePath.attr("d", sine(d3.range(0, 2 * Math.PI, 2 * Math.PI / 50)));
  cosPath.attr("d", cosFunc(d3.range(0, 2 * Math.PI, 2 * Math.PI / 50)));

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

  phaseText.text("Phase: " + (phase * (180 / Math.PI)).toPrecision(3) + "°");
  phaseTextRad.text(phase.toPrecision(3) + " rad");

  phaseArc.endAngle(-phase);
  arcPath.attr('d', phaseArc);

  unitPoint
    .attr("cx", xComponent)
    .attr("cy", yComponent);

  sinePoint
    .attr("cx", xRangeSine(0))
    .attr("cy", yRangeSine(Math.sin(phase)));

  cosinePoint
    .attr("cx", xRangeSine(0))
    .attr("cy", yRangeCos(Math.cos(phase)));

 // intersect1
 //  .attr("x1", xRangeSine(Math.PI/2 - phase))
 //  .attr("x2", xRangeSine(Math.PI/2 - phase));

 // intersect2
 //  .attr("x1", xRangeSine(Math.PI - phase))
 //  .attr("x2", xRangeSine(Math.PI - phase));

 // intersect3
 //  .attr("x1", xRangeSine(3 * Math.PI / 2 - phase))
 //  .attr("x2", xRangeSine(3 * Math.PI / 2 - phase));

 // intersect4
 //  .attr("x1", xRangeSine(2 * Math.PI - phase))
 //  .attr("x2", xRangeSine(2 * Math.PI - phase));


  TRIG_PHASE_INTERPOLATION += 0.1;
}

d3.timer(draw, 10);
}) ();
