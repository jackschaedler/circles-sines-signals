var DOT_PRODUCT_GEO = (function() {

var canvasWidth = 250;
var canvasHeight = 250;
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

xRange.domain([-4, 4]);
yRange.domain([-4, 4]);

var xRangeInv = d3.scale.linear().range([-4, 4]);
var yRangeInv = d3.scale.linear().range([-4, 4]);

xRangeInv.domain([MARGINS.left, plotWidth]);
yRangeInv.domain([plotHeight, MARGINS.top]);


var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0, 0)
  .tickValues([-4, -3, -2, -1,  1, 2, 3, 4]);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0, 0)
  .tickValues([-4, -3, -2, -1,  1, 2, 3, 4])
  .orient('left');

var gridAxisX = d3.svg.axis()
  .scale(xRange)
  .tickSize(-plotHeight, 0)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4])
  .orient('bottom')
  .tickFormat("");

var gridAxisY = d3.svg.axis()
  .scale(yRange)
  .tickSize(-plotWidth, 0)
  .tickValues([-4, -3, -2, -1, 1, 2, 3, 4])
  .orient('left')
  .tickFormat("");


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#dotproductgeo');


vis.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 5)
    .attr("refY", 2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .attr("fill", "steelblue")
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

vis.append("defs").append("marker")
    .attr("id", "arrowhead_red")
    .attr("refX", 5)
    .attr("refY", 2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .attr("fill", "rgb(243,48,110)")
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

vis.append('svg:g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style("opacity", 0.3)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + (plotWidth / 2) + ',0)')
  .style("opacity", 0.3)
  .call(yAxis);

var aX = 3;
var aY = 2;

var bX = 0;
var bY = 2;


var vecA = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(aX))
  .attr("y2", yRange(aY))
  .attr("stroke-width", 2)
  .attr("stroke", "steelblue")
  .attr("marker-end", "url(#arrowhead)");

var vecB = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(bX))
  .attr("y2", yRange(bY))
  .attr("stroke-width", 2)
  .attr("stroke", "rgb(243,48,110)")
  .attr("marker-end", "url(#arrowhead_red)");

var projection = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 1.5)
  .attr("stroke", "black")
  .style('opacity', 0.5)
  .style("stroke-dasharray", ("3, 3"))
  ;

var projectionA = vis.append("line")
  .attr("x1", xRange(0))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3)
  .attr("stroke", "black")
  .style('opacity', 0.8)
  //.style("stroke-dasharray", ("3, 3"))
  ;

var dotProductBX = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5))
  .attr("y", yRange(3))
  .attr("font-size", 12)
  .attr("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "rgb(243,48,110)")
  .text("");

var dotProductAX = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5) + 30)
  .attr("y", yRange(3))
  .attr("font-size", 12)
  .attr("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "steelblue")
  .text("");

var dotProductPlus = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5) + 65)
  .attr("y", yRange(3))
  .attr("font-size", 12)
  .attr("stroke", "none")
  .attr("fill", "grey")
  .text("+");

var dotProductBY = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5) + 75)
  .attr("y", yRange(3))
  .attr("font-size", 12)
  .attr("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "rgb(243,48,110)")
  .text("");

var dotProductAY = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5) + 105)
  .attr("y", yRange(3))
  .attr("font-size", 12)
  .attr("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "steelblue")
  .text("");

var dotProductText = vis.append("text")
  .attr("text-anchor", "left")
  .attr("x", xRange(5) + 15)
  .attr("y", yRange(2.3))
  .attr("font-size", 12)
  .attr("stroke", "none")
  .attr("fill", "#333")
  .text("Dot Product = ")
  .attr("font-weight", "bold");

vis.on("mousedown", mouseDown);
vis.on("mouseup", mouseUp);
vis.on("mousemove", mouseMove);
//vis.on("mouseout", mouseUp);


var xRangeDotProduct = d3.scale.linear().range([300, 400]);
xRangeDotProduct.domain([-20, 20]);

var xAxisDotProduct = d3.svg.axis()
  .scale(xRangeDotProduct)
  .tickSize(4)
  .ticks(5)
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + 70 + ')')
  .style('opacity', 0.45)
  .call(xAxisDotProduct);

var dotProductLine = vis.append("line")
  .attr("x1", xRangeDotProduct(0))
  .attr("y1", 70)
  .attr("x2", xRangeDotProduct(0))
  .attr("y2", 70)
  .attr("stroke-width", 2)
  .attr("stroke", "black")
  //.attr("marker-end", "url(#arrowhead)")
  ;

var dotProductCircle = vis.append("svg:circle")
  .attr("cx", xRangeDotProduct(0))
  .attr("cy", 70)
  .attr("stroke", "#eee")
  .attr("stroke-width", 1.5)
  .attr("fill", "black")
  .attr("r", 3.0);


var activeVectorIsB = true;

function onVectorChangeButton()
{
  activeVectorIsB = !activeVectorIsB;
  vectorButton.text("Mouse Moves " + (activeVectorIsB ? "B" : "A"));
}


var vectorButton = d3.select('#wrapper').insert("button", ":first-child")
  .style("position", "absolute")
  .style("top", 135)
  .style("left", 490)
  .style("height", 25)
  .text("Mouse Moves B")
  .on("click", onVectorChangeButton);

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
  if (activeVectorIsB)
  {
    bX = xRangeInv(e[0]);
    bY = yRangeInv(e[1]);
  }
  else
  {
    aX = xRangeInv(e[0]);
    aY = yRangeInv(e[1]);
  }
}


function updateProjection()
{
  vecA
    .attr("x2", xRange(aX))
    .attr("y2", yRange(aY));

   vecB
    .attr("x2", xRange(bX))
    .attr("y2", yRange(bY));

  var magA = Math.sqrt((aY * aY) + (aX * aX));
  var magB = Math.sqrt((bY * bY) + (bX * bX));
  var dotProduct = (aX * bX) + (aY * bY);

  var multiplierA = dotProduct / (magA * magA);
  var projAX = aX * multiplierA;
  var projAY = aY * multiplierA;

  projection
    .attr("x1", xRange(projAX))
    .attr("y1", yRange(projAY))
    .attr("x2", xRange(bX))
    .attr("y2", yRange(bY));

  dotProductText.text("Dot Product = " + dotProduct.toFixed(3));
  dotProductBX.text(bX.toFixed(2));
  dotProductAX.text(" × " + aX.toFixed(2));

  dotProductBY.text(bY.toFixed(2));
  dotProductAY.text(" × " + aY.toFixed(2));

  projectionA
    .attr("x1", xRange(0))
    .attr("y1", yRange(0))
    .attr("x2", xRange(projAX))
    .attr("y2", yRange(projAY));

  projectionA.style("opacity", (mouseIsDown && !activeVectorIsB) ? 0.0 : 0.8);
  projection.style("opacity", (mouseIsDown && !activeVectorIsB) ? 0.0 : 0.4);

  dotProductLine
    .attr("x2", xRangeDotProduct(dotProduct));

  dotProductCircle
    .attr("cx", xRangeDotProduct(dotProduct));
}

d3.timer(updateProjection, 100);

}) ();



