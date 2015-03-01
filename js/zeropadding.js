var ZEROPADDING = (function() {

  var signalLength = FFT_SIZE;

  function drawEverything()
  {
    signalLength = FFT_SIZE;
    var signalFFTData = new complex_array.ComplexArray(signalLength);

    var signal = [];
    var sigRange = [];

    var phase = 0;
    var phaseInc = 2 * Math.PI / 8;
    for (var i = 0; i < 8; i++, phase += phaseInc)
    {
      sigRange.push(phase);
    }

    for (var i = 0; i < sigRange.length; i++)
    {
      signal[i] = Math.sin(2 * sigRange[i]);
    }

    function fillFFTBuffer()
    {
      for (var i = 0; i < signalLength; i++)
      {
        signalFFTData.real[i] = 0.0;
        signalFFTData.imag[i] = 0.0;
      }

      for (var i = 0; i < signal.length; i++)
      {
        signalFFTData.real[i] = signal[i];
      }
    }

    function doFFT()
    {
      fillFFTBuffer();
      signalFFTData.FFT();

      for (var i = 0; i < signalLength; i++)
      {
        signalFFTData.real[i] *= Math.sqrt(signalLength);
        signalFFTData.imag[i] *= Math.sqrt(signalLength);
      }

      var magnitudes = [];

      for (var i = 0; i < signalLength; i++)
      {
        magnitudes.push(
          Math.sqrt(
            (signalFFTData.real[i] * signalFFTData.real[i])
            + (signalFFTData.imag[i] * signalFFTData.imag[i])
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

    var vis = d3.select('#zeropadding');

    var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
    var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

    var yRangeTime = d3.scale.linear().range([190, 70]);
    yRangeTime.domain([-1.5, 1.5]);

    var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 12);

    var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
    var yRange = d3.scale.linear().range([400 - 40, 280 - 40]);

    xRange.domain([0, signalLength]);
    yRange.domain([0.0, 4]);

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
      .ticks(4)
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
      .attr("x1", xRange(signalLength / 2) + 0.5)
      .attr("y1", yRange(-0.4))
      .attr("x2", xRange(signalLength / 2) + 0.5)
      .attr("y2", yRange(4))
      .attr("stroke-width", 1)
      .attr("stroke", "grey")
      .style("opacity", 0.7)
      .style("stroke-dasharray", ("5, 1"));

    vis.append("text")
      .attr("text-anchor", "middle")
      .attr("x", xRange(signalLength / 2) + 5)
      .attr("y", yRange(-1.0))
      .style("font-size", "11px")
      .style("font-weight", "normal")
      .style("opacity", 0.7)
      .text("Nyquist Limit");


    var startPix = xRange(0);
    var endPix = xRange(signalLength);
    var inc = (endPix - startPix) / 8;
    var freq = 0;

    for (var i = startPix; i < endPix; i += inc)
    {
      vis.append("svg:line")
        .attr("x1", i)
        .attr("y1", yRange(0))
        .attr("x2", i)
        .attr("y2", yRange(0) + 4)
        .attr("stroke-width", 1)
        .attr("stroke", "grey")
        .style("opacity", 0.8)
        ;

      vis.append("text")
        .attr("text-anchor", "middle")
        .attr("x", i)
        .attr("y", yRange(0) + 15)
        .style("font-size", "10px")
        .attr("stroke", "none")
        .attr("fill", "#666")
        .text(freq + "Hz");

      freq += 1;
    }

    ///////////////////////////////////////

    signalPoints = [];
    signalSticks = [];

    for (var i = 0; i < signalLength; i++)
    {
      signalPoints.push(
        vis.append("svg:circle")
          .attr("stroke",  "black")
          .style("stroke-width", 0)
          .attr("fill",  "black")
          .attr("cx", xRange(i))
          .attr("cy", yRangeTime(1))
          .attr("r", 2)
          .style("opacity", 1.0)
        );

    }


    ///////////////////////////////////////

    freqPoints = [];
    freqSticks = [];

    for (var i = 0; i < signalLength; i++)
    {
      freqPoints.push(
        vis.append("svg:rect")
          .attr("stroke", "black")
          .style("stroke-width", 1)
          .attr("fill",  "black")
          .attr("x", xRange(i) - 2)
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
          .attr("stroke", "black")
          .style("opacity", 0.20)
      );
    }


    function updateSignal()
    {
      for (var i = 0; i < signalLength; i++)
      {
        var value = i < signal.length ? signal[i] : 0.0;

        signalPoints[i]
          .attr("cx", xRange(i))
          .attr("cy", yRangeTime(value));
      }
    }

    updateSignal();

    var signalFx = d3.svg.line()
      .x(function (d, i) { return xRange(i)})
      .y(function (d, i) { return yRangeTime(Math.sin(d * 2) * 1.5); })
      .interpolate('basis');

    sigRange.push(0);

    var signalPath = vis.append('svg:path')
      .attr("stroke-width", 2.0)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", 0.3)
      .attr("d", signalFx(sigRange));


    function updateMagnitudes()
    {
      var magnitudes = doFFT();

      for (var i = 0; i < signalLength; i++)
      {
        freqPoints[i]
          .attr("x", xRange(i) - 1.5)
          .attr("y", yRange(magnitudes[i]) - 1);

        freqSticks[i]
          .attr("x1", xRange(i))
          .attr("y1", yRange(0))
          .attr("x2", xRange(i))
          .attr("y2", yRange(magnitudes[i]));
      }
    }

  updateMagnitudes();

  // vis.append("text")
  //   .attr("text-anchor", "end")
  //   .attr("x", plotWidth)
  //   .attr("y", yRange(-0.5))
  //   .style("font-size", "11px")
  //   .text("Frequency (Hz)");

  vis.append("text")
    .attr("text-anchor", "begin")
    .attr("x", 10)
    .attr("y", yRangeTime(1.5))
    .style("font-size", "11px")
    //.style("font-weight", "bold")
    .text("Time Domain");

  vis.append("text")
    .attr("text-anchor", "begin")
    .attr("x", 10)
    .attr("y", yRange(4.3))
    .style("font-size", "11px")
    //.style("font-weight", "bold")
    .text("Frequency Domain");

  vis.append("text")
    .attr("text-anchor", "begin")
    .attr("x", 10)
    .attr("y", yRange(3.9))
    .style("font-size", "11px")
    .style("stroke", "none")
    .style("fill", "#666")
    .text("FFT of Input Signal");

  }


function update()
{
  if (signalLength != FFT_SIZE)
  {
    signalLength = FFT_SIZE;
    d3.select('#zeropadding').selectAll("*").remove();
    drawEverything();
  }
}

drawEverything();

d3.timer(update, 100);

}) ();
