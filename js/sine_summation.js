var SINE_SUMMATION_INTERACTIVE = (function() {

var canvasWidth = 550;
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
var yRangeCorr2 = d3.scale.linear().range([subPlotHeight * 3 + 70, subPlotHeight * 2 + 70]);

xRangeCorr.domain([0, 4 * Math.PI]);
yRangeCorr.domain([-1.25, 1.25]);
yRangeCorr1.domain([-1.25, 1.25]);
yRangeCorr2.domain([-1.25, 1.25]);


var signalPhase = 0;
var signalFreq = 1;
var signalAmp = 1.0;

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

var vis = d3.select('#sineSummationInteractive');

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

var color1 = "red";
var color2 = "steelblue";
var color3 = "purple";

var corrSigPath1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color1)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color2)
  .attr("fill", "none")
  .attr("opacity", 0.5);

var corrSigPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", "none")
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.5);

var corrSig1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr(inputSignal(d)); });

var corrSig2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr1(signalAmp * Math.sin(d + signalPhase)); });

var corrSig3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr2(inputSignal(d) + signalAmp * Math.sin(d + signalPhase)); });

var corrSigData = d3.range(0, 4 * Math.PI + 0.1, 0.1);

corrSigPath1.attr("d", corrSig1(corrSigData));
corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPath3.attr("d", corrSig3(corrSigData));

var corrSigSampleData = d3.range(0, 4 * Math.PI, 4 * Math.PI / 30);


vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeCorr(0))
  .attr("y", yRangeCorr(1))
  .attr("stroke", "none")
  .style("font-size", "11px")
  .attr("fill", "#333")
  .text("Signal A");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeCorr(0))
  .attr("y", yRangeCorr1(1.1))
  .attr("stroke", "none")
  .style("font-size", "11px")
  .attr("fill", "#333")
  .text("Signal B");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeCorr(0))
  .attr("y", yRangeCorr2(2.2))
  .attr("stroke", "none")
  .style("font-size", "11px")
  .attr("fill", "#333")
  .text("Signal A + Signal B");

function inputSignal(d)
{
  return Math.sin(d); 
}

var samples1 = vis.selectAll(".point1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .attr("fill", color1)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(inputSignal(d)); })
    .attr("r", function(d, i) { return 2.0 });

var samples2 = vis.selectAll(".point2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .attr("fill", color2)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.sin(d * signalFreq + signalPhase)); })
    .attr("r", function(d, i) { return 2.0 });

var connectors = vis.selectAll(".connectors")
  .data(corrSigSampleData)
  .enter().append("line")
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(inputSignal(d)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(inputSignal(d) + signalAmp * Math.sin(d + signalPhase)); })
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
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(inputSignal(d) + Math.sin(d * signalFreq + signalPhase)); })
    .attr("r", function(d, i) { return 2.0 });


function draw() {
  if (signalPhase === SIMPLE_CORRELATION_OFFSET && signalAmp === SIMPLE_CORRELATION_AMP)
  {
    return;
  }

  signalPhase = SIMPLE_CORRELATION_OFFSET;
  signalAmp = SIMPLE_CORRELATION_AMP;
  
  samples2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.sin(d * signalFreq + signalPhase) * signalAmp); });

  samples3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(inputSignal(d) + Math.sin(d * signalFreq + signalPhase) * signalAmp); });

  connectors.data(corrSigSampleData)
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(inputSignal(d)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(inputSignal(d) + signalAmp * Math.sin(d + signalPhase) * signalAmp); });

  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPath3.attr("d", corrSig3(corrSigData));
}

d3.timer(draw, 100);

}) ();