var COMPLEX_INTRO2 = (function() {

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

xRange.domain([-10, 10]);
yRange.domain([-10, 10]);

var xRangeInv = d3.scale.linear().range([-1.25, 1.25]);
var yRangeInv = d3.scale.linear().range([-1.25, 1.25]);

xRangeInv.domain([MARGINS.left, plotWidth]);
yRangeInv.domain([plotHeight, MARGINS.top]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(2)
  .tickValues([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10])
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickValues([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10])
  .orient('left')
  .tickSize(1)
  .tickSubdivide(true);

var vis = d3.select('#complexintro2');

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
  

// var phiText = vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", xRange(0.25))
//   .attr("y", yRange(0.25))
//   .style("user-select", "none")
//   .style("-webkit-user-select", "none")
//   .text("φ = ");

var pointX = 5.0;
var pointY = 0.0;

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
  .attr("y", yRange(9.5))
  .style('opacity', 0.5)
  .text("Imaginary Axis");


var Re = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(6) + 10)
  .attr("y", yRange(0.3))
  .style('opacity', 0.5)
  .text("Real Axis");


var formatter = d3.format(".2f");

var lever = vis.append("line")
  .datum({phase: 0})
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(pointX))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "black")
  //.style("stroke-dasharray", ("5, 1"))
  .style("stroke-linecap", "round")
  .style('opacity', 0.5);


var phaseArcs = [];
var arcPaths = [];

for (var i = 0; i < 4; i++)
{
  phaseArcs.push(
    d3.svg.arc()
      .innerRadius(61)
      .outerRadius(64)
      .startAngle(0)
  );

  arcPaths.push(
    vis.append("path")
      .datum({endAngle: 0})
      .attr("d", phaseArcs[i])
      .attr("fill", (i % 2 == 0 ? "orange" : "purple"))
      .attr("opacity", 0.55)
      .attr("transform",
        "translate(" + plotWidth / 2 + "," + (plotHeight / 2) + ") rotate(" + ((-90 * (i + 1)) + 180 ) + ")")
      //.attr("marker-end", "url(#arrowhead)")
  );
}

var point = vis.append('svg:circle')
  .attr('cx', xRange(pointX))
  .attr('cy', yRange(pointY))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 1.0);

var pointIm = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(pointX))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.0);

var negativePoint = vis.append('svg:circle')
  .attr('cx', xRange(-pointX))
  .attr('cy', yRange(pointY))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.0);

var negativePointIm = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(-pointX))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.0);

var points = [point, pointIm, negativePoint, negativePointIm];


var firstText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(4))
  .attr("y", yRange(4))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by i");

var secondText = vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", xRange(-4))
  .attr("y", yRange(4))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by i");

var thirdText = vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", xRange(-4))
  .attr("y", yRange(-4.5))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by i");

var fourthText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(4))
  .attr("y", yRange(-4.5))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by i");

var texts = [firstText, secondText, thirdText, fourthText];


function restart()
{
  d3.timer(start, 2500);
}

function start()
{
  for (var i = 0; i < 4; i++)
  {
    arcPaths[i]
      .datum({endAngle: 0})
      .attr("d", phaseArcs[i]);

    texts[i]
      .style("opacity", 0.2);
  }

  for (var i = 1; i < 4; i++)
  {
    points[i]
      .style('opacity', 0.0);
  }

  lever
    .datum({phase: 0});


  arcPaths[0].transition()
    .duration(2000)
    .ease("linear")
    .call(arcTween, -Math.PI/2, 0);
  arcPaths[1].transition()
    .duration(2000)
    .delay(3000)
    .ease("linear")
    .call(arcTween, -Math.PI/2, 1);
  arcPaths[2].transition()
    .duration(2000)
    .delay(6000)
    .ease("linear")
    .call(arcTween, -Math.PI/2, 2);
  arcPaths[3].transition()
    .duration(2000)
    .delay(9000)
    .ease("linear")
    .call(arcTween, -Math.PI/2, 3);

  lever.transition()
    .duration(2000)
    .ease("linear")
    .call(leverTween, -Math.PI/2)
    .transition()
    .duration(2000)
    .delay(3000)
    .ease("linear")
    .call(leverTween, -Math.PI)
    .transition()
    .duration(2000)
    .delay(6000)
    .ease("linear")
    .call(leverTween, -3*Math.PI/2)
    .transition()
    .duration(2000)
    .delay(9000)
    .ease("linear")
    .call(leverTween, -2*Math.PI)
    .each('end', restart);

  texts[0].transition()
    .duration(200)
    .delay(1000)
    .style("opacity", 1.0);
  texts[1].transition()
    .duration(500)
    .delay(4000)
    .style("opacity", 1.0);
  texts[2].transition()
    .duration(500)
    .delay(7000)
    .style("opacity", 1.0);
  texts[3].transition()
    .duration(500)
    .delay(10000)
    .style("opacity", 1.0);

  points[0].transition()
    .duration(500)
    .delay(2000)
    .style("opacity", 1.0);
  points[1].transition()
    .duration(500)
    .delay(2000)
    .style("opacity", 1.0);
  points[2].transition()
    .duration(500)
    .delay(5000)
    .style("opacity", 1.0);
  points[3].transition()
    .duration(500)
    .delay(8000)
    .style("opacity", 1.0);

  return true;
}

start();

function leverTween(transition, newAngle)
{
  transition.attrTween("x2", function(d) {
    var interpolate = d3.interpolate(d.phase, newAngle);
      return function(t) {
        d.phase = interpolate(t);
        return xRange(Math.cos(d.phase) * 5);
      };
  });

  transition.attrTween("y2", function(d) {
    var interpolate = d3.interpolate(d.phase, newAngle);
      return function(t) {
        d.phase = interpolate(t);
        return xRange(Math.sin(d.phase) * 5);
      };
  });
}

function arcTween(transition, newAngle, arcIndex) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return phaseArcs[arcIndex](d);
    };
  });
}


}) ();
