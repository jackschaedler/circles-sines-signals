var FOURIERBASIC = (function() {

var canvasWidth = 350;
var canvasHeight = 200;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([0, 200]);
var yRange = d3.scale.linear().range([200, 0]);

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

var vis = d3.select('#fourierbasic');

var colorScale = d3.scale.category10();
colorScale.domain[d3.range(0, 10, 1)];

var vectors = [];
var frequencyVectors = [];
var circles = [];
var amplitudes = [0.7, 0.65, 0.6, 0.55, 0.5];
var freqSamples = [];

for (var i = 0; i < 5; i++)
{
  vectors.push(vis.append("line")
    .attr("x1", xRange(0))
    .attr("y1", yRange(0))
    .attr("x2", xRange(0))
    .attr("y2", yRange(0))
    .attr("stroke-width", 2.0)
    .attr("stroke", colorScale(i))
    .style("stroke-linecap", "round")
    .style('opacity', 1.0)
    .attr("transform", 'translate(' + (xRange(-3.5) + i * 62) + ',0)')
    );

  circles.push(vis.append('svg:circle')
    .attr("cx", xRange(0))
    .attr("cy", yRange(0))
    .attr('r', xRange(amplitudes[i]) - xRange(0))
    .attr('stroke-width', 2.5)
    .attr('stroke', colorScale(i))
    .attr('fill', 'none')
    .attr('opacity', 0.30)
    .attr("transform", 'translate(' + (xRange(-3.5) + i * 62) + ',0)')
  );
}

vis.append("line")
  .attr("x1", 20)
  .attr("y1", yRange(0))
  .attr("x2", 340)
  .attr("y2", yRange(0))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style("opacity", 0.5);

vis.append("line")
  .attr("x1", 439)
  .attr("y1", yRange(0))
  .attr("x2", 700)
  .attr("y2", yRange(0))
  .attr("stroke-width", 1.0)
  .attr("stroke", "black")
  .style("opacity", 0.5);

var time = 0.0;
var data = d3.range(0, 4 * Math.PI, 0.01);

var xRangePlot = d3.scale.linear().range([440, 700]);
xRangePlot.domain([0, 4 * Math.PI]);

var sine = d3.svg.line()
  .x(function (d, i) { return xRangePlot(d)})
  .y(function (d, i) {

    return yRange(
       ( 0.8 * 
        (
         (Math.sin(d) * amplitudes[0])
       + (Math.sin(d * 2) * amplitudes[1])
       + (Math.sin(d * 3) * amplitudes[2])
       + (Math.sin(d * 4) * amplitudes[3])
       + (Math.sin(d * 5) * amplitudes[4])
       )
       )
    );
  });


var path = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "grey")
  .attr("fill", "none")
  .style("opacity", 0.75)
  .attr('d', sine(data));


vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 550)
  .attr("y", 10)
  .attr("font-size", 12)
  .text("Time Domain Representation");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 550)
  .attr("y", 23)
  .attr("font-size", 10)
  .text("\"A List of Samples\"");


vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 190)
  .attr("y", 10)
  .attr("font-size", 12)
  .text("Frequency Domain Representation");


vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 190)
  .attr("y", 23)
  .attr("font-size", 10)
  .text("\"A List of Phasors\"");

function draw() {

  for (var i = 0; i < 5; i++)
  {
    cosComp = Math.cos(time * (i + 1)) * amplitudes[i];
    sinComp = Math.sin(time * (i + 1)) * amplitudes[i];

    vectors[i]
      .attr('x2', xRange(cosComp))
      .attr('y2', yRange(sinComp));
  }

  time += 0.0125;
  if (time > Math.PI * 4)
  {
    time = 0.0;
  }
}

 d3.timer(draw, 100);
}) ();
