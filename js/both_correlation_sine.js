var SIG_CORRELATION_INTERACTIVE_SIN = (function() {

var canvasWidth = 300;
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

var subPlotHeight = plotHeight / 3;

var xRangeCorr = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRangeCorr = d3.scale.linear().range([subPlotHeight, MARGINS.top]);

var yRangeCorr1 = d3.scale.linear().range([subPlotHeight * 2 + 20, subPlotHeight + 20]);
var yRangeCorr2 = d3.scale.linear().range([subPlotHeight * 3 + 40, subPlotHeight * 2 + 40]);

xRangeCorr.domain([0, 4 * Math.PI]);
yRangeCorr.domain([-1.25, 1.25]);
yRangeCorr1.domain([-1.25, 1.25]);
yRangeCorr2.domain([-1.25, 1.25]);


var signalPhase = 0;
var signalFreq = 1;

var xAxis = d3.svg.axis()
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxis1 = d3.svg.axis()
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxis2 = d3.svg.axis()
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var vis = d3.select('#sigCorrelationInteractiveSin');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeCorr(0) + ')')
  .style('opacity', 0.25)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeCorr1(0) + ')')
  .style('opacity', 0.25)
  .call(xAxis1);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeCorr2(0) + ')')
  .style('opacity', 0.25)
  .call(xAxis2);

var color1 = "black";
var color2 = "green";
var color3 = "rgb(86, 60, 50)";

var corrSigPath1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color1)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color2)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", color3)
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.50);

var corrSig1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr(inputSignal(d + signalPhase)); });

var corrSig2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr1(-Math.sin(d * signalFreq)); });

var corrSig3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr2(inputSignal(d + signalPhase) * -Math.sin(d * signalFreq)); });

var corrSigData = d3.range(0, 4 * Math.PI, 0.05);

corrSigPath1.attr("d", corrSig1(corrSigData));
corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPath3.attr("d", corrSig3(corrSigData));

var corrSigSampleData = d3.range(0, 4 * Math.PI, 4 * Math.PI / 30);

function inputSignal(d)
{
  return Math.sin(d)
          + 0.5 * Math.sin(d * 3)
          + 0.25 * Math.sin(d * 5)
          //+ 0.10 * Math.sin(d * 10)
          ; 
}

var samples1 = vis.selectAll(".point1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .attr("fill", color1)
    .attr("opacity", 0.7)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(inputSignal(d)); })
    .attr("r", function(d, i) { return 2.0 });

var samples2 = vis.selectAll(".point2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .attr("fill", color2)
    .attr("opacity", 0.7)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(d * signalFreq + signalPhase)); })
    .attr("r", function(d, i) { return 2.0 });

var connectors = vis.selectAll(".connectors")
  .data(corrSigSampleData)
  .enter().append("line")
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(inputSignal(d)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(inputSignal(d) * -Math.sin(d * signalFreq + signalPhase)); })
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.20)
    .style("stroke-dasharray", ("3, 3"))
    ;

var samples3 = vis.selectAll(".point3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .attr("fill", color3)
    .attr("opacity", 0.7)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(inputSignal(d) * -Math.sin(d * signalFreq + signalPhase)); })
    .attr("r", function(d, i) { return 2.0 });


var xRangeDotProduct = d3.scale.linear().range([20, 280]);
xRangeDotProduct.domain([-20, 20]);

var xAxisDotProduct = d3.svg.axis()
  .scale(xRangeDotProduct)
  .tickSize(4)
  .ticks(10)
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (yRangeCorr2(0) + 60) + ')')
  .style('opacity', 0.45)
  .call(xAxisDotProduct);

var corrText = vis.append('text')
  .attr("text-anchor", "middle")
  .attr("x", xRangeDotProduct(0))
  .attr("y", (yRangeCorr2(0) + 90))
  .attr("stroke", "none")
  .attr("fill", "#555")
  .attr("font-size", 12)
  .attr("font-weight", "bold")
  .text("Dot Product: ");

vis.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 5)
    .attr("refY", 2)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .attr("fill", color3)
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

var dotProductLine = vis.append("line")
  .attr("x1", xRangeDotProduct(0))
  .attr("y1", (yRangeCorr2(0) + 60))
  .attr("x2", xRangeDotProduct(0))
  .attr("y2", (yRangeCorr2(0) + 60))
  .attr("stroke-width", 2)
  .attr("stroke", color3)
  //.attr("marker-end", "url(#arrowhead)")
  ;

var dotProductCircle = vis.append("svg:circle")
  .attr("cx", xRangeDotProduct(0))
  .attr("cy", (yRangeCorr2(0) + 60))
  .attr("stroke", "#eee")
  .attr("stroke-width", 1.5)
  .attr("fill", color3)
  .attr("r", 3.0);

signalPhase = -1;
signalFreq = -1;

function draw() {
  if (SIMPLE_CORRELATION_OFFSET == signalPhase && SIMPLE_CORRELATION_FREQ == signalFreq)
  {
    return;
  }
  signalPhase = SIMPLE_CORRELATION_OFFSET;
  signalFreq = SIMPLE_CORRELATION_FREQ;

  samples1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(inputSignal(d + signalPhase)); });
  
  samples2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(d * signalFreq)); });

  samples3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(inputSignal(d + signalPhase) * -Math.sin(d * signalFreq)); });

  connectors.data(corrSigSampleData)
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(inputSignal(d + signalPhase)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(inputSignal(d + signalPhase) * -Math.sin(d * signalFreq)); });


  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPath3.attr("d", corrSig3(corrSigData));

  var dotProduct = 0;
  for (i = 0; i < corrSigSampleData.length; i++)
  {
    var d = corrSigSampleData[i];
    dotProduct += inputSignal(d) * -Math.sin(d * signalFreq + signalPhase);
  }

  DP_SIN = dotProduct;

  corrText.text("Dot Product: " + dotProduct.toFixed(2));

  dotProductLine
    .attr("x2", xRangeDotProduct(dotProduct));

  dotProductCircle
    .attr("cx", xRangeDotProduct(dotProduct));
}

d3.timer(draw, 100);

}) ();