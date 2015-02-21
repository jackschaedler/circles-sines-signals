var COMPLEX_INTRO = (function() {

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
  .ticks(10)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .ticks(10)
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#complexintro');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.45)
  .call(xAxis);
 
// vis.append('svg:g')
//   .attr('class', 'y axis')
//   .attr('transform', 'translate(' + plotWidth / 2 + ',0)')
//   .style('opacity', 0.45)
//   .call(yAxis);
  

// var phiText = vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", xRange(0.25))
//   .attr("y", yRange(0.25))
//   .style("user-select", "none")
//   .style("-webkit-user-select", "none")
//   .text("φ = ");

var pointX = 5;
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


var firstText = vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRange(0))
  .attr("y", yRange(6))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by -1");

var secondText = vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRange(0))
  .attr("y", yRange(-6.5))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-weight", "bold")
  .attr("font-size", 11)
  .style("opacity", 0.2)
  .text("Multiply by -1");


// var Re = vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", xRange(6) + 5)
//   .attr("y", yRange(0.3))
//   .text("Real Axis");


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


var phaseArc = d3.svg.arc()
  .innerRadius(61)
  .outerRadius(64)
  .startAngle(0);

var arcPath = vis.append("path")
  .datum({endAngle: 0})
  .attr("d", phaseArc)
  .attr("fill", 'orange')
  .attr("opacity", 0.55)
  .attr("transform", "translate(" + plotWidth / 2 + "," + (plotHeight / 2) + ") rotate(90)")
  //.attr("marker-end", "url(#arrowhead)")
  ;

var phaseArcReturn = d3.svg.arc()
  .innerRadius(61)
  .outerRadius(64)
  .startAngle(0);

var arcPathReturn = vis.append("path")
  .datum({endAngle: 0})
  .attr("d", phaseArc)
  .attr("fill", 'purple')
  .attr("transform", "translate(" + plotWidth / 2 + "," + (plotHeight / 2) + ") rotate(270)")
  .style("opacity", 0.55)
  //.attr("marker-end", "url(#arrowhead)")
  ;

var point = vis.append('svg:circle')
  .attr('cx', xRange(pointX))
  .attr('cy', yRange(pointY))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 1.0);

var negativePoint = vis.append('svg:circle')
  .attr('cx', xRange(-pointX))
  .attr('cy', yRange(pointY))
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.0);


function restart()
{
  d3.timer(start, 2500);
}

function start()
{
  lever
    .datum({phase: 0});

  arcPath
    .datum({endAngle: 0})
    .attr("d", phaseArc);

  arcPathReturn
    .datum({endAngle: 0})
    .attr("d", phaseArc);

  negativePoint
    .style('opacity', 0.0);

  firstText
    .style('opacity', 0.2);

  secondText
    .style('opacity', 0.2);


  arcPath.transition()
    .duration(2000)
    .ease("linear")
    .call(arcTween, -Math.PI);

  lever.transition()
    .duration(2000)
    .ease("linear")
    .call(leverTween, -Math.PI)

  firstText.transition()
    .duration(200)
    .delay(1000)
    .style("opacity", 1.0);

  negativePoint.transition()
    .duration(500)
    .delay(2000)
    .style("opacity", 1.0);

  arcPathReturn.transition()
    .duration(2000)
    .delay(4000)
    .ease("linear")
    .call(arcTweenReturn, -Math.PI);

  lever.transition()
    .duration(2000)
    .delay(4000)
    .ease("linear")
    .call(leverTween, -2 * Math.PI)
    .each("end", restart);

  secondText.transition()
    .duration(200)
    .delay(5000)
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

function arcTween(transition, newAngle) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return phaseArc(d);
    };
  });
}


function arcTweenReturn(transition, newAngle) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return phaseArcReturn(d);
    };
  });
}

}) ();
