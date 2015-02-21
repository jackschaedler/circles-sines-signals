var CONVOLUTION = (function() {

var canvasWidth = 600;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#convolution');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var pixelsPerSample = 13;

var signals =
[
  [
  0,
  0.25,
  0.35,
  0.45,
  0.55,
  0.58,
  0.99,
  0.59,
  0.49,
  -0.8,
  0.11,
  0.0,
  -0.1,
  -0.33,
  -0.89,
  -0.78,
  -0.44,
  -0.55,
  -0.66,
  -0.59,
  -0.44,
  0.99,
  0.0,
  -0.1,
  -0.33,
  -0.89,
  -0.78,
  -0.44,
  -0.55,
  -0.66,
  -0.59,
  -0.34,
  -0.22,
  0.0
  ],

  [
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5
  ]

];

var signalPixels = [];

signalPixels = signals[0];

var maxKernelSize = 9;

var kernels =
[
  [
    0.25,
    0.25,
    0.25,
    0.25
  ],

  [
    0.125,
    0.125,
    0.125,
    0.125,
    0.125,
    0.125,
    0.125,
    0.125,
  ],

  [
    0.5,
    0.5
  ],

  [
    1.0,
  ]
];

var kernelIndex = 0;
var kernel = kernels[kernelIndex];
var kernelShift = - (kernel.length - 1);

function kernelAxisOffset()
{
  return maxKernelSize - kernel.length;
}

var xRangeTimeSignal = d3.scale.linear().range([100, signalPixels.length * pixelsPerSample + 100]);
xRangeTimeSignal.domain([0, signalPixels.length]);

var yRangeTimeSignal = d3.scale.linear().range([100, 5]);
yRangeTimeSignal.domain([-1, 1]);

var yRangeKernel = d3.scale.linear().range([100 + 100, 100 + 5]);
yRangeKernel.domain([-1.0, 1.0]);

var yRangeConvolved = d3.scale.linear().range([200 + 100, 200 + 5]);
yRangeConvolved.domain([-1, 1]);

var xRangeKernel = d3.scale.linear().range([0, pixelsPerSample * (maxKernelSize - 1)]);
xRangeKernel.domain([maxKernelSize - 1, 0]);

var xAxisTimeSignal = d3.svg.axis()
  .scale(xRangeTimeSignal)
  .tickSize(3)
  .ticks(35)
  .tickSubdivide(true)
  .tickFormat(function(d) { return ""; } );

var xAxisKernel = d3.svg.axis()
  .scale(xRangeTimeSignal)
  .tickSize(3)
  .ticks(0)
  .tickSubdivide(true);

var tickValues = [];
for (var i = 0; i < kernel.length; i++)
{
  tickValues.push(i);
}

var xAxisSubKernel = d3.svg.axis()
  .scale(xRangeKernel)
  .tickSize(3)
  .tickValues(tickValues)
  .tickSubdivide(true)
  .tickFormat(function(d) { return d; });

var signal = d3.svg.line()
  .x(function(d, i) {return xRangeTimeSignal(i);})
  .y(function(d, i) {return yRangeTimeSignal(d);})
  .interpolate('cardinal');

var signal = d3.svg.line()
  .x(function(d, i) {return xRangeTimeSignal(i);})
  .y(function(d, i) {return yRangeTimeSignal(d);})
  .interpolate('cardinal');

var signalConvolved = d3.svg.line()
  .x(function(d, i) {return xRangeTimeSignal(i);})
  .y(function(d, i) {return yRangeConvolved(d);})
  .interpolate('cardinal');

var outputIndicator = vis.append('line')
  .attr('x1', xRangeTimeSignal(-3))
  .attr('y1', yRangeTimeSignal(1.5))
  .attr('x2', xRangeTimeSignal(-3))
  .attr('y2', yRangeConvolved(-1.0))
  .attr('stroke-width', 1)
  .attr('stroke', 'black')
  .style('opacity', 0.5)
  .style("stroke-dasharray", ("5, 1"));

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTimeSignal(0) + ')')
  .style("opacity", 0.25)
  .call(xAxisTimeSignal);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeKernel(0) + ')')
  .style("opacity", 0.25)
  .call(xAxisKernel);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeConvolved(0) + ')')
  .style("opacity", 0.25)
  .call(xAxisTimeSignal);

vis.append('line')
  .attr('x1', xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr('y1', yRangeTimeSignal(0))
  .attr('x2', xRangeTimeSignal(signalPixels.length + (maxKernelSize - 1)))
  .attr('y2', yRangeTimeSignal(0))
  .attr('stroke-width', 1)
  .attr('stroke', 'black')
  .style('opacity', 0.3);

kernelAxisOffset();

var kernelAxis = vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(' + xRangeTimeSignal(kernelShift - kernelAxisOffset()) + ',' + yRangeKernel(0) + ')')
  .style("opacity", 0.25)
  .call(xAxisSubKernel);

// vis.append('svg:g')
//   .attr('class', 'x axis')
//   .attr('transform', 'translate(0,' + yRangeKernel(0) + ')')
//   .style("opacity", 0.35)
//   .call(xAxisTimeSignal);
vis.append('line')
  .attr('x1', xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr('y1', yRangeConvolved(0))
  .attr('x2', xRangeTimeSignal(signalPixels.length + (maxKernelSize - 1)))
  .attr('y2', yRangeConvolved(0))
  .attr('stroke-width', 1)
  .attr('stroke', 'black')
  .style('opacity', 0.3);

vis.append('line')
  .attr('x1', xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr('y1', yRangeKernel(0))
  .attr('x2', xRangeTimeSignal(signalPixels.length + (maxKernelSize - 1)))
  .attr('y2', yRangeKernel(0))
  .attr('stroke-width', 1)
  .attr('stroke', 'black')
  .style('opacity', 0.5);

var signalPath = vis.append('svg:path')
  .attr('d', signal(signalPixels))
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1.5)
  .attr('fill', 'none')
  .style("opacity", 0.25);

var points = vis.selectAll(".point")
  .data(signalPixels)
  .enter().append("svg:circle")
    .attr("stroke",  "none")
    .style("stroke-width", 1)
    .attr("fill",  "steelblue")
    .attr("cx", function(d, i) { return xRangeTimeSignal(i); })
    .attr("cy", function(d, i) { return yRangeTimeSignal(d); })
    .attr("r", 2.0)
  ;

var convolvedPoints = [];
var convolvedVals = [];
for (var i = 0; i < signalPixels.length + (maxKernelSize); i++)
{
  convolvedPoints.push(
    vis.append("svg:circle")
      .attr("stroke",  "none")
      .style("stroke-width", 1)
      .attr("fill",  "grey")
      .attr("cx", xRangeTimeSignal(i - (kernel.length - 1)))
      .attr("cy", yRangeConvolved(0.25))
      .attr("r", 2.0)
      .style('opacity', 0.0)
  );
}

var convolvedPath = vis.append('svg:path')
  .attr('d', signalConvolved(convolvedVals))
  .attr('stroke', 'grey')
  .attr('stroke-width', 1.5)
  .attr('fill', 'none')
  .style("opacity", 0.25);

var connectors = [];

function getSignalValue(kernelIndex)
{
  var index = kernelIndex + kernelShift;
  var value = (index >= 0 && index < signalPixels.length) ? signalPixels[index] : 0.0;
  return value;
}

for (var i = 0; i < kernel.length; i++)
{
  connectors.push(
    vis.append("svg:line")
    .attr("x1", xRangeTimeSignal(i + kernelShift))
    //.attr("y1", yRangeTimeSignal(getSignalValue(i)))
    .attr("y1", yRangeKernel(kernel[i]))
    .attr("x2", xRangeTimeSignal(i + kernelShift))
    .attr("y2", yRangeKernel(kernel[i]))
    .attr("stroke",  "grey")
    .attr("stroke-width", 1.0)
    .style('opacity', 0.75)
  )
}

vis.append("svg:rect")
  .attr("stroke",  "none")
  .attr("fill",  "#fff")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)) - 10)
  .attr("y", yRangeTimeSignal(0.8) - 10)
  .attr("width", 80)
  .attr("height", 16);

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr("y", yRangeTimeSignal(0.8))
  .style("font-size", "12px")
  .text("Input Signal")
  .style("font-weight", "normal");

vis.append("svg:rect")
  .attr("stroke",  "none")
  .attr("fill",  "#fff")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)) - 10)
  .attr("y", yRangeKernel(1.0) - 10)
  .attr("width", 45)
  .attr("height", 16);

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr("y", yRangeKernel(1.0))
  .style("font-size", "12px")
  .text("Kernel")
  .style("font-weight", "normal");


vis.append("svg:rect")
  .attr("stroke",  "none")
  .attr("fill",  "#fff")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)) - 10)
  .attr("y", yRangeConvolved(1.0) - 10)
  .attr("width", 110)
  .attr("height", 16);

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRangeTimeSignal(-(maxKernelSize - 1)))
  .attr("y", yRangeConvolved(1.0))
  .style("font-size", "12px")
  .text("Convolution Result")
  .style("font-weight", "normal");


var kernelPoints = vis.selectAll(".kernelPoint")
  .data(kernel)
  .enter().append("svg:circle")
    .attr("stroke",  "none")
    .style("stroke-width", 1)
    .attr("fill",  "purple")
    .attr("cx", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("cy", function(d, i) { return yRangeKernel(d); })
    .attr("r", 2.0)
  ;

var kernelShafts = vis.selectAll(".shafts")
  .data(kernel)
  .enter().append("svg:line")
    .attr("x1", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("y1", function(d, i) { return yRangeKernel(0); })
    .attr("x2", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("y2", function(d, i) { return yRangeKernel(d); })
    .attr("stroke",  "purple")
    .attr("stroke-width", 2.0)
    .style('opacity', 0.25)
  ;

var multTexts = [];

for (var i = 0; i < kernel.length; i++)
{
  multTexts.push(vis.append('text')
    .attr("text-anchor", "begin")
    .attr("x", xRangeTimeSignal(kernelShift))
    .attr("y", yRangeConvolved(-1.0) + 20 + (i * 16))
    .text("0.250 * x[" + (kernelShift + i) + "]")
    .style("fill", "black")
    .style("opacity", 0.0)
    .style("font-size", "12px")
    .style("font-weight", "normal")
    );
}

multTexts.push(
  vis.append('text')
    .attr("text-anchor", "begin")
    .attr("x", xRangeTimeSignal(kernelShift) + 35)
    .attr("y", yRangeConvolved(-1.0) + 20 + (4 * 16))
    .text("")
    .style("fill", "black")
    .style("opacity", 0.0)
    .style("font-size", "12px")
    .style("font-weight", "bold")
);


var currentPoint = 0;


var playbackSpeedFactor = 0.5;
var playbackSpeeds = ["Slow", "Normal", "Turbo"];
var playbackSpeedFactors = [1.5, 0.5, 0.05];
var currentPlaybackSpeedIndex = 1;

var isPlaying = false;

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

function updateButtons()
{
  var className = isPlaying ? "disabled" : "active";
  signalButton.attr("class", className);
  playButton.attr("class", className);
  kernelButton.attr("class", className); 
}

var currentSignalIndex = 0;

function changeSignal()
{
  currentSignalIndex++;
  if (currentSignalIndex == signals.length)
  {
    currentSignalIndex = 0;
  }

  signalPixels = signals[currentSignalIndex];


  signalPath
    .attr('d', signal(signalPixels));

  points
    .data(signalPixels)
      .attr("cx", function(d, i) { return xRangeTimeSignal(i); })
      .attr("cy", function(d, i) { return yRangeTimeSignal(d); })
    ;

}

function changeKernel()
{
  kernelIndex++;

  if (kernelIndex == kernels.length)
  {
    kernelIndex = 0;
  }

  kernel = kernels[kernelIndex];

  console.log(kernel);


  var tickValues = [];
  for (var i = 0; i < kernel.length; i++)
  {
    tickValues.push(i);
  }

  kernelShift = - (kernel.length - 1)

  xAxisSubKernel
    .tickValues(tickValues);

  kernelAxis
    .call(xAxisSubKernel);

  kernelPoints.remove();
  kernelShafts.remove();

  kernelPoints = vis.selectAll(".kernelPoint")
  .data(kernel)
  .enter().append("svg:circle")
    .attr("stroke",  "none")
    .style("stroke-width", 1)
    .attr("fill",  "purple")
    .attr("cx", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("cy", function(d, i) { return yRangeKernel(d); })
    .attr("r", 2.0)
  ;

  kernelShafts = vis.selectAll(".shafts")
  .data(kernel)
  .enter().append("svg:line")
    .attr("x1", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("y1", function(d, i) { return yRangeKernel(0); })
    .attr("x2", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    .attr("y2", function(d, i) { return yRangeKernel(d); })
    .attr("stroke",  "purple")
    .attr("stroke-width", 2.0)
    .style('opacity', 0.25)
  ;

  kernelAxisOffset();

  kernelAxis
    .attr('transform', 'translate(' + xRangeTimeSignal(kernelShift - kernelAxisOffset()) + ',' + yRangeKernel(0) + ')');

  for (var i = 0; i < connectors.length; i++)
  {
    connectors[i].remove();
    multTexts[i].remove();
  }

  multTexts[multTexts.length -1].remove();
  multTexts = [];
  connectors = [];

  for (var i = 0; i < kernel.length; i++)
  {
    connectors.push(
      vis.append("svg:line")
      .attr("x1", xRangeTimeSignal(i + kernelShift))
      //.attr("y1", yRangeTimeSignal(getSignalValue(i)))
      .attr("y1", yRangeKernel(kernel[i]))
      .attr("x2", xRangeTimeSignal(i + kernelShift))
      .attr("y2", yRangeKernel(kernel[i]))
      .attr("stroke",  "grey")
      .attr("stroke-width", 1.0)
      .style('opacity', 0.75)
    )

    multTexts.push(vis.append('text')
      .attr("text-anchor", "begin")
      .attr("x", xRangeTimeSignal(kernelShift))
      .attr("y", yRangeConvolved(-1.0) + 20 + (i * 16))
      .text("0.250 * x[" + (kernelShift + i) + "]")
      .style("fill", "black")
      .style("opacity", 0.0)
      .style("font-size", "12px")
      .style("font-weight", "normal")
      );
  }

  multTexts.push(
    vis.append('text')
      .attr("text-anchor", "begin")
      .attr("x", xRangeTimeSignal(kernelShift) + 35)
      .attr("y", yRangeConvolved(-1.0) + 20 + (kernel.length * 16))
      .text("")
      .style("fill", "black")
      .style("opacity", 0.0)
      .style("font-size", "12px")
      .style("font-weight", "bold")
  );


  for (var i = 0; i < convolvedPoints.length; i++)
  {
    convolvedPoints[i].remove();
  }

  convolvedPoints = [];
  convolvedVals = [];

  for (var i = 0; i < signalPixels.length + (maxKernelSize - 1); i++)
  {
    convolvedPoints.push(
      vis.append("svg:circle")
        .attr("stroke",  "none")
        .style("stroke-width", 1)
        .attr("fill",  "grey")
        .attr("cx", xRangeTimeSignal(i - (kernel.length - 1)))
        .attr("cy", yRangeConvolved(0.25))
        .attr("r", 2.0)
        .style('opacity', 0.0)
    );
  }

  var convolvedPath = vis.append('svg:path')
    .attr('d', signalConvolved(convolvedVals))
    .attr('stroke', 'grey')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .style("opacity", 0.25);
}


var speedButton = d3.select('#animationWrapper').insert("button", ":first-child")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 520 + 50 - 50)
  .style("height", 25)
  .text("Normal Speed")
  .on("click", changeSpeed);

var signalButton = d3.select('#animationWrapper').insert("button", ":first-child")
  .text("Change Input Signal")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 270 + 50 - 50)
  .style("height", 25)
  .on("click", changeSignal)
  ;

var kernelButton = d3.select('#animationWrapper').insert("button", ":first-child")
  .text("Change Kernel")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 410 + 50 - 50)
  .style("height", 25)
  .on("click", changeKernel)
  ;

var playButton = d3.select('#animationWrapper').insert("button", ":first-child")
  .text("▶ Play")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 200 + 50 - 50)
  .style("height", 25)
  .on("click", restart)
  ;

updateButtons();


function doMultiply()
{
  var Sum = 0.0;
 
  var forwardIndex = 0;
  for (var i = kernel.length - 1; i >= 0; i--)
  {
    connectors[i]
      .transition()
      .duration(1000 * playbackSpeedFactor)
      .delay(1000 * (kernel.length - i) * playbackSpeedFactor)
        .attr("y1", yRangeTimeSignal(getSignalValue(i)))

    var value = kernel[i] * getSignalValue(i);
    Sum += value;

    multTexts[forwardIndex]
      .text(kernel[i].toFixed(2) + " x " + getSignalValue(i).toFixed(2) + " = " + value.toFixed(2))

    multTexts[i]
      .transition()
      .duration(1000 * playbackSpeedFactor)
      .delay(playbackSpeedFactor * 1000 * i + 1000 * playbackSpeedFactor)
        .style("opacity", 0.75);

    forwardIndex++;
  }

  multTexts[kernel.length]
    .text("Sum = " + Sum.toFixed(2));

  multTexts[kernel.length]
      .transition()
      .duration(3000 * playbackSpeedFactor)
      .delay(playbackSpeedFactor * 1000 * kernel.length + 1500 * playbackSpeedFactor)
        .style("opacity", 0.75)
        .each('end', update);

  console.log("CP> " + currentPoint);
  convolvedPoints[currentPoint]
    .attr("cy", yRangeConvolved(Sum))
    .transition()
    .duration(500 * playbackSpeedFactor)
    .delay(playbackSpeedFactor * 1000 * (kernel.length + 1) + 1500 * playbackSpeedFactor)
    .style('opacity', 1.0);

  convolvedVals[kernelShift] = Sum;
}

function restart()
{
  if (isPlaying)
  {
    return;
  }

  kernelShift = - (kernel.length - 1);
  currentPoint = 0;


  outputIndicator
    .transition()
    .duration(500)
    .attr("x1", xRangeTimeSignal(kernelShift))
    .attr("x2", xRangeTimeSignal(kernelShift));


  kernelPoints
    .data(kernel)
      .attr("cx", function(d, i) {return xRangeTimeSignal(i + kernelShift); })
    ;

  kernelShafts
    .data(kernel)
      .attr("x1", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
      .attr("x2", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    ;

  kernelAxisOffset();

  kernelAxis
    .attr('transform', 'translate(' + xRangeTimeSignal(kernelShift - kernelAxisOffset()) + ',' + yRangeKernel(0) + ')')

  for (var i = 0; i < kernel.length; i++)
  {
    connectors[i]
      .attr("x1", xRangeTimeSignal(i + kernelShift))
      .attr("y1", yRangeKernel(kernel[i]))
      .attr("x2", xRangeTimeSignal(i + kernelShift))
      .attr("y2", yRangeKernel(kernel[i]))
      .attr("stroke",  "grey")
      .attr("stroke-width", 1.0)
      .style('opacity', 0.75);

    multTexts[i]
      .style('opacity', 0.0)
      .attr("x", xRangeTimeSignal(kernelShift));
  }

  multTexts[kernel.length]
      .style('opacity', 0.0)
      .attr("x", xRangeTimeSignal(kernelShift) + 35);

  convolvedVals = [];

  convolvedPath
    .attr('d', signalConvolved(convolvedVals));


  for (var i = 0; i < convolvedPoints.length; i++)
  {
    convolvedPoints[i].style('opacity', 0.0);
  }

  // doMultiply();


  start();
}

function start()
{
  isPlaying = true;
  updateButtons();

  doMultiply();
}


function finish()
{
  for (var i = 0; i < kernel.length; i++)
  {
    connectors[i]
      .attr("x1", xRangeTimeSignal(i + kernelShift))
      .attr("y1", yRangeKernel(kernel[i]))
      .attr("x2", xRangeTimeSignal(i + kernelShift))
      .attr("y2", yRangeKernel(kernel[i]))
      .attr("stroke",  "grey")
      .attr("stroke-width", 1.0)
      .style('opacity', 0.75);

    multTexts[i]
      .style('opacity', 0.0)
      .attr("x", xRangeTimeSignal(kernelShift));
  }

  multTexts[kernel.length]
    .style('opacity', 0.0);

  isPlaying = false;
  updateButtons();
}


function update()
{
  kernelShift += 1;
  currentPoint += 1;

  if (kernelShift == signalPixels.length)
  {
    finish();
    return true;
  }

  outputIndicator
    .transition()
    .duration(500)
    .attr("x1", xRangeTimeSignal(kernelShift))
    .attr("x2", xRangeTimeSignal(kernelShift));


  kernelPoints
    .data(kernel)
      .attr("cx", function(d, i) {return xRangeTimeSignal(i + kernelShift); })
    ;

  kernelShafts
    .data(kernel)
      .attr("x1", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
      .attr("x2", function(d, i) { return xRangeTimeSignal(i + kernelShift); })
    ;

  kernelAxisOffset();

  kernelAxis
    .attr('transform', 'translate(' + xRangeTimeSignal(kernelShift - kernelAxisOffset()) + ',' + yRangeKernel(0) + ')')

  for (var i = 0; i < kernel.length; i++)
  {
    connectors[i]
      .attr("x1", xRangeTimeSignal(i + kernelShift))
      .attr("y1", yRangeKernel(kernel[i]))
      .attr("x2", xRangeTimeSignal(i + kernelShift))
      .attr("y2", yRangeKernel(kernel[i]))
      .attr("stroke",  "grey")
      .attr("stroke-width", 1.0)
      .style('opacity', 0.75);

    multTexts[i]
      .style('opacity', 0.0)
      .attr("x", xRangeTimeSignal(kernelShift));
  }

  multTexts[kernel.length]
      .style('opacity', 0.0)
      .attr("x", xRangeTimeSignal(kernelShift) + 35);

  convolvedPath
    .attr('d', signalConvolved(convolvedVals));

  doMultiply();
  return true;
}

//update();




}) ();
