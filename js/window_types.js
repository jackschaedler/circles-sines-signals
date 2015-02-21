var WINDOW_TYPES = (function() {

var canvasWidth = 600;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#windowTypes');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRangeTime = d3.scale.linear().range([0, 150]);
xRangeTime.domain([0, 2 * Math.PI]);

var yRangeTime = d3.scale.linear().range([150, 50]);
yRangeTime.domain([0, 1]);

var numSamplesInWindow = 1000;
var windowData = d3.range(0, numSamplesInWindow, 1);

var windowSignal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d / numSamplesInWindow * Math.PI * 2)})
  .y(function (d, i) {
      var windowVal = 0.5 * (1 - Math.cos((2 * Math.PI * d) / (numSamplesInWindow - 1)));
      return yRangeTime(windowVal); 
    });


var xAxis = d3.svg.axis()
  .scale(xRangeTime)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRangeTime)
  .tickSize(0)
  .tickValues([0.5, 1])
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(30,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(30,0)')
  .style("opacity", 0.35)
  .call(yAxis);

var windowPath = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.85)
  .attr('transform', 'translate(30,0)')
  .attr("d", windowSignal(windowData));



vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(250,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(250,0)')
  .style("opacity", 0.35)
  .call(yAxis);

vis.append('line')
  .attr('x1', xRangeTime(0))
  .attr('y1', yRangeTime(0))
  .attr('x2', xRangeTime(Math.PI))
  .attr('y2', yRangeTime(1))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'green')
  .style('opacity', 0.85)
  .attr('transform', 'translate(250,0)')
  ;

vis.append('line')
  .attr('x1', xRangeTime(2 * Math.PI))
  .attr('y1', yRangeTime(0))
  .attr('x2', xRangeTime(Math.PI))
  .attr('y2', yRangeTime(1))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'green')
  .style('opacity', 0.85)
  .attr('transform', 'translate(250,0)')
  ;



vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(475,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(475,0)')
  .style("opacity", 0.35)
  .call(yAxis);

vis.append('line')
  .attr('x1', xRangeTime(0) + 1)
  .attr('y1', yRangeTime(0))
  .attr('x2', xRangeTime(0) + 1)
  .attr('y2', yRangeTime(1))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'green')
  .style('opacity', 0.85)
  .attr('transform', 'translate(475,0)')
  ;

vis.append('line')
  .attr('x1', xRangeTime(0) + 0.5)
  .attr('y1', yRangeTime(1))
  .attr('x2', xRangeTime(2 * Math.PI))
  .attr('y2', yRangeTime(1))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'green')
  .style('opacity', 0.85)
  .attr('transform', 'translate(475,0)')
  ;

vis.append('line')
  .attr('x1', xRangeTime(2 * Math.PI) - 1)
  .attr('y1', yRangeTime(1))
  .attr('x2', xRangeTime(2 * Math.PI) - 1)
  .attr('y2', yRangeTime(0))
  .attr('stroke-width', 1.5)
  .attr('stroke', 'green')
  .style('opacity', 0.85)
  .attr('transform', 'translate(475,0)')
  ;

var hammStyles = ['Hann', 'Hamming', 'Blackman', 'Kaiser', 'Parzen', 'et cetera'];

for (var i = 0; i < hammStyles.length; i++)
{
  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xRangeTime(Math.PI))
    .attr("y", yRangeTime(-0.12) + (i * 16))
    .style("font-size", "12px")
    .style("font-weight", "normal")
    .attr('transform', 'translate(30,0)')
    .text(hammStyles[i]);
}

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xRangeTime(Math.PI))
    .attr("y", yRangeTime(-0.12))
    .style("font-size", "12px")
    .style("font-weight", "normal")
    .attr('transform', 'translate(250,0)')
    .text("Triangular");

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xRangeTime(Math.PI))
    .attr("y", yRangeTime(-0.12))
    .style("font-size", "12px")
    .style("font-weight", "normal")
    .attr('transform', 'translate(475,0)')
    .text("Rectangular");

}) ();
