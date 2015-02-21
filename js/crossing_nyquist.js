var ALIAS_FREQUENCY = (function() {

var canvasWidth = 700;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#aliasFrequency');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRangeTime = d3.scale.linear().range([0, plotWidth]);
xRangeTime.domain([0, 2 * Math.PI]);

var yRangeTime = d3.scale.linear().range([120, 40]);
yRangeTime.domain([-1, 1]);

var xAxisTime = d3.svg.axis()
  .scale(xRangeTime)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var isPlaying = false;
function handlePlay()
{
  isPlaying = true;
  updateButtons();
}

function updateButtons()
{
  var className = isPlaying ? "disabled" : "active";
  playButton.attr("class", className); 
}

var playButton = d3.select('#animatedWrapper').insert("button", ":first-child")
  .text("▶ Play")
  .style("position", "absolute")
  .style("top", -70)
  .style("left", canvasWidth / 2 - 25)
  .style("height", 25)
  .on("click", handlePlay);

var isPlaying = false;



vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime);

var currentFrequency = 0;

var signal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) { return yRangeTime(Math.sin(d * currentFrequency)); });

var aliasSignal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) {
     var Mod = currentFrequency % 12;
     var AliasFrequency = currentFrequency > 12 ? 12 - Mod : currentFrequency;
     if (currentFrequency > 12) { AliasFrequency *= -1;}
     return yRangeTime(Math.sin(d * AliasFrequency)); });

var sigData = d3.range(0, 2 * Math.PI, 0.01);

var signalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.35);

var aliasSignalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "grey")
  .attr("fill", "none")
  .attr("opacity", 0.0);

signalPath.attr("d", signal(sigData));
aliasSignalPath.attr("d", aliasSignal(sigData));

var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 24);

var samples = vis.selectAll(".point1")
  .data(sampleData)
  .enter().append("svg:circle")
    .attr("stroke", "steelblue")
    .style("stroke-width", 1.5)
    .attr("fill", "steelblue")
    .attr("cx", function(d, i) { return xRangeTime(d); })
    .attr("cy", function(d, i) { return yRangeTime(Math.sin(d * currentFrequency)); })
    .attr("r", function(d, i) { return 1.5 });

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([400 - 80, 280 - 80]);

xRange.domain([0, 24]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
  //.tickValues([-23, -17, -11, 7, 13, 19, 25, 1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5, -6])
  .ticks(20)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .tickValues([1])
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRange(0) + ')')
  .style("opacity", 0.65)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + 0 + ',0)')
  .style("opacity", 0.65)
  .call(yAxis);

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", yRange(-0.25))
  .style("font-size", "10px")
  .text("Frequency (Hz)");


vis.append("svg:line")
  .attr("x1", function(d, i) { return xRange(12); })
  .attr("y1", function(d, i) { return yRange(-0.25);} )
  .attr("x2", function(d, i) { return xRange(12); })
  .attr("y2", function(d, i) { return yRange(1.25); })
  .attr("stroke-width", 1)
  .attr("stroke", "grey")
  .style("opacity", 0.7)
  //.style("stroke-dasharray", ("5, 1"))
  ;

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRange(12))
  .attr("y", yRange(-0.35))
  .style("font-size", "10px")
  .text("Nyquist Frequency");


vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRangeTime(1.4))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Time Domain");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.2))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Frequency Domain");

var freqLine = vis.append("line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1.0); })
  .attr("stroke-width", 2)
  .attr("stroke", "steelblue")
  .style("opacity", 0.70)
  ;

var freqSample = vis.append("svg:rect")
  .attr("stroke", "steelblue")
  .style("stroke-width", 1)
  .attr("fill", "steelblue")
  .attr("x", xRange(currentFrequency) - 2)
  .attr("y", yRange(1.0) + 0.5)
  .attr("width", 4)
  .attr("height", 4)
  ;


var freqLineAlias = vis.append("line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1.0); })
  .attr("stroke-width", 2)
  .attr("stroke", "grey")
  .style("opacity", 0.00)
  ;

var freqSampleAlias = vis.append("svg:rect")
  .attr("stroke", "grey")
  .style("stroke-width", 1)
  .attr("fill", "grey")
  .attr("x", xRange(currentFrequency) - 2)
  .attr("y", yRange(1.0) + 0.5)
  .attr("width", 4)
  .attr("height", 4)
  .style("opacity", 0.00)
  ;

var Crossed = false;

function tick()
{
  if (!isPlaying)
  {
    return;
  }

  currentFrequency += 0.025;

  if (currentFrequency >= 24)
  {
    isPlaying = false;
    currentFrequency = 0;
    aliasSignalPath.style("opacity", 0.0);
    freqLineAlias.style("opacity", 0.0);
    freqSampleAlias.style("opacity", 0.0);
    Crossed = false;
    updateButtons();
    return;
  }

  if (currentFrequency > 12 && Crossed == false)
  {
    Crossed = true;
    aliasSignalPath
      .transition()
      .duration(200)
      .style("opacity", 0.5)

    freqLineAlias
      .transition()
      .duration(200)
      .style("opacity", 0.9)

    freqSampleAlias
      .transition()
      .duration(200)
      .style("opacity", 0.9)
  }

  samples.data(sampleData)
    .attr("cx", function(d, i) { return xRangeTime(d); })
    .attr("cy", function(d, i) { return yRangeTime(Math.sin(d * currentFrequency)); });

  signalPath.attr("d", signal(sigData));
  aliasSignalPath.attr("d", aliasSignal(sigData));

  freqLine
    .attr("x1", function(d, i) { return xRange(currentFrequency); })
    .attr("x2", function(d, i) { return xRange(currentFrequency); })
    ;

  freqSample
    .attr("x", xRange(currentFrequency) - 2)

  var Mod = currentFrequency % 12;
  var AliasFrequency = currentFrequency > 12 ? 12 - Mod : currentFrequency;

  freqLineAlias
    .attr("x1", function(d, i) { return xRange(AliasFrequency); })
    .attr("x2", function(d, i) { return xRange(AliasFrequency); })
    ;

  freqSampleAlias
    .attr("x", xRange(AliasFrequency) - 2)
}

d3.timer(tick, 100);

}) ();
