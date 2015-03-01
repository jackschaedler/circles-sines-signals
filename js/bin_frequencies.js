var BIN_FREQUENCIES = (function() {

    var signalLength = N;

    var canvasWidth = 700;
    var canvasHeight = 125;
    var MARGINS =
      {
        top: 0,
        right: 0,
        bottom: 0,
        left: 5
      };

    var vis = d3.select('#binfrequencies');

    var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
    var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

    var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
    var yRange = d3.scale.linear().range([50, 0]);

    xRange.domain([0, signalLength]);
    yRange.domain([0.0, 4]);

    var xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(3)
      .ticks(0)
      .tickSubdivide(true);

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + yRange(0) + ')')
      .style("opacity", 0.65)
      .call(xAxis);
     
    vis.append("svg:line")
      .attr("x1", xRange(signalLength / 2) + 0.5)
      .attr("y1", yRange(-0.5))
      .attr("x2", xRange(signalLength / 2) + 0.5)
      .attr("y2", yRange(4))
      .attr("stroke-width", 1)
      .attr("stroke", "grey")
      .style("opacity", 0.7)
      .style("stroke-dasharray", ("5, 1"));

    vis.append("text")
      .attr("text-anchor", "middle")
      .attr("x", xRange(signalLength / 2) + 5)
      .attr("y", yRange(0) + 20)
      .style("font-size", "11px")
      .style("font-weight", "normal")
      .style("opacity", 0.7)
      .text("Nyquist Limit");

    freqPoints = [];
    freqTexts = [];

    for (var i = 0; i < signalLength; i++)
    {
      freqPoints.push(
        vis.append("svg:rect")
          .attr("stroke", "black")
          .style("stroke-width", 1)
          .attr("fill",  "black")
          .attr("x", xRange(i) - 1.5)
          .attr("y", yRange(0) - 1.5)
          .attr("width", 4)
          .attr("height", 4)
          .style("opacity", 1.0)
        );

      var frequency = i * 8 / signalLength;

      freqTexts.push(
        vis.append("text")
        .attr("text-anchor", "begin")
        .attr("x", xRange(i))
        .attr("y", yRange(1))
        .style("font-size", "11px")
        .attr("stroke", "none")
        .attr("fill", "#555")
        .text(frequency + "Hz")
      );
    }


  vis.append("text")
    .attr("text-anchor", "end")
    .attr("x", plotWidth)
    .attr("y", yRange(0) + 15)
    .style("font-size", "11px")
    .text("Frequency (Hz)");


function update()
{
  if (signalLength != N)
  {
    signalLength = N;

    document.getElementById("inputSamples").innerHTML = "N = <b>" + signalLength + "</b><br/><sub>(Number of Input Samples)</sub>";

    for (var i = 0; i < freqPoints.length; i++)
    {
      freqPoints[i].remove();
      freqTexts[i].remove();
    }

    freqPoints = [];
    freqTexts = [];

    xRange.domain([0, signalLength]);

    for (var i = 0; i < signalLength; i++)
    {
      freqPoints.push(
        vis.append("svg:rect")
          .attr("stroke", "black")
          .style("stroke-width", 1)
          .attr("fill",  "black")
          .attr("x", xRange(i) - 1.5)
          .attr("y", yRange(0) - 1.5)
          .attr("width", 4)
          .attr("height", 4)
          .style("opacity", 1.0)
        );


      var frequency = i * 8 / signalLength;

      freqTexts.push(
        vis.append("text")
        .attr("text-anchor", "begin")
        .attr("x", xRange(i))
        .attr("y", yRange(1))
        .style("font-size", "11px")
        .attr("stroke", "none")
        .attr("fill", "#555")
        .text(frequency.toFixed(2) + "Hz")
      );
    }
  }
}

//drawEverything();
d3.timer(update, 100);

}) ();
