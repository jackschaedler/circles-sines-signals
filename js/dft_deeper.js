var DFT_DEEPER = (function() {

var canvasWidth = 230;
var canvasHeight = 220;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var xOffset = 100;

var plotWidth = (canvasWidth - MARGINS.left - MARGINS.right);
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var subPlotHeight = plotHeight / 3;

var xRangeCorr = d3.scale.linear().range([MARGINS.left + xOffset, plotWidth + xOffset]);
var yRangeCorr = d3.scale.linear().range([subPlotHeight, MARGINS.top]);

var yRangeCorr1 = d3.scale.linear().range([subPlotHeight * 2, subPlotHeight]);
var yRangeCorr2 = d3.scale.linear().range([subPlotHeight * 3, subPlotHeight * 2]);

xRangeCorr.domain([0, 2 * Math.PI]);
yRangeCorr.domain([-1.4, 1.4]);
yRangeCorr1.domain([-1.4, 1.4]);
yRangeCorr2.domain([-1.4, 1.4]);

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
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisSin1 = d3.svg.axis()
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisSin2 = d3.svg.axis()
  .scale(xRangeCorr)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var vis = d3.select('#dftDeeper');

var xAxisOffsetRight = 280;

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (subPlotHeight + (subPlotHeight / 2) + 0.5) + ')')
  .style('opacity', 0.25)
  .call(xAxis1);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((subPlotHeight * 2) + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxis2);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(' + xAxisOffsetRight + ',' + (subPlotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(' + xAxisOffsetRight + ',' + (subPlotHeight + (subPlotHeight / 2) + 0.5) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin1);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(' + xAxisOffsetRight + ',' + ((subPlotHeight * 2) + (subPlotHeight / 2)) + ')')
  .style('opacity', 0.25)
  .call(xAxisSin2);



vis.append('text')
  .attr("text-anchor", "end")
  .attr("x", xRangeCorr(0) - 15)
  .attr("y", yRangeCorr(0) + 3)
  .text("Input Signal")
  .style("fill", "black")
  .style("opacity", 0.5)
  .style("font-size", "11px");

vis.append('text')
  .attr("text-anchor", "end")
  .attr("x", xRangeCorr(0) - 15)
  .attr("y", yRangeCorr(0) + 80)
  .text("Cosine Basis")
  .style("opacity", 0.5)
  .style("fill", "black")
  .style("font-size", "11px");

vis.append('text')
  .attr("text-anchor", "end")
  .attr("x", xRangeCorr(0) - 15)
  .attr("y", yRangeCorr(0) + 147)
  .text("Product")
  .style("opacity", 0.5)
  .style("fill", "black")
  .style("font-size", "11px");


vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", xAxisOffsetRight + 345)
  .attr("y", yRangeCorr(0) + 3)
  .text("Input Signal")
  .style("opacity", 0.5)
  .style("fill", "black")
  .style("font-size", "11px");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", xAxisOffsetRight + 345)
  .attr("y", yRangeCorr(0) + 80)
  .text("Sine Basis")
  .style("opacity", 0.5)
  .style("fill", "black")
  .style("font-size", "11px");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", xAxisOffsetRight + 345)
  .attr("y", yRangeCorr(0) + 147)
  .text("Product")
  .style("opacity", 0.5)
  .style("fill", "black")
  .style("font-size", "11px");



var color1 = "black";
var colorVec = "#E7742F";
var colorCos = "red";
var colorSin = "green";
var color3 = "rgb(86, 60, 50)";

var binNumber = 0;

var corrSigPath1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color1)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPathSin1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color1)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorCos)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPathSin2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", colorSin)
  .attr("fill", "none")
  .attr("opacity", 0.4);

var corrSigPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", "none")
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.4);

var corrSigPathSin3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", "color3")
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.4);

var sigFxs = [];
var currentSigFx = 0;
sigFxs.push(
  (function(d) { 
    return Math.sin(d * FREQUENCY + PHASE); })
);
sigFxs.push(
  (function(d) { 
    return Math.sin(d * FREQUENCY + PHASE) 
           + (0.4 * Math.sin(d * FREQUENCY * 3 + (PHASE * 3))); })
);
sigFxs.push(
  (function(d) { 
    return Math.sin(d * FREQUENCY + PHASE) 
            + (0.4 * Math.sin(d * FREQUENCY * 2 + (PHASE * 2))) 
            + (0.25 * Math.sin(d * FREQUENCY * 3 + (PHASE * 3))); })
);
var sigFx = sigFxs[currentSigFx];


var corrSig1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr(sigFx(d)); });

var corrSigSin1 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d) + xAxisOffsetRight})
  .y(function (d, i) { return yRangeCorr(sigFx(d)); });

var corrSig2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr1(Math.cos(binNumber * d)); });

var corrSigSin2 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d) + xAxisOffsetRight})
  .y(function (d, i) { return yRangeCorr1(-Math.sin(binNumber * d)); });

var corrSig3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d)})
  .y(function (d, i) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); });

var corrSigSin3 = d3.svg.line()
  .x(function (d, i) { return xRangeCorr(d) + xAxisOffsetRight})
  .y(function (d, i) { return yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)); });


function updateSignals()
{
  samples1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    ;

  samplesSin1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    ;

  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
}

function updateBasis()
{
  samples2
  .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(binNumber * d)); });

  samplesSin2
  .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(binNumber * d)); });

corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPathSin2.attr("d", corrSigSin2(corrSigData));

currentBinIndicator
  .attr("x", complexRangesX[binNumber](-4) - 4.5)
}

function setBin(bin)
{
  binNumber = bin % 8;
  if (binNumber < 0) {
    binNumber = 7;
  }
  updateBasis();
}

function incrementBin()
{
  setBin(binNumber + 1)
}

function decrementBin()
{
  setBin(binNumber - 1)
}

var signalButton = d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .text("Change Input Signal")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 305)
  .style("height", 25)
  .on("click", changeSignal);

d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .text("Next Bin")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 455)
  .style("height", 25)
  .on("click", incrementBin);

d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .text("Prev Bin")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 220)
  .style("height", 25)
  .on("click", decrementBin);


function changeSignal()
{
  currentSigFx++;
  if (currentSigFx >= sigFxs.length)
  {
    currentSigFx = 0;
  }
  sigFx = sigFxs[currentSigFx];
  updateSignals();
  doMultiply();
}


var corrSigData = d3.range(0, 2 * Math.PI + 0.05, 0.05);

var dpArea = d3.svg.area()
  .x(function(d) { return xRangeCorr(d); })
  .y0(yRangeCorr2(0))
  .y1(function(d) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); });

var dpAreaPath = vis.append("svg:path")
  .datum(corrSigData)
  .attr("stroke", "none")
  .attr("fill", color3)
  .style("opacity", 0.1)
  .attr("d", dpArea);


corrSigPath1.attr("d", corrSig1(corrSigData));
corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPathSin2.attr("d", corrSigSin2(corrSigData));
corrSigPath3.attr("d", corrSig3(corrSigData));
corrSigPathSin3.attr("d", corrSigSin3(corrSigData));

var corrSigSampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 8);

var samples1 = vis.selectAll(".point1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color1)
    .style("stroke-width", 1.5)
    .attr("fill", color1)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin1 = vis.selectAll(".pointSin1")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color1)
    .style("stroke-width", 1.5)
    .attr("fill", color1)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    .attr("r", function(d, i) { return 1.5 });

var samples2 = vis.selectAll(".point2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorCos)
    .style("stroke-width", 1.5)
    .attr("fill", colorCos)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(binNumber * d)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin2 = vis.selectAll(".pointSin2")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", colorSin)
    .style("stroke-width", 1.5)
    .attr("fill", colorSin)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(binNumber * d)); })
    .attr("r", function(d, i) { return 1.5 });

var samples3 = vis.selectAll(".point3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color3)
    .style("stroke-width", 1.5)
    .style('opacity', 0.4)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin3 = vis.selectAll(".pointSin3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color3)
    .style("stroke-width", 1.5)
    .style('opacity', 0.4)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)); })
    .attr("r", function(d, i) { return 1.5 });

// Complex Parts

var complexLabels = [];
var complexPairTexts = [];
var complexRealVectors = [];
var complexImagVectors = [];
var complexCircles = [];
var complexVectors = [];
var complexPartsY = 270;
var complexPartSize = 80;

var complexRangeY =
    d3.scale.linear()
      .range([complexPartsY + complexPartSize, complexPartsY])
      .domain([-4.5, 4.5]);

var complexRangesX = [];
var startX = 0;
var endX = 0;
var midpoints = [];

for (i = 0; i < 8; i++)
{
  var padding = i == 0 ? 0 : 9;
  startX = endX + padding;
  endX = startX + complexPartSize;
  midpoints.push(startX + (complexPartSize / 2));

  complexRangesX.push(
    d3.scale.linear()
      .range([startX, endX])
      .domain([-4.5, 4.5])
  );
}

var complexAxesX = [];
var complexAxesY = [];

for (i = 0; i < 8; i++)
{
  complexAxesX.push(
    d3.svg.axis()
      .scale(complexRangesX[i])
      .tickSize(0)
      .ticks(0)
      .tickSubdivide(true)
  );

  complexAxesY.push(
    d3.svg.axis()
      .scale(complexRangeY)
      .tickSize(0)
      .ticks(0)
      .orient('left')
      .tickSubdivide(true)
  );

  vis.append("svg:rect")
    .attr("x", complexRangesX[i](-4) - 4.5)
    .attr("y", complexPartsY - 40)
    .attr("width", complexPartSize )
    .attr("height", complexPartSize + 65)
    .style("opacity", 0.0)
    .on("click", function() {
      var localBin = i;
      return function() {
        setBin(localBin);
      };
    }());

  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (complexPartsY + complexPartSize / 2) + ')')
    .style('opacity', 0.25)
    .call(complexAxesX[i]);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (midpoints[i]) + ',0)')
    .style('opacity', 0.25)
    .call(complexAxesY[i]);


  complexCircles.push(vis.append('svg:circle')
    .attr('cx', complexRangesX[i](0))
    .attr('cy', complexRangeY(0))
    .attr('r', complexRangesX[i](4) - complexRangesX[i](0))
    .attr('stroke-width', 1.5)
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr('opacity', 0.5)
  );

  complexLabels.push(vis.append('text')
    .attr("text-anchor", "middle")
    .attr("x", midpoints[i])
    .attr("y", complexPartsY - 10)
    .text("DFT[" + i + "]")
    .style("fill", "black")
    .style("opacity", 0.45)
    .style("font-size", "11px")
    //.style("font-weight", "bold")
  );

  complexPairTexts.push(vis.append('text')
    .attr("text-anchor", "middle")
    .attr("x", midpoints[i])
    .attr("y", complexPartsY + complexPartSize + 10 + 4)
    .text("(Real, Imag)")
    .style("fill", "black")
    .style("opacity", 0.0)
    .style("font-size", "11px")
    //.style("font-weight", "bold")
  );

  complexRealVectors.push(
    vis.append("line")
      .attr("x1", complexRangesX[i](0))
      .attr("y1", complexRangeY(0))
      .attr("x2", complexRangesX[i](0))
      .attr("y2", complexRangeY(0))
      .attr("stroke-width", 1.5)
      .attr("stroke", "red")
      .style("stroke-linecap", "round")
      .style("opacity", 0.0)
    );

  complexImagVectors.push(
    vis.append("line")
      .attr("x1", complexRangesX[i](0))
      .attr("y1", complexRangeY(0))
      .attr("x2", complexRangesX[i](0))
      .attr("y2", complexRangeY(0))
      .attr("stroke-width", 1.5)
      .attr("stroke", "green")
      .style("stroke-linecap", "round")
      .style("opacity", 0.0)
    );

  complexVectors.push(
    vis.append("line")
      .attr("x1", complexRangesX[i](0))
      .attr("y1", complexRangeY(0))
      .attr("x2", complexRangesX[i](0))
      .attr("y2", complexRangeY(0))
      .attr("stroke-width", 2)
      .attr("stroke", "black")
      .style("stroke-linecap", "round")
      .style("opacity", 0.0)
    );
}

var currentBinIndicator = vis.append("svg:rect")
  .attr("x", complexRangesX[0](-4) - 4.5)
  .attr("y", complexPartsY - 40)
  .attr("width", complexPartSize )
  .attr("height", complexPartSize + 65)
  .style("stroke", "none")
  .style("stroke-width", 2)
  .style("fill", "grey")
  .attr("rx", 5)
  .attr("ry", 5)
  .style("opacity", 0.1);

vis.append('text')
    .attr("text-anchor", "middle")
    .attr("x", midpoints[0])
    .attr("y", complexPartsY - 25)
    .text("DC Bin")
    .style("fill", "black")
    .style("opacity", 0.45)
    .style("font-size", "11px")
    .style("font-weight", "bold");

vis.append('text')
    .attr("text-anchor", "middle")
    .attr("x", midpoints[4])
    .attr("y", complexPartsY - 25)
    .text("Nyquist Bin")
    .style("fill", "black")
    .style("opacity", 0.45)
    .style("font-size", "11px")
    .style("font-weight", "bold");


///////////////////////////////////////////////////////////////
var xRangeFreq = d3.scale.linear().range([10, 330]);
var yRangeFreq = d3.scale.linear().range([550 + 50, 450]);

xRangeFreq.domain([0, 7]);
yRangeFreq.domain([0.0, 5]);

var xAxisFreq = d3.svg.axis()
  .scale(xRangeFreq)
  .tickSize(3)
  .tickSubdivide(true);

var yAxisFreq = d3.svg.axis()
  .scale(yRangeFreq)
  .tickSize(2)
  .ticks(0)
  .tickValues([1, 2, 3, 4, 5])
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeFreq(0) + ')')
  .style("opacity", 0.4)
  .call(xAxisFreq);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + xRangeFreq(0) + ',0)')
  .style("opacity", 0.4)
  .call(yAxisFreq);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangeFreq(3.5))
  .attr("y", yRangeFreq(5.3))
  .style("font-size", "11px")
  .style("font-weight", "normal")
  .attr("stroke", "none")
  .style("opacity", 0.5)
  .text("Magnitude");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangeFreq(3.7))
  .attr("y", yRangeFreq(-0.85))
  .style("font-size", "12px")
  .style("opacity", 0.5)
  .text("Frequency (Hz)");

var magnitudes = [0, 4, 0, 0, 0, 0, 0, 0];

vis.append("svg:line")
    .attr("stroke",  "grey")
    .style("stroke-width", 1)
    .attr("x1", xRangeFreq(4))
    .attr("y1", yRangeFreq(0))
    .attr("x2", xRangeFreq(4))
    .attr("y2", yRangeFreq(5))
    .style("opacity", 0.5)
    .style("stroke-dasharray", ("5, 1"))
    ;

var sticks = vis.selectAll(".sticks")
  .data(magnitudes)
  .enter().append("svg:line")
    .attr("stroke",  "steelblue")
    .style("stroke-width", 2)
    .attr("x1", function(d, i) { return xRangeFreq(i); })
    .attr("y1", function(d, i) { return yRangeFreq(0); })
    .attr("x2", function(d, i) { return xRangeFreq(i); })
    .attr("y2", function(d, i) { return yRangeFreq(d); })
    .style("opacity", 0.5)
    //.style("stroke-dasharray", ("5, 1"))
    ;

var points = vis.selectAll(".point")
  .data(magnitudes)
  .enter().append("svg:rect")
    .attr("stroke",  "steelblue")
    .style("stroke-width", 1)
    .attr("fill",  "steelblue")
    .attr("x", function(d, i) { return xRangeFreq(i) - 2; })
    .attr("y", function(d, i) { return yRangeFreq(d) - 2})
    .attr("width", 4)
    .attr("height", 4.5);

//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
var xRangePhase = d3.scale.linear().range([10, 330]);
var yRangePhase = d3.scale.linear().range([550 + 50, 450]);

xRangePhase.domain([0, 7]);
yRangePhase.domain([-Math.PI, Math.PI]);

var xAxisPhase = d3.svg.axis()
  .scale(xRangePhase)
  .tickSize(3)
  .tickValues([1, 2, 3, 4, 5, 6, 7])
  .tickSubdivide(true);

var yAxisPhase = d3.svg.axis()
  .scale(yRangePhase)
  .tickSize(2)
  .ticks(0)
  .tickValues([-3.14, -1.57, 1.57, 3.14])
  .orient('right')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(' + 360 + ',' + yRangePhase(0) + ')')
  .style("opacity", 0.4)
  .call(xAxisPhase);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + 370 + ',0)')
  .style("opacity", 0.4)
  .call(yAxisPhase);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangePhase(3.5))
  .attr("y", yRangePhase(3.5))
  .style("font-size", "11px")
  .style("font-weight", "normal")
  .attr("stroke", "none")
  .attr('transform', 'translate(' + 370 + ',0)')
  .style("opacity", 0.5)
  .text("Phase");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRangePhase(3.7))
  .attr("y", yRangePhase(-4.14))
  .style("font-size", "12px")
  .style("opacity", 0.5)
  .attr('transform', 'translate(' + 370 + ',0)')
  .text("Frequency (Hz)");

vis.append("svg:line")
    .attr("stroke",  "grey")
    .style("stroke-width", 1)
    .attr("x1", xRangePhase(4))
    .attr("y1", yRangePhase(-Math.PI))
    .attr("x2", xRangePhase(4))
    .attr("y2", yRangePhase(Math.PI))
    .style("opacity", 0.5)
    .style("stroke-dasharray", ("5, 1"))
    .attr('transform', 'translate(' + 360 + ',0)')
    ;

var phases = [0, 0, 0, 0, 0, 0, 0, 0];

var phaseSticks = vis.selectAll(".phaseSticks")
  .data(phases)
  .enter().append("svg:line")
    .attr("stroke",  "orange")
    .style("stroke-width", 2)
    .attr("x1", function(d, i) { return xRangePhase(i); })
    .attr("y1", function(d, i) { return yRangePhase(0); })
    .attr("x2", function(d, i) { return xRangePhase(i); })
    .attr("y2", function(d, i) { return yRangePhase(d); })
    .style("opacity", 0.5)
    //.style("stroke-dasharray", ("5, 1"))
    .attr('transform', 'translate(' + 360 + ',0)')
    ;

var phasePoints = vis.selectAll(".phasePoints")
  .data(phases)
  .enter().append("svg:rect")
    .attr("stroke",  "orange")
    .style("stroke-width", 1)
    .attr("fill",  "orange")
    .attr("x", function(d, i) { return xRangePhase(i) - 2; })
    .attr("y", function(d, i) { return yRangePhase(d) - 2})
    .attr("width", 4)
    .attr("height", 4.5)
    .attr('transform', 'translate(' + 360 + ',0)')
    ;

//////////////////////////////////////////////////////////////////////////////






var cosConnector = vis.append("line");
var sinConnector = vis.append("line");

function isEpsilon(number){
  return Math.abs(number) < 1e-10;
}


function doMultiply()
{
  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPathSin2.attr("d", corrSigSin2(corrSigData));
  corrSigPath3.attr("d", corrSig3(corrSigData));
  corrSigPathSin3.attr("d", corrSigSin3(corrSigData));

dpAreaPath
  .datum(corrSigData)
  .attr("d", dpArea);

  samples1
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })

  samplesSin1
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })

  samples3
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); });

  samplesSin3
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)); });

  for (bin = 0; bin < 8; bin++)
  {
    var cosSum = 0;
    var sinSum = 0;

    for (j = 0; j < corrSigSampleData.length; j++)
    {
      var d = corrSigSampleData[j];
      var cosVal = sigFx(d) * Math.cos(bin * d);
      var sinVal = sigFx(d) * -Math.sin(bin * d);
      var cosBasisVal = Math.cos(bin * d);
      var sinBasisVal = -Math.sin(bin * d);
      var sigVal = sigFx(d);
      var sigValString = sigVal.toFixed(3);
      var cosBasisValString = cosBasisVal.toFixed(3);
      var sinBasisValString = sinBasisVal.toFixed(3);
      var cosValString = cosVal.toFixed(3);
      var sinValString = sinVal.toFixed(3);
      cosSum += cosVal;
      sinSum += sinVal;

      var additionalOffset = 30;
      var cosTextsX = plotWidth / 2 + 30 + xOffset + additionalOffset;
      var sinTextsX = plotWidth / 2 + 220 + 30 + xOffset + additionalOffset;
      var sigTextsRealX = plotWidth / 2 - 50 + xOffset + additionalOffset;
      var cosTextsRealX = plotWidth / 2 - 6 + xOffset + additionalOffset;
      var sigTextsImagX = plotWidth / 2 + 220 - 50 + xOffset + additionalOffset;
      var sinTextsImagX = plotWidth / 2 + 220 - 6 + xOffset + additionalOffset;
      var textOffsetY = 220;
    }

    if (isEpsilon(cosSum))
    {
      cosSum = 0;
    }

    if (isEpsilon(sinSum))
    {
      sinSum = 0;
    }

    var sign = sinSum >= 0
      ? "+"
      : "";

    complexPairTexts[bin]
      .text(cosSum.toFixed(3) + " " + sign + sinSum.toFixed(3) + "i")
      .style("opacity", 1.0);

    complexRealVectors[bin]
      .attr("x2", complexRangesX[bin](cosSum))
      .style("opacity", 1.0);

    complexImagVectors[bin]
      .attr("x1", complexRangesX[bin](cosSum))
      .attr("x2", complexRangesX[bin](cosSum))
      .attr("y2", complexRangeY(sinSum))
      .style("opacity", 1.0);

    complexVectors[bin]
      .attr("x2", complexRangesX[bin](cosSum))
      .attr("y2", complexRangeY(sinSum))
      .style("opacity", 1.0);

    complexCircles[bin]
      .attr("r", complexRangesX[bin](Math.sqrt(cosSum * cosSum + sinSum * sinSum)) - complexRangesX[bin](0))

    magnitudes[bin] = Math.sqrt((cosSum * cosSum) + (sinSum * sinSum));
    phases[bin] = Math.atan2(sinSum, cosSum);
  }

  sticks
    .data(magnitudes)
      .attr("x1", function(d, i) { return xRangeFreq(i); })
      .attr("y1", function(d, i) { return yRangeFreq(0); })
      .attr("x2", function(d, i) { return xRangeFreq(i); })
      .attr("y2", function(d, i) { return yRangeFreq(d); })
      ;

  points
    .data(magnitudes)
      .attr("x", function(d, i) { return xRangeFreq(i) - 2; })
      .attr("y", function(d, i) { return yRangeFreq(d) - 2})
      ;

  phaseSticks
  .data(phases)
    .attr("x1", function(d, i) { return xRangePhase(i); })
    .attr("y1", function(d, i) { return yRangePhase(0); })
    .attr("x2", function(d, i) { return xRangePhase(i); })
    .attr("y2", function(d, i) { return yRangePhase(d); })
    ;

  phasePoints
  .data(phases)
    .attr("x", function(d, i) { return xRangePhase(i) - 2; })
    .attr("y", function(d, i) { return yRangePhase(d) - 2})
    ;

}

function update()
{  
  document.getElementById("phaseShift").innerHTML = "Phase Shift: &nbsp; <b>" + (PHASE * 180 / Math.PI).toFixed(2) + "°</b>";

  updateSignals();
  doMultiply();
}

d3.timer(update, 100);

}) ();
