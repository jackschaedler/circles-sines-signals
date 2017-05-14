var COMPLEX_PLANE = (function() {

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

var xRangeInv = d3.scale.linear().range([-1.25, 1.25]);
var yRangeInv = d3.scale.linear().range([-1.25, 1.25]);

xRangeInv.domain([MARGINS.left, plotWidth]);
yRangeInv.domain([plotHeight, MARGINS.top]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(2)
  .tickValues([0.5, 1, -0.5, -1])
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .tickValues([0.5, 1, -0.5, -1])
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#complexPlane');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.45)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + plotWidth / 2 + ',0)')
  .style('opacity', 0.45)
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

var imagComponent = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "green")
  //.style("stroke-dasharray", ("5, 1"))
  .style("stroke-linecap", "round")
  .style('opacity', 0.5);

var realComponent = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "red")
  //.style("stroke-dasharray", ("5, 1"))
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
  .style('opacity', 0.7);

var circle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', xRange(1) - xRange(0))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('opacity', 0.1);

// var phiText = vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", xRange(0.25))
//   .attr("y", yRange(0.25))
//   .style("user-select", "none")
//   .style("-webkit-user-select", "none")
//   .text("φ = ");

var pointX = Math.sqrt(2) / 2;
var pointY = Math.sqrt(2) / 2;

var point = vis.append('svg:circle')
  .attr('cx', xRange(pointX))
  .attr('cy', yRange(pointY))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 1.0);

var phase = Math.PI / 4;

var sine = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeSine(Math.sin(d + phase)); });

var cosFunc = d3.svg.line()
  .x(function (d, i) { return xRangeSine(d)})
  .y(function (d, i) { return yRangeCos(Math.cos(d + phase)); });

var xComponent = xRange(Math.cos(phase));
var yComponent = yRange(Math.sin(phase));


var Im = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(0) + 5)
  .attr("y", yRange(1.1))
  .text("Imaginary Axis");


var Re = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(1) + 5)
  .attr("y", yRange(0.05))
  .text("Real");


vis.on("mousedown", mouseDown);
vis.on("mouseup", mouseUp);
vis.on("mousemove", mouseMove);

var mouseIsDown = false;

function mouseDown()
{
  mouseIsDown = true;
  movePoint(d3.mouse(this));
}

function mouseUp()
{
  mouseIsDown = false;
}

function mouseMove()
{
  if (mouseIsDown)
  {
    movePoint(d3.mouse(this));
  }
}

function movePoint(e)
{
  xComponent = e[0];
  yComponent = e[1];

  pointX = xRangeInv(xComponent);
  pointY = yRangeInv(yComponent);
}


var formatter = d3.format(".2f");

function draw() {

  phase = Math.atan2(pointY, pointX);

  var xsign = pointX < 0
    ? "-"
    : "+"; 

  var ysign = pointY < 0
    ? "-"
    : "+"; 

  document.getElementById("xsign").innerHTML
    = xsign;

  document.getElementById("ysign").innerHTML
    = ysign;

  document.getElementById("xcomp").innerHTML
    = formatter(Math.abs(pointX));

  document.getElementById("ycomp").innerHTML
    = formatter(Math.abs(pointY)) + " i";

  document.getElementById("mag").innerHTML
    = formatter(Math.sqrt((pointX * pointX) + (pointY * pointY)));

  document.getElementById("phase").innerHTML
    = formatter(phase) + " radians";

  // var quadrantOffset = 0;

  // if(pointX < 0 && pointY > 0)
  // {
  //   quadrantOffset = Math.PI / 2;
  //   phase = Math.PI / 2 - phase;
  // }

  // if(pointX < 0 && pointY < 0)
  // {
  //   quadrantOffset = Math.PI;
  // }

  // if(pointX > 0 && pointY < 0)
  // {
  //   quadrantOffset = Math.PI + Math.PI / 2;
  //   phase = Math.PI / 2 - phase;
  // }

  // phase += quadrantOffset;

  //xComponent = xRange(pointX);
  //yComponent = yRange(pointY);

  vector
    .attr('x2', xComponent)
    .attr('y2', yComponent);

  imagComponent
    .attr('x1', xComponent)
    .attr('y1', yComponent)
    .attr('x2', xComponent)
    .attr('y2', yRange(0));

  realComponent
    .attr('x2', xComponent)
    .attr('y2', yRange(0) + 0.5);

  point
    .attr('cx', xComponent)
    .attr('cy', yComponent);

  // phaseText.text("Phase: " + (phase * (180 / Math.PI)).toPrecision(3) + "°");

  phaseArc.endAngle(-phase);
  arcPath.attr('d', phaseArc);

  //phiText.text("φ = " + phase.toPrecision(3) + " rad");
}

d3.timer(draw, 50);
}) ();
