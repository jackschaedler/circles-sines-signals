var SPECTRUM = (function() {

var canvasWidth = 700;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#spectrum');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var currentFrequency = 440;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([220 - 80, 20]);

xRange.domain([20, 22050]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
  .tickValues([440, 440 * 4, 440 * 8, 440 * 16, 440 * 32])
  //.ticks()
  .tickFormat(d3.format(",.0f"))
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

// vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", 5)
//   .attr("y", yRange(1.2))
//   .style("font-size", "12px")
//   .text("Frequency Content");


for (var i = 1; i < 40; i++)
{
  var harmFreq = (i + 1) * 440;

  vis.append("svg:line")
    .attr("x1", xRange(harmFreq))
    .attr("y1", yRange(0))
    .attr("x2", xRange(harmFreq))
    .attr("y2", yRange(0) + 15)
    .attr("stroke-width", 1)
    .attr("stroke", "grey")
    .style("opacity", 0.8)
    .style("stroke-dasharray", ("5, 1"))
    ;

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xRange(harmFreq) - 1)
    .attr("y", yRange(0) + 25)
    .style("font-size", "10px")
    .text(i+1);
}

  vis.append("text")
    .attr("text-anchor", "begin")
    .attr("x", xRange(harmFreq) + 35)
    .attr("y", yRange(0) + 12)
    .attr("stroke", "none")
    .style("font-size", "10px")
    .text("Frequency (Hz)");

  vis.append("text")
    .attr("text-anchor", "begin")
    .attr("x", xRange(harmFreq) + 35)
    .attr("y", yRange(0) + 25)
    .attr("stroke", "none")
    .style("font-size", "10px")
    .text("Harmonic Number");

var data = [];

function indexToFrequency(i)
{
  return (22050 / (FFT_SIZE / 2)) * i;
}

var curve = d3.svg.line()
  .x(function (d, i) { return xRange(indexToFrequency(i)) })
  .y(function (d, i) {
    if (i == 0) return yRange(0);
    if (i == (FFT_SIZE / 2) - 1) return yRange(0);
    return yRange(d / 170);
    } 
  );

var pathColor = "steelblue";

var path = vis.append('svg:path')
  .attr("stroke-width", 1.0)
  .attr("stroke", "#333")
  .attr("fill", "#333")
  .attr("opacity", 0.8)
  .attr("d", curve(data));


function updateFrequency(freq) {
  currentFrequency = Math.min(freq, 22050);
}

function update()
{
  if (NEW_DATA_AVAILABLE)
  {
    NEW_DATA_AVAILABLE = false;
    data = ANALYSER_DATA;
  }

  if (pathColor != COLOR)
  {
    pathColor = COLOR;
    path
      .transition()
      .duration(500)
      .attr("stroke", pathColor)
      .attr("fill", pathColor);
  }

  path
    .attr("d", curve(data));

}

d3.timer(update, 50);


}) ();
