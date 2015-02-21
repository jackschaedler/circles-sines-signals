var WAGON_WHEEL = (function() {

var canvasWidth = 150;
var canvasHeight = 150;
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
var xRangeSnapshot = d3.scale.linear().range([plotWidth + 15, plotWidth + plotWidth + 15]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([-1.25, 1.25]);
xRangeSnapshot.domain([-1.25, 1.25]);
yRange.domain([-1.25, 1.25]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisSnapshot = d3.svg.axis()
  .scale(xRangeSnapshot)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var yAxisSnapshot = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#wagonWheel');

var phaseArc = d3.svg.arc()
  .innerRadius(50)
  .outerRadius(60)
  .startAngle(0)
  .endAngle((2 * Math.PI) * (1 - RATE_FACTOR));

var arcPath = vis.append("path")
  .attr("d", phaseArc)
  .attr("fill", 'grey')
  .attr("opacity", 0.20)
  .attr("transform", "translate(" + plotWidth / 2 + "," + (plotHeight / 2) + ")");

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + plotWidth / 2 + ',0)')
  .style('opacity', 0.25)
  .call(yAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.25)
  .call(xAxisSnapshot);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (plotWidth + 15 + (plotWidth / 2)) + ',0)')
  .style('opacity', 0.25)
  .call(yAxisSnapshot);

var snapshotText = vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", (plotWidth + 20 + (plotWidth / 2)))
  .attr("y", 10)
  .text("snapshot");

var vector = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "steelblue")
  .style("stroke-linecap", "round")
  .style('opacity', 1.0);

var snapshotVectorFade = vis.append("line")
  .attr("x1", xRange(0) + 0.5)
  .attr("y1", yRange(0) + 0.5)
  .attr("x2", xRange(1))
  .attr("y2", yRange(0))
  .attr("stroke-width", 3.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round")
  .style('opacity', 0.0);

var snapshotVector = vis.append("line")
  .attr("x1", xRangeSnapshot(0))
  .attr("y1", yRange(0))
  .attr("x2", xRangeSnapshot(0))
  .attr("y2", yRange(1))
  .attr("stroke-width", 3.0)
  .attr("stroke", "steelblue")
  .style("stroke-linecap", "round")
  .style('opacity', 1.0);

var circle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', xRange(1) - xRange(0))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('opacity', 0.5);

var phase = -Math.PI / 2;

var samplingRate = (2 * Math.PI) * (1 - RATE_FACTOR);
var samplePoints = [];
var sampleNumbers = [];
var samplePhase = [];

function setupSamples() {
  var targetPhase = 0;

  for (i = 0; i < samplePoints.length; i++)
  {
    samplePoints[i].remove();
    sampleNumbers[i].remove();
  }

  samplePoints = [];
  sampleNumbers = [];
  samplePhase = [];

  for (i = 0; i < 8 + RATE_FACTOR * 12; i++)
  {
    var cos = Math.cos(targetPhase - (Math.PI / 2));
    var sin = -Math.sin(targetPhase - (Math.PI / 2));

    var x = xRange(cos);
    var y = yRange(sin);

    var textOffsetX = -7;
    var textOffsetY = -sin * 4;
    var textAnchor = "end";
    if (cos > 0)
    {
      textAnchor = "begin";
      textOffsetX = 7;
    }
    if (sin < 0)
    {
      textOffsetY += -sin * 6
    }

    samplePoints.push(
      vis.append('svg:circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 2)
        .attr('stroke-width', 1.5)
        .attr('stroke', 'steelblue')
        .attr('fill', 'steelblue')
        .attr('opacity', 0.0)
    );
    sampleNumbers.push(
      vis.append('text')
        .attr("text-anchor", textAnchor)
        .attr("x", x + textOffsetX)
        .attr("y", y + textOffsetY)
        .attr('stroke', "lightgrey")
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.0)
        .text(i+1)
      );

    samplePhase.push(targetPhase);

    targetPhase += samplingRate;
  }
};

setupSamples();


var xComponent = xRange(Math.cos(phase));
var yComponent = yRange(-Math.sin(phase));

var travelledPhase = 0;
var currentSampleIndex = 0;

var currentRotationPhase = 0;
var sampling = true;

function setRateFactor()
{
  samplingRate = (2 * Math.PI) * (1 - RATE_FACTOR);
  setupSamples();
  phase = -Math.PI / 2;
  travelledPhase = 0;
  currentSampleIndex = 0;
  currentRotationPhase = 0;
  sampling = true;
}

function draw()
{
  if (SETTING_RATE)
  {
    setRateFactor();

    phaseArc
      .startAngle(0)
      .endAngle((2 * Math.PI) * (1 - RATE_FACTOR));

    arcPath
      .attr('d', phaseArc);

    arcPath
      .transition()
      .attr('opacity', 0.2);

    return;
  }

  if (NEW_RATE_AVAILABLE)
  {
    setRateFactor();
    NEW_RATE_AVAILABLE = false;
    return;
  }


  xComponent = xRange(Math.cos(phase));
  yComponent = yRange(-Math.sin(phase));

  vector
    .attr('x2', xComponent)
    .attr('y2', yComponent);

  if (travelledPhase > samplePhase[currentSampleIndex])
  {
    if (currentSampleIndex >= 1)
    {
      //samplePoints[currentSampleIndex - 1].transition().attr('opacity', 0.0);
      sampleNumbers[currentSampleIndex - 1].transition().duration(1000).attr('opacity', 0.0);
    }

    samplePoints[currentSampleIndex].attr('opacity', 1.0);
    sampleNumbers[currentSampleIndex].attr('opacity', 1.0);
    snapshotVector
      .attr('x2', xRangeSnapshot(Math.cos(samplePhase[currentSampleIndex] - Math.PI/2)))
      .attr('y2', yComponent);
    snapshotVectorFade
      .attr('x2', xRange(Math.cos(samplePhase[currentSampleIndex] - Math.PI/2)))
      .attr('y2', yComponent);
    snapshotVectorFade.style('opacity', 1.0);
    snapshotVectorFade
      .transition()
      .duration(500)
      .style('opacity', 0.0);
    snapshotText.text("Snapshot #" + (currentSampleIndex + 1));

    phaseArc
      .startAngle(samplePhase[currentSampleIndex])
      .endAngle(samplePhase[currentSampleIndex] + samplingRate);

    arcPath
      .attr('d', phaseArc);

    currentSampleIndex++;
  }

  if (currentSampleIndex == samplePhase.length)
  {
    sampling = false;
    arcPath
      .transition()
      .duration(100)
      .attr('opacity', 0.0);

    for (i = 1; i < samplePhase.length; i++)
    {
      samplePoints[i].attr('opacity', 0.0);
      sampleNumbers[i].attr('opacity', 0.0);
    }
  }

  phase += Math.PI / 40;
  travelledPhase += Math.PI / 40;
  currentRotationPhase += Math.PI/40;


  if (currentRotationPhase > 2 * Math.PI && !sampling)
  {
    travelledPhase = 0;
    currentSampleIndex = 0;
    phase = -Math.PI / 2;

    sampling = true;
    arcPath
      .transition()
      .attr('opacity', 0.20);

    samplePoints[0].attr('opacity', 1.0);
    sampleNumbers[0].attr('opacity', 0.0);
  }

  if (currentRotationPhase > 2 * Math.PI)
  {
    currentRotationPhase = currentRotationPhase - 2 * Math.PI;
  }
}

d3.timer(draw, 100);
}) ();
