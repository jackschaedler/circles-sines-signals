var CONTINUUM = (function() {
var lineData = [
  {x: 0, y: 5}
, {x: 5, y: 8}
, {x: 10, y: 12}
, {x: 15, y: 19}
, {x: 20, y: 23}
, {x: 25, y: 22}
, {x: 30, y: 15}
, {x: 35, y: 7}
, {x: 40, y: 14}
, {x: 45, y: 19}
, {x: 50, y: 20}
, {x: 55, y: 16}
, {x: 60, y: 14}
];

var canvasWidth = 700;
var canvasHeight = 150;
var MARGINS =
  {
    top: 2,
    right: 10,
    bottom: 2,
    left: 40
  };

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

var domainMin = 0;
var domainMax = d3.max(lineData, function(d) { return d.x; });
var rangeMax = d3.max(lineData, function(d) { return d.y + 5; });

xRange.domain([domainMin, domainMax]);
yRange.domain([0, rangeMax]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(1)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  //.tickValues([10000, 20000, 30000])
  .ticks(3)
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#continuum');

var xAx = vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight - 0.5) + ')')
  .style("opacity", 0.6)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .style("opacity", 0.6)
  .call(yAxis);

var path = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'teal')
  .attr('stroke-width', 2.0)
  .attr('fill', 'none')
  .style("opacity", 0.4);

// var intendedPath = vis.append('svg:path')
//   .attr('d', line(lineData))
//   .attr('stroke', 'grey')
//   .attr('stroke-width', 1.5)
//   .attr('fill', 'none')
//   .attr('opacity', 0.25);

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", canvasWidth / 2)
  .attr("y", 175)
  .text("Time (seconds)")
  .style("opacity", 0.75);

var probeRight = vis.append("svg:line")
  .attr("x1", xRange(domainMax))
  .attr("y1", yRange(0))
  .attr("x2", xRange(domainMax))
  .attr("y2", yRange(rangeMax))
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .style("opacity", 1.0);


var playButton = d3.select('#animatedWrapper').insert("button", ":first-child")
  .text("▶ Play")
  .style("position", "absolute")
  .style("top", -40)
  .style("left", canvasWidth / 2 - 10)
  .style("height", 25)
  .on("click", handlePlay);

var isPlaying = false;

function updateButtons()
{
  var className = isPlaying ? "disabled" : "active";
  playButton.attr("class", className); 
}

updateButtons();

function handlePlay()
{
  if (isPlaying)
  {
    return;
  }

  isPlaying = true;
  updateButtons();
  resetToInitialState();
  drawDots();
}

function resetToInitialState()
{
  for (var i = 0; i < dots.length; i++)
  {
    dots[i].remove();
  }

  dots = [];
  domainMax = d3.max(lineData, function(d) { return d.x; });
  xRange.domain([0, domainMax]);
  xAx
      .call(xAxis);

  path
      .attr('d', line(lineData))
      ;
}

var totalLength = path.node().getTotalLength(); 

// function transPath() {
//   path
//     .attr("stroke-dasharray", totalLength + " " + totalLength)
//     .attr("stroke-dashoffset", totalLength)
//     .transition()
//       .duration(20000)
//       .ease("linear")
//       .attr("stroke-dashoffset", 0)
//       .each("end", transPath);  
// };

//transPath(); 

var points = [];
var pointRadius = 5;
var widthInPx = xRange(domainMax) - xRange(domainMin);
var pointsRequired = widthInPx / pointRadius;

var completedPoints = 0;

function finishPoint()
{
  completedPoints++;

  if (completedPoints == pointsRequired)
  {
    completedPoints = 0;
    MoveProbes();
  }
}

var dots = [];
var expansionFactor = 8;
var maxIterations = 4;
var iteration = 0;

function drawDots()
{
  var domainInc = (domainMax - domainMin) / pointsRequired;
  var domainCurrent = domainMin;

  for (var i = 0; i < pointsRequired; i++)
  {
    var yVal = findYatXbyBisection(xRange(domainCurrent), path.node(), 0.1);

    var circle = 
      vis.append("circle")
        .attr("cx", xRange(domainCurrent))
        .attr("cy", yVal)
        .attr("r", pointRadius)
        .attr("stroke", "none")
        .attr("fill", "teal")
        .attr("opacity", 0.0);

    circle
        .transition()
          .duration(200)
          .delay(i * 50)
          .attr("opacity", 1.0)
          //.attr("r", pointRadius)
          .each("end", finishPoint);

    dots.push(circle);

    domainCurrent += domainInc;
  }

  return true;
}

function MoveProbes()
{
  probeRight
    .transition()
    .duration(3000)
      .attr("x1", xRange(domainMax/expansionFactor))
      .attr("x2", xRange(domainMax/expansionFactor))
    .transition()
    .duration(3000)
      .attr("x1", xRange(domainMax))
      .attr("x2", xRange(domainMax));

  domainMax /= expansionFactor;
  xRange.domain([0, domainMax]);
  xAx
    .transition()
    .duration(3000)
    .delay(3000)
      .call(xAxis);

  path
    .transition()
    .duration(3000)
    .delay(3000)
      .attr('d', line(lineData))
      .each('end', nextIteration)
      ;

  for (var i = 0; i < dots.length; i++)
  {
    var currentX = parseFloat(dots[i].attr('cx'));
    var domainX = xRange.invert(currentX);
    var newX = xRange(domainX * expansionFactor);
    dots[i]
      .transition()
      .duration(3000)
      .delay(3000)
        .attr("cx", newX);
  }

  return true;
}

function nextIteration()
{
  iteration++;
  if (iteration == maxIterations)
  {
      isPlaying = false;
      updateButtons();
      return;
  }

  drawDots();
}


//d3.timer(drawDots, 3000);



var findYatXbyBisection = function(x, path, error){
  var length_end = path.getTotalLength()
    , length_start = 0
    , point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
    , bisection_iterations_max = 50
    , bisection_iterations = 0

  error = error || 0.01

  while (x < point.x - error || x > point.x + error) {
    // get the middle point
    point = path.getPointAtLength((length_end + length_start) / 2)

    if (x < point.x) {
      length_end = (length_start + length_end)/2
    } else {
      length_start = (length_start + length_end)/2
    }

    // Increase iteration
    if(bisection_iterations_max < ++ bisection_iterations)
      break;
  }
  return point.y
}

}) ();

