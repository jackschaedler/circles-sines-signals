var FIR_RESPONSE = (function() {

var FFTSize = 64;
var kernelFFTData = new complex_array.ComplexArray(FFTSize);

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


function fillFFTBuffer()
{
  for (var i = 0; i < FFTSize; i++)
  {
    kernelFFTData.real[i] = 0.0;
    kernelFFTData.imag[i] = 0.0;
  }

  for (var i = 0; i < kernel.length; i++)
  {
    kernelFFTData.real[i] = kernel[i];
  }
}

function doFFT()
{
  fillFFTBuffer();
  kernelFFTData.FFT();

  for (var i = 0; i < FFTSize; i++)
  {
    kernelFFTData.real[i] *= Math.sqrt(FFTSize);
    kernelFFTData.imag[i] *= Math.sqrt(FFTSize);
  }

  var magnitudes = [];

  for (var i = 0; i < FFTSize; i++)
  {
    magnitudes.push(
      Math.sqrt(
        (kernelFFTData.real[i] * kernelFFTData.real[i])
        + (kernelFFTData.imag[i] * kernelFFTData.imag[i])
        )
      );
  }

  return magnitudes;
}


//////////////////////////////////////////////////////////////////////////

var canvasWidth = 700;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#firresponse');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var yRangeTime = d3.scale.linear().range([190, 70]);
yRangeTime.domain([-1, 1]);

var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 12);

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([400 - 40, 280 - 40]);

xRange.domain([0, FFTSize]);
yRange.domain([0.0, 1.2]);

var xAxisTime = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var yAxisTime = d3.svg.axis()
  .scale(yRangeTime)
  .tickSize(3)
  .tickValues([-1.0, -0.5, 0, 0.5, 1.0])
  .orient('left')
  .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + 0 + ',0)')
  .style("opacity", 0.65)
  .call(yAxisTime);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + yRangeTime(0) + ')')
  .style("opacity", 0.35)
  .call(xAxisTime);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
  .ticks(0)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(0)
  .ticks(0)
  .tickValues([1, 0.5])
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

vis.append("svg:line")
  .attr("x1", xRange(32) + 0.5)
  .attr("y1", yRange(-0.15))
  .attr("x2", xRange(32) + 0.5)
  .attr("y2", yRange(1.2))
  .attr("stroke-width", 1)
  .attr("stroke", "grey")
  .style("opacity", 0.7)
  .style("stroke-dasharray", ("5, 1"));

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", xRange(32) + 5)
  .attr("y", yRange(-0.3))
  .style("font-size", "11px")
  .style("font-weight", "normal")
  .style("opacity", 0.5)
  .text("Nyquist Limit");

///////////////////////////////////////

kernelPoints = [];
kernelSticks = [];

for (var i = 0; i < FFTSize; i++)
{
  kernelPoints.push(
    vis.append("svg:circle")
      .attr("stroke",  "purple")
      .style("stroke-width", 0)
      .attr("fill",  "purple")
      .attr("cx", xRange(i))
      .attr("cy", yRangeTime(1))
      .attr("r", 2)
      .style("opacity", 1.0)
    );

  kernelSticks.push(
    vis.append("svg:line")
      .attr("x1", xRange(i))
      .attr("y1", yRangeTime(0))
      .attr("x2", xRange(i))
      .attr("y2", yRangeTime(1))
      .attr("stroke-width", 2)
      .attr("stroke", "purple")
      .style("opacity", 0.25)
  );
}


///////////////////////////////////////

freqPoints = [];
freqSticks = [];

for (var i = 0; i < FFTSize; i++)
{
  freqPoints.push(
    vis.append("svg:rect")
      .attr("stroke", "purple")
      .style("stroke-width", 1)
      .attr("fill",  "purple")
      .attr("x", xRange(i) - 1.5)
      .attr("y", yRange(1))
      .attr("width", 3)
      .attr("height", 3)
      .style("opacity", 1.0)
    );

  freqSticks.push(
    vis.append("svg:line")
      .attr("x1", xRange(i))
      .attr("y1", yRange(0))
      .attr("x2", xRange(i))
      .attr("y2", yRange(1))
      .attr("stroke-width", 2)
      .attr("stroke", "purple")
      .style("opacity", 0.20)
  );
}


function updateKernel()
{
  for (var i = 0; i < FFTSize; i++)
  {
    var value = i < kernel.length ? kernel[i] : 0.0;

    kernelPoints[i]
      .attr("cx", xRange(i))
      .attr("cy", yRangeTime(value));

    kernelSticks[i]
      .attr("x1", xRange(i))
      .attr("y1", yRangeTime(0))
      .attr("x2", xRange(i))
      .attr("y2", yRangeTime(value));
  }
}

updateKernel();


function updateMagnitudes()
{
  var magnitudes = doFFT();

  for (var i = 0; i < FFTSize; i++)
  {
    freqPoints[i]
      .attr("x", xRange(i) - 1.5)
      .attr("y", yRange(magnitudes[i]));

    freqSticks[i]
      .attr("x1", xRange(i))
      .attr("y1", yRange(0))
      .attr("x2", xRange(i))
      .attr("y2", yRange(magnitudes[i]));
  }
}

updateMagnitudes();

function changeKernel()
{
  kernelIndex++;

  if (kernelIndex == kernels.length)
  {
    kernelIndex = 0;
  }

  kernel = kernels[kernelIndex];

  updateKernel();
  updateMagnitudes();
}


var kernelButton = d3.select('#animationWrapper2').insert("button", ":first-child")
  .text("Change Kernel")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", xRange(30))
  .style("height", 25)
  .on("click", changeKernel)
  ;


// vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", xRange(0) + 5)
//   .attr("y", yRange(1.2))
//   .style("font-size", "12px")
//   .text("Magnitude Response");

// vis.append("text")
//   .attr("text-anchor", "end")
//   .attr("x", plotWidth)
//   .attr("y", yRange(-0.25))
//   .style("font-size", "12px")
//   .text("Frequency (Hz)");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRangeTime(1.1))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Time Domain");

// vis.append("text")
//   .attr("text-anchor", "begin")
//   .attr("x", 5)
//   .attr("y", yRangeTime(1.4))
//   .style("font-size", "11px")
//   .style("font-weight", "normal")
//   .text("Kernel");

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.1))
  .style("font-size", "11px")
  //.style("font-weight", "bold")
  .text("Frequency Domain");

}) ();
