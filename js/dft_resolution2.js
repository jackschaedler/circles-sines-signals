var ZEROPADDING = (function() {

  var ZERO_PADDING = true;
  var signalLength = FFT_SIZE2;

  var sineSignal = [];
  var phaseInc = 2 * Math.PI / 128;
  var phase = 0;
  var schedule_update = false;

  for (var i = 0; i < 128; i++, phase += phaseInc)
  {
    sineSignal[i] = Math.sin(5.0 * phase); 
  }

  function drawEverything()
  {
    signalLength = FFT_SIZE2;
    var signalFFTData = new complex_array.ComplexArray(signalLength);

    var signal = [];

    var upperLimit = ZERO_PADDING
      ? 8
      : signalLength;

    for (var i = 0; i < upperLimit; i++)
    {
      signal.push(sineSignal[i]);
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

    var vis = d3.select('#dftresolution');

    var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
    var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

    var yRangeTime = d3.scale.linear().range([190, 70]);
    yRangeTime.domain([-1.5, 1.5]);

    var sampleData = d3.range(0, 2 * Math.PI, 2 * Math.PI / 12);

    var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
    var yRange = d3.scale.linear().range([400 - 40, 280 - 40]);

    xRange.domain([0, signalLength]);
    yRange.domain([0.0, 5]);

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
     
    var magAxis = vis.append('svg:g')
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
      .attr("y", yRange(-1.2))
      .style("font-size", "11px")
      .style("font-weight", "normal")
      .style("opacity", 0.7)
      .text("Nyquist Limit");

    vis.append("svg:line")
      .attr("x1", 27)
      .attr("y1", yRange(0))
      .attr("x2", 27)
      .attr("y2", 242)
      .attr("stroke-width", 2)
      .attr("stroke", "red")
      .style("opacity", 0.3)
      ;

    vis.append("svg:rect")
      .attr("stroke", "red")
      .style("stroke-width", 1)
      .attr("fill",  "red")
      .attr("x", 25.5)
      .attr("y", 239)
      .attr("width", 3)
      .attr("height", 3)
      .style("opacity", 0.3)

    vis.append("svg:line")
      .attr("x1", 33)
      .attr("y1", yRange(0))
      .attr("x2", 33)
      .attr("y2", 242)
      .attr("stroke-width", 2)
      .attr("stroke", "red")
      .style("opacity", 0.3)
      ;

    vis.append("svg:rect")
      .attr("stroke", "red")
      .style("stroke-width", 1)
      .attr("fill",  "red")
      .attr("x", 31.5)
      .attr("y", 239)
      .attr("width", 3)
      .attr("height", 3)
      .style("opacity", 0.3)

    var startPix = xRange(0);
    var endPix = xRange(signalLength);
    var inc = (endPix - startPix) / 16;
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

      freq += 8;
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

    var freqPoints = [];
    var freqSticks = [];

    for (var i = 0; i < signalLength; i++)
    {
      freqSticks.push(
        vis.append("svg:line")
          .attr("x1", xRange(i))
          .attr("y1", yRange(0))
          .attr("x2", xRange(i))
          .attr("y2", yRange(1))
          .attr("stroke-width", 2)
          .attr("stroke", "lightgrey")
          .style("opacity", 1.00)
      );

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

    function updateMagnitudes()
    {
      var magnitudes = doFFT();

      var maxMagnitude = ZERO_PADDING
        ? 5
        : d3.max(magnitudes);

      yRange.domain([0, maxMagnitude]);
      magAxis.call(yAxis);

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

        maxMagnitude = Math.max(maxMagnitude, magnitudes[i]);
      }
    }

  updateMagnitudes();

  // vis.append("text")
  //   .attr("text-anchor", "end")
  //   .attr("x", plotWidth)
  //   .attr("y", 375)
  //   .style("font-size", "11px")
  //   .text("Frequency (Hz)");

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 350)
    .attr("y", yRangeTime(1.5))
    .style("font-size", "11px")
    .text("Time Domain");

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 350)
    .attr("y", yRangeTime(1.2))
    .style("font-size", "11px")
    .style("stroke", "none")
    .style("fill", "#666")
    .text("Input Signal");

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 350)
    .attr("y", 220)
    .style("font-size", "11px")
    .text("Frequency Domain");

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 350)
    .attr("y", 233)
    .style("font-size", "11px")
    .style("stroke", "none")
    .style("fill", "#666")
    .text("DFT of Input Signal (Magnitude)");

  }


function update()
{
  if (signalLength != FFT_SIZE2 || schedule_update)
  {
    schedule_update = false;
    signalLength = FFT_SIZE2;
    d3.select('#dftresolution').selectAll("*").remove();
    drawEverything();
  }
}

drawEverything();

d3.timer(update, 100);

}) ();
