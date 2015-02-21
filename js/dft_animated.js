var DFT_ANIMATED = (function() {

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

var vis = d3.select('#dftAnimated');

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

var binNumber = -1;

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
  .attr("fill", color3)
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.0);

var corrSigPathSin3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", color3)
  .attr("fill", color3)
  .attr("fill-opacity", 0.20)
  .attr("opacity", 0.0);

var sigFxs = [];
var currentSigFx = 0;
sigFxs.push(
  (function(d) { return Math.sin(d); })
);
sigFxs.push(
  (function(d) { return Math.sin(d) + (0.4 * Math.sin(d * 3)); })
);
sigFxs.push(
  (function(d) { return Math.sin(d) + (0.4 * Math.sin(d * 2)) + (0.25 * Math.sin(d * 3)); })
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

function restart()
{
  binNumber = -1;
  for (i = 0; i < 8; i++)
  {
    complexPairTexts[i].style("opacity", 0.0);
    complexCircles[i].style("opacity", 0.0);
    complexRealVectors[i].style("opacity", 0.0);
    complexImagVectors[i].style("opacity", 0.0);
    complexVectors[i].style("opacity", 0.0);
  }
  switchBin();
}

var speedButton = d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 410)
  .style("height", 25)
  .text("Normal Speed")
  .on("click", changeSpeed);

var signalButton = d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .text("Change Input Signal")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 270)
  .style("height", 25)
  .on("click", changeSignal);

var playButton = d3.select('#animatedDftWrapper').insert("button", ":first-child")
  .text("▶ Play")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 200)
  .style("height", 25)
  .on("click", handlePlay);


var playbackSpeedFactor = 0.01;
var playbackSpeeds = ["Slow", "Normal", "Turbo"];
var playbackSpeedFactors = [1.5, 0.5, 0.1];
var currentPlaybackSpeedIndex = 0;

function changeSpeed()
{
  currentPlaybackSpeedIndex++;
  if (currentPlaybackSpeedIndex == 3)
  {
    currentPlaybackSpeedIndex = 0;
  }
  playbackSpeedFactor = playbackSpeedFactors[currentPlaybackSpeedIndex];
  speedButton.text(playbackSpeeds[currentPlaybackSpeedIndex] + " Speed");
}

changeSpeed();

var isPlaying = false;

function changeSignal()
{
  if (isPlaying) { return; }
  currentSigFx++;
  if (currentSigFx >= sigFxs.length)
  {
    currentSigFx = 0;
  }
  sigFx = sigFxs[currentSigFx];
  updateSignals();
}

function updateButtons()
{
  var className = isPlaying ? "disabled" : "active";
  signalButton.attr("class", className);
  playButton.attr("class", className); 
}

function handlePlay()
{
  restart();
}

var corrSigData = d3.range(0, 2 * Math.PI + 0.05, 0.05);

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
    .style('opacity', 0.0)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.cos(d)); })
    .attr("r", function(d, i) { return 1.5 });

var samplesSin3 = vis.selectAll(".pointSin3")
  .data(corrSigSampleData)
  .enter().append("svg:circle")
    .attr("stroke", color3)
    .style("stroke-width", 1.5)
    .style('opacity', 0.0)
    .attr("fill", color3)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.sin(d)); })
    .attr("r", function(d, i) { return 1.5 });

// Complex Parts

var complexLabels = [];
var complexPairTexts = [];
var complexRealVectors = [];
var complexImagVectors = [];
var complexCircles = [];
var complexVectors = [];
var complexPartsY = 380;
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

  // vis.append('svg:circle')
  //   .attr('cx', complexRangesX[i](0))
  //   .attr('cy', complexRangeY(0))
  //   .attr('r', complexRangesX[i](1) - complexRangesX[i](0))
  //   .attr('stroke-width', 1.5)
  //   .attr('stroke', 'black')
  //   .attr('fill', 'none')
  //   .attr('opacity', 0.25);

  complexCircles.push(vis.append('svg:circle')
    .attr('cx', complexRangesX[i](0))
    .attr('cy', complexRangeY(0))
    .attr('r', complexRangesX[i](4) - complexRangesX[i](0))
    .attr('stroke-width', 1.5)
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr('opacity', 0.0)
  );

  complexLabels.push(vis.append('text')
    .attr("text-anchor", "middle")
    .attr("x", midpoints[i])
    .attr("y", complexPartsY - 10)
    .text("DFT[" + i + "]")
    .style("fill", "black")
    .style("opacity", 0.25)
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
      .attr("stroke-width", 1.5)
      .attr("stroke", "steelblue")
      .style("stroke-linecap", "round")
      .style("opacity", 0.0)
    );
}

var currentBinIndicator = vis.append("svg:rect")
  .attr("x", complexRangesX[0](-4) - 4.5)
  .attr("y", complexPartsY - 25)
  .attr("width", complexPartSize )
  .attr("height", complexPartSize + 45)
  .style("stroke", "none")
  .style("stroke-width", 2)
  .style("fill", "grey")
  .attr("rx", 5)
  .attr("ry", 5)
  .style("opacity", 0.1);


var cosConnector = vis.append("line");
var sinConnector = vis.append("line");

var cosTexts = [];
var sinTexts = [];

var sigRealTexts = [];
var sigImagTexts = [];

var cosRealTexts = [];
var sinImagTexts = [];

var finishCount = 0;

function moveToNextBin()
{
  //nCompletedLastStep++;

  if (true)//nCompletedLastStep == 2)
  {
    n = 0;

    while(cosTexts.length > 0) {
      cosTexts.pop().remove();
    }

    while(sigRealTexts.length >0)
    {
      sigRealTexts.pop().remove(); 
    }

    while(sigImagTexts.length >0)
    {
      sigImagTexts.pop().remove(); 
    }

    while(cosRealTexts.length >0)
    {
      cosRealTexts.pop().remove(); 
    }

    while(sinImagTexts.length >0)
    {
      sinImagTexts.pop().remove(); 
    }

    while(sinTexts.length > 0) {
      sinTexts.pop().remove();
    }

    switchBin();
  }
}

var n = 0;
var nCompletedStep1 = 0;
var nCompletedStep2 = 0;
var nCompletedStep3 = 0;
var nCompletedStep4 = 0;
var nCompletedStepShowCorrPaths = 0;
var nCompletedLastStep = 0;

function showPair()
{
  complexPairTexts[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", moveToNextBin);

  complexCircles[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 0.4);
}

function showImagComponentVector()
{
  complexImagVectors[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", showPair);
}

function showImagSum()
{
  sinTexts[sinTexts.length - 1]
    .transition()
    .duration(1000 * playbackSpeedFactor)
    .style("opacity", 1.0)
    .each("end", showImagComponentVector);
}

function showRealComponentVector()
{
  complexRealVectors[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", showImagSum);
}


function showRealSum()
{
  nCompletedStepShowCorrPaths++;

  if (nCompletedStepShowCorrPaths == 2)
  {
    cosTexts[cosTexts.length - 1]
      .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", showRealComponentVector);
  }

}

function showCorrPaths()
{
  nCompletedStepShowCorrPaths = 0;

  corrSigPath3
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .ease("cubic-out")
      .style("opacity", 0.4)
      .each("end", showRealSum);

  corrSigPathSin3
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .ease("cubic-out")
      .style("opacity", 0.4)
      .each("end", showRealSum);
}

function doMultiplyStep5()
{
  nCompletedStep4++;

  if (nCompletedStep4 == 2)
  {
    n++;
    doMultiplyStep();
  }
}


function doMultiplyStep4()
{
  nCompletedStep3++;
  nCompletedStep4 = 0;

  if (nCompletedStep3 == 2)
  {
    cosConnector
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 0.0)
        .each("end", doMultiplyStep5);

    sinConnector
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 0.0)
        .each("end", doMultiplyStep5);
  }
}


function doMultiplyStep3()
{
  nCompletedStep2++;
  nCompletedStep3 = 0;

  if (nCompletedStep2 == 2)
  {
    cosTexts[n]
      .transition()
        .duration(200 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep4);

    sinTexts[n]
      .transition()
        .duration(200 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep4);
  }
}

function doMultiplyStep2()
{
  nCompletedStep1++;
  nCompletedStep2 = 0;

  if (nCompletedStep1 == 2)
  {
    samples3.filter(function(d, i) {return i == n;})
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep3);

    samplesSin3.filter(function(d, i) {return i == n;})
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep3);
  }
}

function doMultiplyStep()
{
  if (n == 8)
  {
    showCorrPaths();
    return;
  }

  var d = corrSigSampleData[n];
  nCompletedStep1 = 0;

  cosConnector
    .attr("x1", xRangeCorr(d))
    .attr("y1", yRangeCorr(sigFx(d)))
    .attr("x2", xRangeCorr(d))
    .attr("y2", yRangeCorr(sigFx(d)))
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.5)
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .style("opacity", 0.5)
      .attr("y2", yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)))
      .each("end", doMultiplyStep2)
    ;

  sinConnector
    .attr("x1", xRangeCorr(d) + xAxisOffsetRight)
    .attr("y1", yRangeCorr(sigFx(d)))
    .attr("x2", xRangeCorr(d) + xAxisOffsetRight)
    .attr("y2", yRangeCorr(sigFx(d)))
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.5)
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .style("opacity", 0.5)
      .attr("y2", yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)))
      .each("end", doMultiplyStep2)
    ;

    sigRealTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    cosRealTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    sigImagTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    sinImagTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);
}


function doMultiply()
{
  var cosSum = 0;
  var sinSum = 0;
  n = 0;

  for (i = 0; i < corrSigSampleData.length; i++)
  {
    var d = corrSigSampleData[i];
    var cosVal = sigFx(d) * Math.cos(binNumber * d);
    var sinVal = sigFx(d) * -Math.sin(binNumber * d);
    var cosBasisVal = Math.cos(binNumber * d);
    var sinBasisVal = -Math.sin(binNumber * d);
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
    var sinTextsX = plotWidth / 2 + xAxisOffsetRight + 30 + xOffset + additionalOffset;
    var sigTextsRealX = plotWidth / 2 - 50 + xOffset + additionalOffset;
    var cosTextsRealX = plotWidth / 2 - 6 + xOffset + additionalOffset;
    var sigTextsImagX = plotWidth / 2 + xAxisOffsetRight - 50 + xOffset + additionalOffset;
    var sinTextsImagX = plotWidth / 2 + xAxisOffsetRight - 6 + xOffset + additionalOffset;
    var textOffsetY = 230;

    cosTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", cosTextsX)
      .attr("y", textOffsetY + (i * 13))
      .text(cosValString)
      .style("fill", color3)
      .style("opacity", 0.0)
      .style("font-size", "12px")
      );

    sinTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", sinTextsX)
      .attr("y", textOffsetY + (i * 13))
      .text(sinValString)
      .style("fill", color3)
      .style("font-size", "12px")
      .style("opacity", 0.0))
    ;

    sigRealTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", sigTextsRealX)
      .attr("y", textOffsetY + (i * 13))
      .text(sigValString + " x")
      .style("fill", color1)
      .style("opacity", 0.0)
      .style("font-size", "12px")
      );

    sigImagTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", sigTextsImagX)
      .attr("y", textOffsetY + (i * 13))
      .text(sigValString + " x ")
      .style("fill", color1)
      .style("opacity", 0.0)
      .style("font-size", "12px")
      );

    cosRealTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", cosTextsRealX)
      .attr("y", textOffsetY + (i * 13))
      .text(cosBasisValString + " = ")
      .style("fill", colorCos)
      .style("opacity", 0.0)
      .style("font-size", "12px")
      );

    sinImagTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", sinTextsImagX)
      .attr("y", textOffsetY + (i * 13))
      .text(sinBasisValString + " = ")
      .style("fill", colorSin)
      .style("opacity", 0.0)
      .style("font-size", "12px")
      );

    var sign = sinSum >= 0
      ? "+"
      : "";

    complexPairTexts[binNumber]
      .text(cosSum.toFixed(3) + " " + sign + sinSum.toFixed(3) + "i")
      .style("opacity", 0.0);

    complexCircles[binNumber]
      .attr("r", complexRangesX[0](Math.sqrt(cosSum * cosSum + sinSum * sinSum)) - complexRangesX[0](0))

    complexRealVectors[binNumber]
      .attr("x2", complexRangesX[binNumber](cosSum))
      .style("opacity", 0.0);

    complexImagVectors[binNumber]
      .attr("y2", complexRangeY(sinSum))
      .style("opacity", 0.0);
  }

  cosTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", plotWidth / 2 + 160)
      .attr("y", textOffsetY + (cosTexts.length * 13 + 5))
      .text("Dot Product: " + cosSum.toFixed(3))
      .style("font-size", "12px")
      .style("opacity", 0.0))
  ;

  sinTexts.push(vis.append('text')
      .attr("text-anchor", "end")
      .attr("x", plotWidth / 2 + xAxisOffsetRight + 160)
      .attr("y", textOffsetY + (sinTexts.length * 13 + 5))
      .text("Dot Product: " + sinSum.toFixed(3))
      .style("font-size", "12px")
      .style("opacity", 0.0))
  ;

  samples3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); })
    .style("opacity", 0.0)
    ;

  samplesSin3.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)); })
    .style("opacity", 0.0)
    ;

   corrSigPath3
    .attr("d", corrSig3(corrSigData))
    .style("opacity", 0.0)
  ;

   corrSigPathSin3
    .attr("d", corrSigSin3(corrSigData))
    .style("opacity", 0.0)
  ;

  doMultiplyStep();
}


var transitionNumber = 0;
function transitionToNextBin()
{
  transitionNumber++;
  binNumber += 0.10;

  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPathSin2.attr("d", corrSigSin2(corrSigData));

  samples2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(binNumber * d)); });

  samplesSin2.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(binNumber * d)); });

  if (transitionNumber == 10)
  {
    binNumber = Math.round(binNumber);
    transitionNumber = 0;
    doMultiply();
    return true;
  }
}


function switchBin()
{
  isPlaying = true;
  updateButtons();

  corrSigPath3
    .transition()
    .style("opacity", 0.0);

  corrSigPathSin3
    .transition()
    .style("opacity", 0.0);

  samples3.data(corrSigSampleData)
    .attr("opacity", 0.0);

  samplesSin3.data(corrSigSampleData)
    .attr("opacity", 0.0);

  if (binNumber === 7)
  {
    isPlaying = false;
    updateButtons();
    return;
  }

  complexLabels[binNumber + 1]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 0.50);

  currentBinIndicator
    .transition()
    .duration(1000 * playbackSpeedFactor)
      .attr("x", complexRangesX[binNumber + 1](-4) - 4.5);

  d3.timer(transitionToNextBin, 30);
};

//switchBin();

}) ();