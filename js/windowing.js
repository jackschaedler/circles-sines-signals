var WINDOWING_1 = (function() {

var canvasWidth = 600;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#windowing1');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRangeTime = d3.scale.linear().range([0, plotWidth / 6]);
xRangeTime.domain([0, 2 * Math.PI]);

var yRangeTime = d3.scale.linear().range([140, 70]);
yRangeTime.domain([-1, 1]);

var xRangeTime2 = d3.scale.linear().range([plotWidth / 6 + 100, plotWidth]);
xRangeTime2.domain([0, 2 * Math.PI * 4]);


var yOffsetWindowed = 80;

var yRangeTimeWindowed = d3.scale.linear().range([140 + yOffsetWindowed, 70 + yOffsetWindowed]);
yRangeTimeWindowed.domain([-1, 1]);

var xAxisTime = d3.svg.axis()
  .scale(xRangeTime)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisTime2 = d3.svg.axis()
  .scale(xRangeTime2)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisTimeWindowed = d3.svg.axis()
  .scale(xRangeTime)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxisTime2Windowed = d3.svg.axis()
  .scale(xRangeTime2)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime);


vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime2);


vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTimeWindowed(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTimeWindowed);


vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTimeWindowed(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime2Windowed);

var currentFrequency = DIS_FREQUENCY;

var sigData = d3.range(0, 2 * Math.PI + 0.05, 0.05);

var signal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) { return yRangeTime(Math.sin(d * currentFrequency)); });

var signalWindowed = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d)})
  .y(function (d, i) {
      var sinValue = Math.sin(d * currentFrequency);
      var numSamples = sigData.length;
      var windowVal = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (numSamples - 1)));
      var windowedValue = sinValue * windowVal;
      return yRangeTimeWindowed(windowedValue); 
    });

var perSignal = d3.svg.line()
  .x(function (d, i) { return xRangeTime2(d)})
  .y(function (d, i) {return yRangeTime(Math.sin(d * currentFrequency)); });

var perSignalWindowed = d3.svg.line()
  .x(function (d, i) { return xRangeTime2(d)})
  .y(function (d, i) { 
      var sinValue = Math.sin(d * currentFrequency);
      var numSamples = sigData.length;
      var windowVal = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (numSamples - 1)));
      var windowedValue = sinValue * windowVal;
      return yRangeTimeWindowed(windowedValue);
  });


var numSamplesInWindow = 1000;

var windowSignal = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d / numSamplesInWindow * Math.PI * 2)})
  .y(function (d, i) {
      var windowVal = 0.5 * (1 - Math.cos((2 * Math.PI * d) / (numSamplesInWindow - 1)));
      return yRangeTimeWindowed(windowVal); 
    });

var windowSignalBottom = d3.svg.line()
  .x(function (d, i) { return xRangeTime(d / numSamplesInWindow * Math.PI * 2)})
  .y(function (d, i) {
      var windowVal = 0.5 * (1 - Math.cos((2 * Math.PI * d) / (numSamplesInWindow - 1)));
      return yRangeTimeWindowed(-windowVal); 
    });

var perData = d3.range(0, 2 * Math.PI, 0.05);
var windowData = d3.range(0, numSamplesInWindow, 1);


var windowPath = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "grey")
  .attr("fill", "none")
  .attr("opacity", 0.70)
  .attr("d", windowSignal(windowData));

var windowPathBottom = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "grey")
  .attr("fill", "none")
  .attr("opacity", 0.70)
  .attr("d", windowSignalBottom(windowData));



var signalPath = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.70);

var signalPathWindowed = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.70);

var perPath1 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.70);

var perPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.30);

var perPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.30);

var perPath4 = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.30);

var perPath1Windowed = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.70);

var perPath2Windowed = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.30);

var perPath3Windowed = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.30);

var perPath4Windowed = vis.append('svg:path')
  .attr("stroke-width", 2.0)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.30);

signalPath.attr("d", signal(sigData));
signalPathWindowed.attr("d", signalWindowed(sigData))

perPath1.attr("d", perSignal(perData));
perPath2.attr("d", perSignal(perData));
perPath3.attr("d", perSignal(perData));
perPath4.attr("d", perSignal(perData));

perPath1Windowed.attr("d", perSignalWindowed(perData));
perPath2Windowed.attr("d", perSignalWindowed(perData));
perPath3Windowed.attr("d", perSignalWindowed(perData));
perPath4Windowed.attr("d", perSignalWindowed(perData));

perPath2.attr("transform", "translate(100,0)");
perPath3.attr("transform", "translate(200,0)");
perPath4.attr("transform", "translate(300,0)");

perPath2Windowed.attr("transform", "translate(100,0)");
perPath3Windowed.attr("transform", "translate(200,0)");
perPath4Windowed.attr("transform", "translate(300,0)");

var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 12);

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([400 - 80 + 100, 280 - 80 + 100]);

xRange.domain([0, 12]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
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

var sinc = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) {
    var diff = (currentFrequency - d) + 0.00001;
    var common = Math.PI * diff;
    var val = Math.sin(common) / common;
    return yRange(Math.abs(val));
  });

var sincWindowed = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) {
    var diff = (currentFrequency - d) + 0.00001;
    var common = Math.PI * diff;
    var val = Math.sin(common) / common;
    var diffAbs = Math.abs(diff);
    if (diffAbs < 2)
    {
      val = 0.5 - ((diffAbs / 2) * (diffAbs / 2));
      if (diffAbs >= 1.2)
      {
        var valstart = 0.5 - ((1.2 / 2) * (1.2 / 2));
        var valPct = (diffAbs - 1.2) / (0.8);
        val = valstart * (1 - valPct) * (1 - valPct);
      }
    }
    else
    {
      val *= 0.25;
    }
    return yRange(Math.abs(val));
  });

var sincData = d3.range(0, 12, 0.05);

var sincPath = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("opacity", 0.50);

sincPath.attr("d", sinc(sincData));

var sincPathWindowed = vis.append('svg:path')
  .attr("stroke-width", 1.5)
  .attr("stroke", "green")
  .attr("fill", "none")
  .attr("opacity", 0.50);

sincPathWindowed.attr("d", sincWindowed(sincData));

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(0) + 5)
  .attr("y", yRange(1.2))
  .style("font-size", "12px")
  .text("Magnitude");

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", yRange(-0.25))
  .style("font-size", "12px")
  .text("Frequency (Hz)");

var frequencies = d3.range(0, 13, 1);

var points = vis.selectAll(".point")
  .data(frequencies)
  .enter().append("svg:rect")
    .attr("stroke",  "steelblue")
    .style("stroke-width", 1)
    .attr("fill",  "steelblue")
    .attr("x", function(d, i) { return xRange(d) - 1.5; })
    .attr("y", function(d, i) {
      var diff = (currentFrequency - d) + 0.00001;
      var common = Math.PI * diff;
      var val = Math.sin(common) / common;
      return yRange(val) - 2; })
    .attr("width", 4)
    .attr("height", 4.5);


vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRangeTime(1.4))
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "#333")
  .text("Time Domain");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.4))
  .style("font-size", "12px")
  .style("font-weight", "bold")
  .attr("stroke", "none")
  .attr("fill", "#333")
  .text("Frequency Domain");


var freqIndicator = vis.append("svg:line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1); })
  .attr("stroke-width", 1)
  .attr("stroke", "grey")
  .style("opacity", 0.75)
  .style("stroke-dasharray", ("5, 1"));

var clicks = [];
for (var i = 0; i < 4; i++)
{
  clicks.push(vis.append("svg:line")
    .attr("x1", function(d, i) { return xRangeTime2(0); })
    .attr("y1", function(d, i) { return yRangeTime(0);} )
    .attr("x2", function(d, i) { return xRangeTime2(0); })
    .attr("y2", function(d, i) { return yRangeTime(0); })
    .attr("stroke-width", 2)
    .attr("stroke", "red")
    .style("opacity", i == 0 ? 0.5 : 0.25)
    .attr("transform", "translate(" + ((i + 1) * 100) + ",0)")
    )
    ;
}

var waitCycles = 0;

function updateFrequency()
{

  document.getElementById("leakFreq2").innerHTML = "Input Frequency: &nbsp; <b>" + (currentFrequency * 1.0).toFixed(2) + " Hz</b>";

  if (currentFrequency === DIS_FREQUENCY)
  {
    return false;
  }

  currentFrequency = DIS_FREQUENCY;

  points
    .data(frequencies)
    .attr("y", function(d, i) {
      var diff = (currentFrequency - d) + 0.00001;
      var common = Math.PI * diff;
      var val = Math.sin(common) / common;
      return yRange(Math.abs(val)) - 2; });

  freqIndicator
    .attr("x1", function(d, i) { return xRange(currentFrequency); })
    .attr("x2", function(d, i) { return xRange(currentFrequency); });

  sincPath.attr("d", sinc(sincData));
  sincPathWindowed.attr("d", sincWindowed(sincData));
  signalPath.attr("d", signal(sigData));
  signalPathWindowed.attr("d", signalWindowed(sigData));

  perPath1.attr("d", perSignal(perData));
  perPath2.attr("d", perSignal(perData));
  perPath3.attr("d", perSignal(perData));
  perPath4.attr("d", perSignal(perData));

  perPath1Windowed.attr("d", perSignalWindowed(perData));
  perPath2Windowed.attr("d", perSignalWindowed(perData));
  perPath3Windowed.attr("d", perSignalWindowed(perData));
  perPath4Windowed.attr("d", perSignalWindowed(perData));

  for (var i = 0; i < 4; i++)
  {
    clicks[i]
      .attr("x1", function(d, i) { return xRangeTime2(0); })
      .attr("y1", function(d, i) { return yRangeTime(Math.sin(Math.PI * 2 * currentFrequency));} )
      .attr("x2", function(d, i) { return xRangeTime2(0); })
      .attr("y2", function(d, i) { return yRangeTime(0); })
  }
}

d3.timer(updateFrequency, 100);

}) ();
