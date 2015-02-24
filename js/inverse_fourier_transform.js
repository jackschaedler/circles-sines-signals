var PHASOR_SUM = (function() {

var canvasWidth = 300;
var canvasHeight = 300;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([-1.25 * 2.0, 1.25 * 2.0]);
yRange.domain([-1.25 * 2.0, 1.25 * 2.0]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#phasorSum2');

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



var xRangeFreq = d3.scale.linear().range([300, 630]);
var yRangeFreq = d3.scale.linear().range([400, 300]);

xRangeFreq.domain([1, 5]);
yRangeFreq.domain([0.0, 0.6]);

var xAxisFreq = d3.svg.axis()
  .scale(xRangeFreq)
  .tickSize(3)
  //.tickValues([440])
  .ticks(5)
  .tickFormat(d3.format(",.0f"))
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (yRangeFreq(0) + 0.5) + ')')
  .style("opacity", 0.5)
  .call(xAxisFreq);

var colorScale = d3.scale.category10();
colorScale.domain[d3.range(0, 10, 1)];

var vectors = [];
var frequencyVectors = [];
var circles = [];
var amplitudes = [];
var freqSamples = [];

for (var i = 0; i < 5; i++)
{
  vectors.push(vis.append("line")
    .attr("stroke-width", 2.0)
    .attr("stroke", colorScale(i))
    .style("stroke-linecap", "round")
    .style('opacity', 1.0)
    );

  frequencyVectors.push(vis.append("line")
    .attr("x1", xRangeFreq(i + 1))
    .attr("x2", xRangeFreq(i + 1))
    .attr("stroke-width", 3.0)
    .attr("stroke", colorScale(i))
    //.style("stroke-linecap", "round")
    .style('opacity', 0.7)
    );

  freqSamples.push(vis.append("svg:rect")
    .attr("stroke", colorScale(i))
    .style("stroke-width", 1)
    .attr("fill", colorScale(i))
    .attr("x", xRangeFreq(i + 1) - 2.5)
    .attr("width", 5)
    .attr("height", 5)
    );

  circles.push(vis.append('svg:circle')
    .attr('stroke-width', 2.5)
    .attr('stroke', colorScale(i))
    .attr('fill', 'none')
    .attr('opacity', 0.30)
  );

  amplitudes.push(0.5);
}

var sineProjection = vis.append("line")
  .attr("x1", xRange(1))
  .attr("y1", yRange(0))
  .attr("x2", xRange(0))
  .attr("y2", yRange(0))
  .attr("stroke-width", 2.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round")
  .style("stroke-dasharray", ("3, 3"))
  .style("opacity", 1.0);

var axisExtension = vis.append("line")
  .attr("x1", xRange(2.5))
  .attr("y1", yRange(0))
  .attr("x2", 655)
  .attr("y2", yRange(0))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style("opacity", 0.5);

var path = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "grey")
  .attr("fill", "none")
  .style("opacity", 0.75);

var traceCircle = vis.append('svg:circle')
  .attr('cx', xRange(0))
  .attr('cy', yRange(0))
  .attr('r', 2)
  .attr('stroke-width', 2.0)
  .attr('stroke', 'grey')
  .attr('fill', 'grey')
  .attr('opacity', 1);

var time = 0.0;
var data = d3.range(0, 4 * Math.PI, 0.05);

var xRangePlot = d3.scale.linear().range([xRange(0) + 150, xRange(0) + 500]);
xRangePlot.domain([0, 4 * Math.PI]);

var sine = d3.svg.line()
  .x(function (d, i) { return xRangePlot(d)})
  .y(function (d, i) {

    return yRange(
       (
         (Math.sin(d) * amplitudes[0])
       + (Math.sin(d * 2) * amplitudes[1])
       + (Math.sin(d * 3) * amplitudes[2])
       + (Math.sin(d * 4) * amplitudes[3])
       + (Math.sin(d * 5) * amplitudes[4])
       )
    );
  });


vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 470)
  .attr("y", 10)
  .attr("font-size", 12)
  .text("Time Domain");


vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 470)
  .attr("y", 295)
  .attr("font-size", 12)
  .text("Frequency Domain");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 470)
  .attr("y", 307)
  .attr("font-size", 10)
  .text("Phasor Magnitudes");

vis.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 300)
  .attr("height", 20)
  .attr("fill", "#fff");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 150)
  .attr("y", 10)
  .attr("font-size", 12)
  .text("Summing Phasors - The Inverse Fourier Transform");

var xComponent = 0;
var yComponent = 0;

var cosComp = 0;
var sinComp = 0;

function draw() {

  amplitudes[0] = SUPER_AMP_1;
  amplitudes[1] = SUPER_AMP_2;
  amplitudes[2] = SUPER_AMP_3;
  amplitudes[3] = SUPER_AMP_4;
  amplitudes[4] = SUPER_AMP_5;

  cosComp = 0;
  sinComp = 0;

  for (var i = 0; i < 5; i++)
  {
    var xStart = xRange(cosComp);
    var yStart = yRange(sinComp);

    cosComp += Math.cos(time * (i + 1)) * amplitudes[i];
    sinComp += Math.sin(time * (i + 1)) * amplitudes[i];

    xComponent = xRange(cosComp);
    yComponent = yRange(sinComp);

    vectors[i]
      .attr('x1', xStart)
      .attr('y1', yStart)
      .attr('x2', xComponent)
      .attr('y2', yComponent);

    circles[i]
      .attr('cx', xStart)
      .attr('cy', yStart)
      .attr('r', xRange(amplitudes[i]) - xRange(0))

    frequencyVectors[i]
      .attr("y1", yRangeFreq(0))
      .attr("y2", yRangeFreq(amplitudes[i]))

    freqSamples[i]
      .attr("y", yRangeFreq(amplitudes[i]));
  }

  var leftX = xComponent;//Math.min(xComponent3, xRange(0));

  sineProjection
    .attr('x1', xRangePlot(time))
    .attr('y1', yComponent)
    .attr('x2', leftX)
    .attr('y2', yComponent)

  path
    .attr('d', sine(data));

  traceCircle
    .attr("cx", xRangePlot(time))
    .attr("cy", yComponent);


  time += 0.0125;
  if (time > Math.PI * 4)
  {
    time = 0.0;
  }
}

 d3.timer(draw, 100);
}) ();
