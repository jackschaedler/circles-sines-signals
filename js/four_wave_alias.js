var FOUR_WAVE_ALIAS = (function() {

var canvasWidth = 250;
var canvasHeight = 65;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth * 2]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);
var yRange2 = d3.scale.linear().range([plotHeight * 2, plotHeight]);
var yRange3 = d3.scale.linear().range([plotHeight * 3, plotHeight * 2]);
var yRange4 = d3.scale.linear().range([plotHeight * 4, plotHeight * 3]);


xRange.domain([0, Math.PI * 8]);
yRange.domain([-1.4, 1.4]);
yRange2.domain([-1.4, 1.4]);
yRange3.domain([-1.4, 1.4]);
yRange4.domain([-1.4, 1.4]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxis2 = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxis3 = d3.svg.axis()
  .scale(xRange)
  .tickSize(0)
  .ticks(0)
  .tickSubdivide(true);

var xAxis4 = d3.svg.axis()
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

var yAxis2 = d3.svg.axis()
  .scale(yRange2)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var yAxis3 = d3.svg.axis()
  .scale(yRange3)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var yAxis4 = d3.svg.axis()
  .scale(yRange4)
  .tickSize(0)
  .ticks(0)
  .orient('left')
  .tickSubdivide(true);

var vis = d3.select('#fourWaveAlias');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight / 2) + ')')
  .style('opacity', 0.35)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((plotHeight / 2) + plotHeight) + ')')
  .style('opacity', 0.35)
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((plotHeight / 2) + plotHeight * 2) + ')')
  .style('opacity', 0.35)
  .call(xAxis);
 
 vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + ((plotHeight / 2) + plotHeight * 3) + ')')
  .style('opacity', 0.35)
  .call(xAxis);


var samplingBoxHeight = yRange(-1.1) - yRange(1.1) + 1;
var samplingBoxWidth = 3;
var samplingBoxX = xRange(Math.PI * 4) - 4;

var vector = vis.append("line")
  .attr("x1", samplingBoxX + 3.0)
  .attr("y1", 0)
  .attr("x2", samplingBoxX + 3.0)
  .attr("y2", plotHeight * 4)
  .attr("stroke-width", 1.0)
  .attr("stroke", "grey")
  .style("stroke-linecap", "round")
  .attr('opacity', 0.8);

var path = vis.append('svg:path')
  .attr("stroke-width", 2)
  .attr("stroke", "#225ea8")
  .attr("fill", "none")
  .attr("opacity", 0.75);

var path2 = vis.append('svg:path')
  .attr("stroke-width", 2)
  .attr("stroke", "#1d91c0")
  .attr("fill", "none")
  .attr("opacity", 0.75);

var path3 = vis.append('svg:path')
  .attr("stroke-width", 2)
  .attr("stroke", "#7fcdbb")
  .attr("fill", "none")
  .attr("opacity", 0.75);

var path4 = vis.append('svg:path')
  .attr("stroke-width", 2)
  .attr("stroke", "#fc8d59")
  .attr("fill", "none")
  .attr("opacity", 0.75);


var ghostPath = vis.append('svg:path')
  .attr("stroke-width", 2.5)
  .attr("stroke", "#225ea8")
  .attr("fill", "none")
  .attr("opacity", 0.15);

var ghostPath2 = vis.append('svg:path')
  .attr("stroke-width", 2.5)
  .attr("stroke", "#1d91c0")
  .attr("fill", "none")
  .attr("opacity", 0.15);

var ghostPath3 = vis.append('svg:path')
  .attr("stroke-width", 2.5)
  .attr("stroke", "#7fcdbb")
  .attr("fill", "none")
  .attr("opacity", 0.15);

var ghostPath4 = vis.append('svg:path')
  .attr("stroke-width", 2.5)
  .attr("stroke", "#fc8d59")
  .attr("fill", "none")
  .attr("opacity", 0.15);


var cyclesPerSample = 200;
var pxPerCycle = 0.625 / 2;
var rateLength = cyclesPerSample * pxPerCycle;

var rateRect = vis.append("rect")
  .attr("x", samplingBoxX - rateLength)
  .attr("y", 0)
  .attr("width", rateLength)
  .attr("height", plotHeight * 4)
  .attr("fill", 'grey')
  .attr("stroke", 'none')
  .attr("opacity", 0.15);

var rateText = vis.append('text')
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", 280)
  .attr("font-size", 12)
  .text("Sampling Rate: 2 Hz");

var periodText = vis.append('text')
  .attr("text-anchor", "end")
  .attr("x", plotWidth)
  .attr("y", 294)
  .attr("font-size", 12)
  .text("Sampling Period: 1/2 Second");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", 2)
  .attr("y", 5)
  .style('opacity', 0.5)
  .text("1 Hz");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", 2)
  .attr("y", plotHeight * 1 + 5)
  .style('opacity', 0.5)
  .text("2 Hz");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", 2)
  .attr("y", plotHeight * 2 + 5)
  .style('opacity', 0.5)
  .text("3 Hz");

vis.append('text')
  .attr("text-anchor", "begin")
  .attr("x", 2)
  .attr("y", plotHeight * 3 + 5)
  .style('opacity', 0.5)
  .text("4 Hz");


var sine = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) { return yRange(-Math.sin(d + time)); });

var sine2 = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) { return yRange2(-Math.sin(d * 2 + time * 2)); });

var sine3 = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) { return yRange3(-Math.sin(d * 3 + time * 3)); });

var sine4 = d3.svg.line()
  .x(function (d, i) { return xRange(d)})
  .y(function (d, i) { return yRange4(-Math.sin(d * 4 + time * 4)); });


var ghostSine = d3.svg.line()
  .x(function (d, i) { return xRange(d + Math.PI * 2)})
  .y(function (d, i) { return yRange(-Math.sin(d + time)); });

var ghostsine2 = d3.svg.line()
  .x(function (d, i) { return xRange(d + Math.PI * 2)})
  .y(function (d, i) { return yRange2(-Math.sin(d * 2 + time * 2)); });

var ghostsine3 = d3.svg.line()
  .x(function (d, i) { return xRange(d + Math.PI * 2)})
  .y(function (d, i) { return yRange3(-Math.sin(d * 3 + time * 3)); });

var ghostsine4 = d3.svg.line()
  .x(function (d, i) { return xRange(d + Math.PI * 2)})
  .y(function (d, i) { return yRange4(-Math.sin(d * 4 + time * 4)); });


var time = 0.0;
var cycles = 0;

var samples = [];
var samples2 = [];
var samples3 = [];
var samples4 = [];

var wasSettingAliasRate = false;

function draw() {

  if (SETTING_ALIAS_RATE)
  {
    while (samples.length > 0)
    {
      samples.shift().remove();
      samples2.shift().remove();
      samples3.shift().remove();
      samples4.shift().remove();
    }

    wasSettingAliasRate = true;
    cycles = 0;
    time /= 2.0;

    path.attr('d', sine(d3.range(0, Math.PI * 4, 0.1)));
    path2.attr('d', sine2(d3.range(0, Math.PI * 4, 0.1)));
    path3.attr('d', sine3(d3.range(0, Math.PI * 4, 0.1)));
    path4.attr('d', sine4(d3.range(0, Math.PI * 4, 0.1)));

    ghostPath.attr('d', ghostSine(d3.range(0, Math.PI * 6, 0.1)));
    ghostPath2.attr('d', ghostsine2(d3.range(0, Math.PI * 6, 0.1)));
    ghostPath3.attr('d', ghostsine3(d3.range(0, Math.PI * 6, 0.1)));
    ghostPath4.attr('d', ghostsine4(d3.range(0, Math.PI * 6, 0.1)));

    var samplingRateText = "";
    var samplingPeriodText = "";

    if (NEW_ALIAS_RATE_AVAILABLE)
    {
      if (ALIAS_RATE == 4)
      {
        cyclesPerSample = 200;
        samplingRateText = "2 Hz";
        samplingPeriodText = "1/2 Second";

      }
      if (ALIAS_RATE == 3)
      {
        cyclesPerSample = 100;
        samplingRateText = "4 Hz";
        samplingPeriodText = "1/4 Second";
      }
      if (ALIAS_RATE == 2)
      {
        cyclesPerSample = 50;
        samplingRateText = "8 Hz";
        samplingPeriodText = "1/8 Second";
      }
      if (ALIAS_RATE == 1)
      {
        cyclesPerSample = 25;
        samplingRateText = "16 Hz";
        samplingPeriodText = "1/16 Second";
      }

      rateText.text("Sampling Rate: " + samplingRateText);
      periodText.text("Sampling Period: " + samplingPeriodText);

      rateLength = cyclesPerSample * pxPerCycle;

      var currentRateLength = (1 - (cycles / cyclesPerSample)) * rateLength;

      rateRect
        .attr("x", samplingBoxX - currentRateLength + 4)
        .attr("width", currentRateLength)
        .attr("opacity", 0.15);

      NEW_ALIAS_RATE_AVAILABLE = false;
    }

    return;
  }

  if (wasSettingAliasRate)
  {
    wasSettingAliasRate = false;
    time = 0;
  }

  path.attr('d', sine(d3.range(0, Math.PI * 4, 0.1)));
  path2.attr('d', sine2(d3.range(0, Math.PI * 4, 0.1)));
  path3.attr('d', sine3(d3.range(0, Math.PI * 4, 0.1)));
  path4.attr('d', sine4(d3.range(0, Math.PI * 4, 0.1)));

  ghostPath.attr('d', ghostSine(d3.range(0, Math.PI * 6, 0.1)));
  ghostPath2.attr('d', ghostsine2(d3.range(0, Math.PI * 6, 0.1)));
  ghostPath3.attr('d', ghostsine3(d3.range(0, Math.PI * 6, 0.1)));
  ghostPath4.attr('d', ghostsine4(d3.range(0, Math.PI * 6, 0.1)));

  for (i = samples.length - 1; i >= 0; i--)
  {
    var currentX = parseFloat(samples[i].attr('cx'));

    if (currentX > 600)
    {
      samples.shift().remove();
      samples2.shift().remove();
      samples3.shift().remove();
      samples4.shift().remove();
    }
    else
    {
      samples[i].attr('cx', currentX + pxPerCycle);
      samples2[i].attr('cx', currentX + pxPerCycle);
      samples3[i].attr('cx', currentX + pxPerCycle);
      samples4[i].attr('cx', currentX + pxPerCycle);
    }
  }

  var currentRateLength = (1 - (cycles / cyclesPerSample)) * rateLength;

  rateRect
    .attr("x", samplingBoxX - currentRateLength + 4)
    .attr("width", currentRateLength)
    .attr("opacity", 0.15);

  if (cycles === cyclesPerSample)
  {
    samples.push(vis.append('svg:circle')
      .attr('cx', samplingBoxX + 3.5)
      .attr('cy', yRange(-Math.sin(time)))
      .attr('r', 2.0)
      .attr('stroke-width', 1.5)
      .attr('stroke', '#225ea8')
      .attr('fill', '#225ea8')
      .attr('opacity', 1));

    samples2.push(vis.append('svg:circle')
      .attr('cx', samplingBoxX + 3.5)
      .attr('cy', yRange2(-Math.sin(time * 2)))
      .attr('r', 2.0)
      .attr('stroke-width', 1.5)
      .attr('stroke', '#1d91c0')
      .attr('fill', '#1d91c0')
      .attr('opacity', 1));

    samples3.push(vis.append('svg:circle')
      .attr('cx', samplingBoxX + 3.5)
      .attr('cy', yRange3(-Math.sin(time * 3)))
      .attr('r', 2.0)
      .attr('stroke-width', 1.5)
      .attr('stroke', '#7fcdbb')
      .attr('fill', '#7fcdbb')
      .attr('opacity', 1));

    samples4.push(vis.append('svg:circle')
      .attr('cx', samplingBoxX + 3.5)
      .attr('cy', yRange4(-Math.sin(time * 4)))
      .attr('r', 2.0)
      .attr('stroke-width', 1.5)
      .attr('stroke', '#fc8d59')
      .attr('fill', '#fc8d59')
      .attr('opacity', 1));

    cycles = 0;
  }

  time -= Math.PI * 2 / 400;
  cycles++;
}

d3.timer(draw, 100);

}) ();