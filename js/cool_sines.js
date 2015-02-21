var VECTOR_2 = (function() {

var canvasWidth = 600;
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
var yRange = d3.scale.linear().range([plotHeight - 40, MARGINS.top + 40]);

var xRangeSignal = d3.scale.linear().range([MARGINS.left, plotWidth]);
xRangeSignal.domain([0, 2 * Math.PI]);

xRange.domain([0, 7]);
yRange.domain([-2.0, 2.0]);


var xRangeSpectrum = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRangeSpectrum = d3.scale.linear().range([plotHeight - 40 + 250, MARGINS.top + 40 + 250]);

xRangeSpectrum.domain([0, 7]);
yRangeSpectrum.domain([0, 2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0, 0)
  .ticks(8);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0, 0)
  .tickValues([-2, -1, 1, 2])
  .orient('left');

var xAxisSpectrum = d3.svg.axis()
  .scale(xRangeSpectrum)
  .tickSize(0, 0)
  .ticks(8);

var yAxisSpectrum = d3.svg.axis()
  .scale(yRangeSpectrum)
  .tickSize(0, 0)
  .tickValues([1, 2])
  .orient('left');


var line = d3.svg.line()
  .x(function(d, i) {return xRange(i);})
  .y(function(d, i) {return yRange(d);})
  .interpolate('cardinal');

var basesLines = [];

var signalAmp = 1;
function createfunc(bin) {
    return function(d, i) {return yRange(Math.sin(d * bin) * signalAmp); };
}

for (var j = 0; j < 8; j++)
{
  basesLines[j] = d3.svg.line()
    .x(function (d, i) { return xRangeSignal(d); })
    .y(createfunc(j))
    ;
}


var vis = d3.select('#signalWithSineBases');




var colors = d3.scale.category10();
var samples = [];
for (var i = 0; i < 8; i++)
{
  samples[i] = 1.5 * Math.sin((i / 7) * (2 * Math.PI))
             + 0.75 * Math.sin(3 * (i / 7) * (2 * Math.PI))
             + 0.45 * Math.sin(5 * (i / 7) * (2 * Math.PI));
}

var incomingSignalPath = d3.svg.line()
  .x(function (d, i) { return xRangeSignal(d); })
  .y(function (d, i) {
    var val = 1.5 * Math.sin(d)
            + 0.75 * Math.sin(3 * d)
            + 0.45 * Math.sin(5 * d)
    return yRange(val);
  })
  ;

var bases = [];
var basesVectors = [];
var spectrumVectors = [];

for (var i = 0; i < 8; i++)
{
  spectrumVectors.push(vis.append("line")
    .attr("x1", xRangeSpectrum(i) + 1)
    .attr("y1", yRangeSpectrum(0))
    .attr("x2", xRangeSpectrum(i) + 1)
    .attr("y2", yRangeSpectrum(1))
    .attr("stroke-width", 2)
    .attr("stroke", colors(i))
    .attr("opacity", 0.75)
    .attr("marker-end", "url(#arrowhead" + colors(i) + ")")
  );
}

spectrumVectors[0].attr("opacity", 0.0);

var opacityRange = d3.scale.linear().range([0.1, 0.8]);
opacityRange.domain([8, 0]);

for (var i = 0; i < 8; i++)
{
   bases[i] = vis.append('svg:path')
    .attr('d', basesLines[i](d3.range(0, 2 * Math.PI, 0.05)))
    .attr('stroke', colors(i))
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .style('opacity', opacityRange(i));


  vis.append("defs").append("marker")
    .attr("id", "arrowhead" + colors(i))
    .attr("refX", 4)
    .attr("refY", 2)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
    .attr("fill", colors(i))
    .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z");

  for (var j = 0; j < 8; j++)
  {
    basesVectors[(i * 8) + j] = vis.append("line")
      .attr("x1", xRange(i) + 1)
      .attr("y1", yRange(0))
      .attr("x2", xRange(i) + 1)
      .attr("y2", yRange(1))
      .attr("stroke-width", 2)
      .attr("stroke", colors(j))
      .attr("opacity", 0.0)
      .attr("marker-end", "url(#arrowhead" + colors(j) + ")");
  }
}



}) ();


