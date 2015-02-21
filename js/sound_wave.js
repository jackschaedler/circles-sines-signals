var PHYSICAL_WAVE = (function() {

  var canvasWidth = 600;
  var canvasHeight = 75;
  var MARGINS =
    {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

  var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
  var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

  var xRangePhys = d3.scale.linear().range([-1, 1]);

  xRangePhys.domain([-1.0, 1.0]);

  var vis = d3.select('#physicalWave');

  var rect = vis.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 40)
    .attr("height", plotHeight)
    .attr("fill", 'black')
    .attr("opacity", 0.75)
    ;

  var molecules = [];
  var orig_x = [];

  var pressureX = [];
  var pressureY = [];

  sinePressure = d3.svg.line()
    .x(function (d, i) { return pressureX[d]; })
    .y(function (d, i) { return pressureY[d]; });

  var pressurePath = vis.append('svg:path')
    .attr("stroke-width", 2.0)
    .attr("stroke", "steelblue")
    .attr("fill", "none")
    .style("opacity", 1.0);

  vis.append("line")
    .attr("x1", 25)
    .attr("y1", 150)
    .attr("x2", plotWidth)
    .attr("y2", 150)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .style("opacity", 0.40);

  vis.append("line")
    .attr("x1", 25)
    .attr("y1", 100)
    .attr("x2", 25)
    .attr("y2", 200)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .style("opacity", 0.40);

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", plotWidth / 2 + 20)
    .attr("y", 100)
    .style('opacity', 1.0)
    .style("font-size", 11)
    .text("Plot of Air Pressure");

    vis.append("text")
    .attr("text-anchor", "end")
    .attr("x", 20)
    .attr("y", 105)
    .style('opacity', 0.8)
    .text("High");

    vis.append("text")
    .attr("text-anchor", "end")
    .attr("x", 20)
    .attr("y", 155)
    .style('opacity', 0.8)
    .text("0");

    vis.append("text")
    .attr("text-anchor", "end")
    .attr("x", 20)
    .attr("y", 200)
    .style('opacity', 0.8)
    .text("Low");


  for (i = 0; i < 400; i++)
  {
    var moleculeX = (i / 400) * plotWidth + 25;
    var moleculeY = Math.random() * (plotHeight - 10) + 5;
    var color = 'grey';

    molecules.push(
      vis.append('svg:circle')
      .attr('cx', moleculeX)
      .attr('cy', moleculeY)
      .attr('r', 2.0)
      .attr('stroke', 'none')
      .attr('fill', color)
      //.attr('opacity', Math.random() + 0.75)
      )
    ;

    orig_x.push(moleculeX);
    pressureX.push(moleculeX);
    pressureY.push(0);
  }

  var moleculeTime = 0;

  function updateMolecules() {
    var phaseShift = 0;
    var amp = GET_WAVE_AMPLITUDE() * 14 + 1;

    for (i = 0; i < molecules.length; i++)
    {
      molecules[i]
        .attr('cx', orig_x[i] + xRangePhys(Math.sin(moleculeTime + phaseShift)) * amp);
      phaseShift -= 0.1;
      pressureY[i-12] = Math.sin(moleculeTime + phaseShift) * 3 * amp + 150;
    }

    pressurePath
      .attr('d', sinePressure(d3.range(0, 385, 2)));

    rect.attr("x", xRangePhys(Math.sin(moleculeTime)) * amp - 20);
    WAVE_INTERPOLATION += 0.1;
    WAVE_AMP_INTERPOLATION += 0.1;

    moleculeTime += GET_WAVE_FREQUENCY();
  }

  d3.timer(updateMolecules, 100);
}) ();
