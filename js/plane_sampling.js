var PLANE_2 = (function() {
var lineData = [
  {x: 0, y: 0}
, {x: 10, y: 6000}
, {x: 20, y: 15000}
, {x: 30, y: 20000}
, {x: 40, y: 35000}
, {x: 50, y: 32000}
, {x: 60, y: 31000}
, {x: 65, y: 28000}
, {x: 70, y: 31000}
, {x: 80, y: 28000}
, {x: 90, y: 12000}
, {x: 100, y: 3500}
, {x: 110, y: 1200}
, {x: 120, y: 0}
];

var canvasWidth = 700;
var canvasHeight = 150;
var MARGINS =
  {
    top: 5,
    right: 10,
    bottom: 2,
    left: 40
  };
var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

xRange.domain([0, d3.max(lineData, function(d) { return d.x; })]);
var yMax = d3.max(lineData, function(d) { return d.y; });
yMax = yMax + (yMax * 0.1);
yRange.domain([0, d3.max(lineData, function(d) { return d.y; })]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(1)
  .tickSubdivide(true);

var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(1)
  .ticks(3)
  .orient('left')
  .tickSubdivide(true);


var line = d3.svg.line()
  .x(function(d) {return xRange(d.x);})
  .y(function(d) {return yRange(d.y);})
  .interpolate('cardinal');


var vis = d3.select('#plane2');

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (plotHeight - 0.5) + ')')
  .style('opacity', 0.6)
  .call(xAxis);
 
vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .style('opacity', 0.6)
  .call(yAxis);

var path = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 3)
  .attr('fill', 'none')
  .style('opacity', 0.00);

var pathFollower = vis.append('svg:path')
  .attr('d', line(lineData))
  .attr('stroke', 'white')
  .attr('stroke-width', 4)
  .attr('fill', 'none')
  .style('opacity', 0.00);

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", 110)
  .attr("y", 10)
  .style('opacity', 0.6)
  .text("Altitude (feet)");

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", plotWidth / 2)
  .attr("y", 175)
  .style('opacity', 0.6)
  .text("Time (minutes)");



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

var num_samples = 13; //8

var sampleDelays = [0, 800, 1650, 2450, 3500, 4300, 5000, 5750, 6500, 7700, 8600, 9300, 10000]; 

var points = vis.selectAll(".point")
  .data(d3.range(num_samples))
  .enter().append("svg:circle")
    .attr("stroke", "none")
    .style("stroke-width", 1.5)
    .attr("fill", "steelblue")
    .attr("cx", function(d, i) { return xRange(d * 10); } )
    .attr("cy", function(d, i) { 
      return findYatXbyBisection(xRange(d * 10), path.node(), 0.1);})
    .attr("r", function(d, i) { return 2.5 })
    .style('opacity', 0.0)
    ;

var sticks = vis.selectAll(".sticks")
  .data(d3.range(num_samples))
  .enter().append("line")
    .attr("x1", function(d, i) { return xRange(d * 10); })
    .attr("y1", yRange(0))
    //.attr("y1", function(d, i) { return findYatXbyBisection(xRange(d * 10), path.node(), 0.1);} )
    .attr("x2", function(d, i) { return xRange(d * 10); })
    .attr("y2", function(d, i) { return yRange(0); })
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.0)
    .style("stroke-dasharray", ("3, 3"))
    ;


var playButton = d3.select('#animatedWrapper').insert("button", ":first-child")
  .text("▶ Play")
  .style("position", "absolute")
  .style("top", -70)
  .style("left", canvasWidth / 2 - 25)
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

  points
    .style('opacity', 0.0)
      .transition()
      .duration(100)
      .delay(function (d, i) {return sampleDelays[i];})
      .style('opacity', 1.0);

  sticks
    .style("opacity", 0.0)
    .transition()
      .duration(0)
      .delay(function (d, i) { return sampleDelays[i]; })
      .attr("y1", function(d, i) { return findYatXbyBisection(xRange(d * 10), path.node(), 0.1);} )
      .style("opacity", 0.6)
    ;

  isPlaying = true;
  updateButtons();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .style("opacity", 1.0)
    .transition()
      .duration(10000)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
      //.each("end", finish)
      ; 

  pathFollower 
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .style("opacity", 0.80)
    .transition()
      .duration(10000)
      .delay(100)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
      .each("end", finish); 


  isPlaying = true;
  updateButtons();
}


var totalLength = path.node().getTotalLength(); 


function finish()
{
  path
    .transition()
      .duration(2000)
      .style("opacity", 0)
      .each("end", prepareForRestart);
}

function prepareForRestart()
{
  isPlaying = false;
  updateButtons();
}

}) ();
