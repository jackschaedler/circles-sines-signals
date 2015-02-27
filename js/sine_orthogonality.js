var SIN_COS_ORTHOGONALITY = (function() {

var canvasWidth = 230;
var canvasHeight = 200;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 5
  };

plotWidth = canvasWidth - MARGINS.left - MARGINS.right,
plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var subPlotHeight = plotHeight / 3;

var xRangeCorr = d3.scale.linear().range([MARGINS.left, plotWidth]);
var xRangeCorr2 = d3.scale.linear().range([plotWidth + 20, plotWidth + 20 + plotWidth]);
var yRangeCorr = d3.scale.linear().range([subPlotHeight, MARGINS.top]);

var yRangeCorr1 = d3.scale.linear().range([subPlotHeight * 2, subPlotHeight]);
var yRangeCorr2 = d3.scale.linear().range([subPlotHeight * 3, subPlotHeight * 2]);

xRangeCorr.domain([0, 2 * Math.PI]);
xRangeCorr2.domain([0, 2 * Math.PI]);
yRangeCorr.domain([-1.25, 1.25]);
yRangeCorr1.domain([-1.25, 1.25]);
yRangeCorr2.domain([-1.25, 1.25]);

xRangeComplex = d3.scale.linear().range([plotWidth + 20 + plotWidth + 20, plotWidth + 20 + plotWidth + 20 + 160]);
xRangeComplex.domain([-5, 5]);
yRangeComplex = d3.scale.linear().range([180, 20]);
yRangeComplex.domain([-5, 5]);

var signalPhase = 0;

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


var xAxisSin = d3.svg.axis()
  .scale(xRangeCorr2)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisSin1 = d3.svg.axis()
  .scale(xRangeCorr2)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisSin2 = d3.svg.axis()
  .scale(xRangeCorr2)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);


var xAxisComplex = d3.svg.axis()
  .scale(xRangeComplex)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxisComplex = d3.svg.axis()
  .scale(yRangeComplex)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true)
  .orient("left");

var vis = d3.select('#sigCorrelationInteractiveSinCos');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxis1);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((subPlotHeight * 2) + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxis2);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin1);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((subPlotHeight * 2) + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin2);

var colorCos = "red";
var colorSin = "green";
var color3 = "rgb(86, 60, 50)";

var corrSigPath1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorCos)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorCos)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", color3)
  .attr("fill-opacity", 0.0)
  .attr("opacity", 0.50);


var corrSigPathSin1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorSin)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPathSin2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorSin)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPathSin3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", color3)
  .attr("fill-opacity", 0.2)
  .attr("opacity", 0.50);


var inputFrequency = 0.5;
var basisFrequency = 4;

var corrSig1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr(Math.cos(inputFrequency * d + signalPhase)); });

var corrSig2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr1(Math.cos(basisFrequency * d)); });

var corrSig3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr2(Math.cos(inputFrequency * d + signalPhase) * Math.cos(basisFrequency * d)); });


var corrSigSin1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr2(d)})
  .y(function (d, i) { return yRangeCorr(Math.sin(inputFrequency * d + signalPhase)); });

var corrSigSin2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr2(d)})
  .y(function (d, i) { return yRangeCorr1(Math.sin(basisFrequency * d)); });

var corrSigSin3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr2(d)})
  .y(function (d, i) { return yRangeCorr2(Math.sin(inputFrequency * d + signalPhase) * Math.sin(basisFrequency * d)); });

var corrSigData = d3.range(0, 2 * Math.PI + 0.05, 0.05);

var dpArea = d3.svg.area()
  .x(function(d) { return xRangeCorr(d); })
  .y0(yRangeCorr2(0))
  .y1(function(d) { return yRangeCorr2(Math.cos(inputFrequency * d + signalPhase) * Math.cos(basisFrequency * d)); });

var dpAreaPath = vis.append("svg:path")
  .datum(corrSigData)
  .attr("stroke", "none")
  .attr("fill", color3)
  .style("opacity", 0.1)
  .attr("d", dpArea);

corrSigPath1.attr("d", corrSig1(corrSigData));
corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPath3.attr("d", corrSig3(corrSigData));

corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
corrSigPathSin2.attr("d", corrSigSin2(corrSigData));
corrSigPathSin3.attr("d", corrSigSin3(corrSigData));

var corrSigSampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 8);

var connectors = vis.selectAll(".connectors")
  .data(corrSigSampleData)
  .enter().append("line")
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(Math.cos(d)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(Math.cos(d) * Math.cos(d + signalPhase)); })
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.20)
    //.style("stroke-dasharray", ("5, 1"))
    ;

var connectorsSin = vis.selectAll(".connectors")
  .data(corrSigSampleData)
  .enter().append("line")
    .attr("x1", function(d, i) { return xRangeCorr2(d); })
    .attr("y1", function(d, i) { return yRangeCorr(Math.sin(d)); })
    .attr("x2", function(d, i) { return xRangeCorr2(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(Math.sin(d + signalPhase) * Math.sin(d)); })
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.20)
    //.style("stroke-dasharray", ("5, 1"))
    ;

var samples1 = vis.selectAll(".point1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorCos)
    .style("stroke-width", 1.5)
    .attr("fill", colorCos)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(Math.cos(d + signalPhase)); })
    .attr("r", function(d, i) { return 1.5 });

var samples2 = vis.selectAll(".point2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorCos)
    .style("stroke-width", 1.5)
    .attr("fill", colorCos)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(d)); })
    .attr("r", function(d, i) { return 1.5 });

var samples3 = vis.selectAll(".point3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color3)
    .style("stroke-width", 1.5)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(Math.cos(d + signalPhase) * Math.cos(d)); })
    .attr("r", function(d, i) { return 1.5 });


var samplesSin1 = vis.selectAll(".point1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorSin)
    .style("stroke-width", 1.5)
    .attr("fill", colorSin)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr(Math.sin(d + signalPhase)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin2 = vis.selectAll(".point2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorSin)
    .style("stroke-width", 1.5)
    .attr("fill", colorSin)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.sin(d)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin3 = vis.selectAll(".point3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color3)
    .style("stroke-width", 1.5)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(Math.sin(d + signalPhase) * Math.sin(d)); })
    .attr("r", function(d, i) { return 1.5 });

////////////////////////////////////////////////////////////////

var xRangeDotProduct = d3.scale.linear().range([10, 210]);
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
  .attr("y", 210)
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


var xRangeDotProductSin = d3.scale.linear().range([260, 460]);
xRangeDotProductSin.domain([-20, 20]);

var xAxisDotProductSin = d3.svg.axis()
  .scale(xRangeDotProductSin)
  .tickSize(4)
  .ticks(10)
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (yRangeCorr2(0) + 60) + ')')
  .style('opacity', 0.45)
  .call(xAxisDotProductSin);

var corrTextSin = vis.append('text')
  .attr("text-anchor", "middle")
  .attr("x", xRangeDotProductSin(0))
  .attr("y", 210)
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

var dotProductLineSine = vis.append("line")
  .attr("x1", xRangeDotProductSin(0))
  .attr("y1", (yRangeCorr2(0) + 60))
  .attr("x2", xRangeDotProductSin(0))
  .attr("y2", (yRangeCorr2(0) + 60))
  .attr("stroke-width", 2)
  .attr("stroke", color3)
  //.attr("marker-end", "url(#arrowhead)")
  ;

var dotProductCircleSin = vis.append("svg:circle")
  .attr("cx", xRangeDotProductSin(0))
  .attr("cy", (yRangeCorr2(0) + 60))
  .attr("stroke", "#eee")
  .attr("stroke-width", 1.5)
  .attr("fill", color3)
  .attr("r", 3.0);

function draw() {

  if(signalPhase === SIMPLE_CORRELATION_OFFSET2 
      && inputFrequency === BASIS_FREQUENCY_1
      && basisFrequency === BASIS_FREQUENCY_2)
  {
    return;
  }

  signalPhase = SIMPLE_CORRELATION_OFFSET2;
  inputFrequency = BASIS_FREQUENCY_1;
  basisFrequency = BASIS_FREQUENCY_2;

  document.getElementById("phaseShift").innerHTML = "Phase Shift: &nbsp; <b>" + (signalPhase * 180 / Math.PI).toFixed(2) + "°</b>";
  document.getElementById("upperFreq").innerHTML = "Upper Frequency: &nbsp; <b>" + inputFrequency + " Hz</b>";
  document.getElementById("lowerFreq").innerHTML = "Lower Frequency: &nbsp; <b>" + basisFrequency + " Hz</b>";


  samples1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(Math.cos(inputFrequency * d + signalPhase)); });
  
  samples2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(basisFrequency * d)); });

  samples3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(Math.cos(inputFrequency * d + signalPhase) * Math.cos(basisFrequency * d)); });

  connectors.data(corrSigSampleData)
    .attr("x1", function(d, i) { return xRangeCorr(d); })
    .attr("y1", function(d, i) { return yRangeCorr(Math.cos(inputFrequency * d + signalPhase)); })
    .attr("x2", function(d, i) { return xRangeCorr(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(Math.cos(inputFrequency * d + signalPhase) * Math.cos(basisFrequency * d)); });

  samplesSin1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr(Math.sin(inputFrequency * d + signalPhase)); });
  
  samplesSin2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.sin(basisFrequency * d)); });

  samplesSin3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr2(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(Math.sin(inputFrequency * d + signalPhase) * Math.sin(basisFrequency * d)); });

  connectorsSin.data(corrSigSampleData)
    .attr("x1", function(d, i) { return xRangeCorr2(d); })
    .attr("y1", function(d, i) { return yRangeCorr(Math.sin(inputFrequency * d + signalPhase)); })
    .attr("x2", function(d, i) { return xRangeCorr2(d); })
    .attr("y2", function(d, i) { return yRangeCorr2(Math.sin(inputFrequency * d + signalPhase) * Math.sin(basisFrequency * d)); });

  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPath3.attr("d", corrSig3(corrSigData));

  corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
  corrSigPathSin2.attr("d", corrSigSin2(corrSigData));
  corrSigPathSin3.attr("d", corrSigSin3(corrSigData));

  dpAreaPath
    .datum(corrSigData)
    .attr("d", dpArea);

  var dotProductCos = 0;
  var dotProductSin = 0;
  for (i = 0; i < corrSigSampleData.length; i++)
  {
    var d = corrSigSampleData[i];
    dotProductCos += Math.cos(inputFrequency * d + signalPhase) * Math.cos(basisFrequency * d);
    dotProductSin += Math.sin(inputFrequency * d + signalPhase) * Math.sin(basisFrequency * d);
  }

  corrText.text("Dot Product: " + dotProductCos.toFixed(2));
  corrTextSin.text("Dot Product: " + dotProductSin.toFixed(2));

  dotProductLine
    .attr("x2", xRangeDotProduct(dotProductCos));
  dotProductCircle
    .attr("cx", xRangeDotProduct(dotProductCos));

  dotProductLineSine
    .attr("x2", xRangeDotProductSin(dotProductSin));
  dotProductCircleSin
    .attr("cx", xRangeDotProductSin(dotProductSin));
}

d3.timer(draw, 100);

}) ();