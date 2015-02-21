var DP_CIRCLE = (function() {

var canvasWidth = 200;
var canvasHeight = 200;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

plotWidth = canvasWidth - MARGINS.left - MARGINS.right,
plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

xRangeComplex = d3.scale.linear().range([0, plotWidth]);
xRangeComplex.domain([-18, 18]);
yRangeComplex = d3.scale.linear().range([plotHeight, 0]);
yRangeComplex.domain([-18, 18]);

var xAxisComplex = d3.svg.axis()
  .scale(xRangeComplex)
  .tickSize(2)
  .tickValues([5, 10, 15, -5, -10, -15, -20])
  .tickSubdivide(true);

var yAxisComplex = d3.svg.axis()
  .scale(yRangeComplex)
  .tickSize(2)
  .tickValues([5, 10, 15, 20, -5, -10, -15, -20])
  .tickSubdivide(true)
  .orient("left");

var vis = d3.select('#dpcircle');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeComplex(0) + ')')
  .style('opacity', 0.35)
  .call(xAxisComplex);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + xRangeComplex(0) + ',0)')
  .style('opacity', 0.35)
  .call(yAxisComplex);

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", xRangeComplex(17))
  .attr("y", yRangeComplex(0) - 4)
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-size", 12)
  .attr("font-weight", "normal")
  .text("Real Axis ");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", xRangeComplex(1))
  .attr("y", yRangeComplex(16))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-size", 12)
  .attr("font-weight", "normal")
  .text("Imaginary Axis ");

var circle = vis.append("svg:circle")
  .attr("stroke", "grey")
  .style("stroke-width", 1.5)
  .attr("fill", "none")
  .style('opacity', 0.50)
  .attr("cx", xRangeComplex(0))
  .attr("cy", yRangeComplex(0))
  .attr("r", xRangeComplex(15) - xRangeComplex(0));

var complexVectorReal = vis.append("line")
  .attr("x1", xRangeComplex(0) + 0.5)
  .attr("y1", yRangeComplex(0) + 0.5)
  .attr("x2", xRangeComplex(0) + 0.5)
  .attr("y2", yRangeComplex(0) + 0.5)
  .attr("stroke-width", 3)
  .style("stroke-linecap", "round")
  .style('opacity', 0.5)
  .attr("stroke", "red");

var complexVectorImag = vis.append("line")
  .attr("x1", xRangeComplex(0) + 0.5)
  .attr("y1", yRangeComplex(0) + 0.5)
  .attr("x2", xRangeComplex(0) + 0.5)
  .attr("y2", yRangeComplex(15))
  .attr("stroke-width", 3)
  .style("stroke-linecap", "round")
  .style("opacity", 0.5)
  .attr("stroke", "green");

var complexVectorRealConnector = vis.append("line")
  .style("opacity", 0.2)
  .attr("stroke-width", 1.5)
  .attr("stroke", "grey");

var complexVectorImagConnector = vis.append("line")
  .style("opacity", 0.2)
  .attr("stroke-width", 1.5)
  .attr("stroke", "grey");

var complexVector = vis.append("line")
  .attr("x1", xRangeComplex(0) + 0.5)
  .attr("y1", yRangeComplex(0) + 0.5)
  .attr("x2", xRangeComplex(0))
  .attr("y2", yRangeComplex(15))
  .attr("stroke-width", 3)
  .style("stroke-linecap", "round")
  .style("opacity", 0.6)
  .attr("stroke", "black");

var point = vis.append('svg:circle')
  .attr('r', 3)
  .attr('stroke-width', 1.5)
  .attr('stroke', '#eee')
  .attr('fill', 'black')
  .attr('opacity', 0.9);

var pointText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("font-weight", "bold")
  .text("");

var colorCos = "red";
var colorSin = "green";
var color3 = "grey";

function draw() {
  var dotProductCos = DP_COS;
  var dotProductSin = DP_SIN;

  complexVectorReal
    .attr("x2", xRangeComplex(dotProductCos) + 0.5);

  complexVectorImag
    .attr("x1", xRangeComplex(dotProductCos) + 0.5)
    .attr("x2", xRangeComplex(dotProductCos) + 0.5)
    .attr("y2", yRangeComplex(dotProductSin) + 0.5);

  complexVector
    .attr("x2", xRangeComplex(dotProductCos) + 0.5)
    .attr("y2", yRangeComplex(dotProductSin) + 0.5);

  var sign = 
    dotProductSin > 0
    ? "+"
    : "";

  pointText
    .attr("x", xRangeComplex(dotProductCos) + 5)
    .attr("y", yRangeComplex(dotProductSin))
    .text(dotProductCos.toFixed(2) + " " + sign + " " + dotProductSin.toFixed(2) + "i");

  point
    .attr("cx", xRangeComplex(dotProductCos))
    .attr("cy", yRangeComplex(dotProductSin));

  circle.attr("r", xRangeComplex(Math.sqrt(DP_COS * DP_COS + DP_SIN * DP_SIN)) - xRangeComplex(0))

}

d3.timer(draw, 100);

}) ();