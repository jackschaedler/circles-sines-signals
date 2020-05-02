var ALIAS_FREQUENCY = (function() {

var canvasWidth = 650;
var canvasHeight = 125;
var MARGINS =
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

var vis = d3.select('#sineListen');

var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

var currentFrequency = 440;

var xRange = d3.scale.log().range([MARGINS.left, plotWidth]);
var yRange = d3.scale.linear().range([250 - 80, 50]);

xRange.domain([20, 22050]);
yRange.domain([0.0, 1.2]);

var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(3)
  .tickValues([22.5, 55, 110, 220, 440, 880, 2000, 4000, 8000, 12000, 22050])
  //.ticks()
  .tickFormat(d3.format(",.0f"))
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

vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", 5)
  .attr("y", yRange(1.2))
  .style("font-size", "12px")
  .text("Magnitude");

var freqText = vis.append("text")
  .attr("text-anchor", "begin")
  .attr("x", xRange(currentFrequency) + 8)
  .attr("y", yRange(1.0))
  .attr("font-weight", "bold")
  .style("font-size", "12px")
  .text("Frequency: ");

vis.append("text")
  .attr("text-anchor", "end")
  .attr("x", xRange(20000))
  .attr("y", yRange(-0.38))
  .style("font-size", "12px")
  .text("Frequency (Hz)");


vis.append("svg:line")
  .attr("x1", xRange(20))
  .attr("y1", yRange(-0.35))
  .attr("x2", xRange(4180))
  .attr("y2", yRange(-0.35))
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .style("opacity", 0.8)
  //.style("stroke-dasharray", ("5, 1"))
  ;

vis.append("svg:line")
  .attr("x1", xRange(20))
  .attr("y1", yRange(-0.35) - 5)
  .attr("x2", xRange(20))
  .attr("y2", yRange(-0.35) + 5)
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .style("opacity", 0.8)
  //.style("stroke-dasharray", ("5, 1"))
  ;

vis.append("svg:line")
  .attr("x1", xRange(4180))
  .attr("y1", yRange(-0.35) - 5)
  .attr("x2", xRange(4180))
  .attr("y2", yRange(-0.35) + 5)
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .style("opacity", 0.8)
  //.style("stroke-dasharray", ("5, 1"))
  ;

vis.append("text")
  .attr("text-anchor", "middle")
  .attr("x", 270)
  .attr("y", yRange(-0.5))
  .style("font-size", "11px")
  .style("font-weight", "normal")
  .text("88 Key Piano");


var freqLine = vis.append("line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1.0); })
  .attr("stroke-width", 2)
  .attr("stroke", "steelblue")
  .style("opacity", 0.70)
  ;

var freqSample = vis.append("svg:rect")
  .attr("stroke", "steelblue")
  .style("stroke-width", 1)
  .attr("fill", "steelblue")
  .attr("x", xRange(currentFrequency) - 2)
  .attr("y", yRange(1.0) + 0.5)
  .attr("width", 4)
  .attr("height", 4)
  ;


var freqLineAlias = vis.append("line")
  .attr("x1", function(d, i) { return xRange(currentFrequency); })
  .attr("y1", function(d, i) { return yRange(0);} )
  .attr("x2", function(d, i) { return xRange(currentFrequency); })
  .attr("y2", function(d, i) { return yRange(1.0); })
  .attr("stroke-width", 2)
  .attr("stroke", "grey")
  .style("opacity", 0.00)
  ;

var freqSampleAlias = vis.append("svg:rect")
  .attr("stroke", "grey")
  .style("stroke-width", 1)
  .attr("fill", "grey")
  .attr("x", xRange(currentFrequency) - 2)
  .attr("y", yRange(1.0) + 0.5)
  .attr("width", 4)
  .attr("height", 4)
  .style("opacity", 0.00)
  ;


var notes =
[
  {note: "C1", freq: 32.7},
  {note: "C2", freq: 65},
  {note: "C3", freq: 131},
  {note: "C4", freq: 261.6},
  {note: "C5", freq: 523},
  {note: "C6", freq: 1046},
  {note: "C7", freq: 2093},
];

for (var i = 0; i < notes.length; i++)
{
  vis.append("svg:line")
  .attr("x1", xRange(notes[i].freq))
  .attr("y1", yRange(0) + 20)
  .attr("x2", xRange(notes[i].freq))
  .attr("y2", yRange(0))
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .style("opacity", 0.4)
  .style("stroke-dasharray", ("5, 1"))
  ;

  vis.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xRange(notes[i].freq))
    .attr("y", yRange(0) + 31)
    .style("font-size", "11px")
    .style("font-weight", "bold")
    .attr("stroke", "none")
    .attr("fill", "#aaa")
    .text(notes[i].note);
}


var currentListenFreq = 440;
function GET_LISTEN_FREQ() {
  return currentListenFreq;
}

var LISTEN_FREQ = 440;
var TARGET_FREQ = 440;
var FREQ_INTERPOLATION = 1.0;
var FREQ_INTERPOLATOR = d3.interpolateNumber(LISTEN_FREQ, TARGET_FREQ);

function GET_LISTEN_FREQUENCY() {
  return FREQ_INTERPOLATOR(Math.min(FREQ_INTERPOLATION, 1.0));
}
function updateFrequency(freq) {
  freq = Math.min(freq, 22050);
  LISTEN_FREQ = GET_LISTEN_FREQUENCY();
  TARGET_FREQ = freq;
  FREQ_INTERPOLATION = 0.0;
  FREQ_INTERPOLATOR = d3.interpolateNumber(LISTEN_FREQ, TARGET_FREQ);
}

var IsPlayingSound = false;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain ? audioCtx.createGain() : audioCtx.createGainNode();
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0.00;

var oscillator = audioCtx.createOscillator();
currentTime = audioCtx.currentTime;
oscillator.connect(gainNode);
oscillator.frequency.value = GET_LISTEN_FREQ();
oscillator.type = "sine";
oscillator.start(currentTime);


vis.on("mousedown", mouseDown);
vis.on("mouseup", mouseUp);
vis.on("mousemove", mouseMove);


function toggleSound()
{
  audioCtx.resume();
  gainNode.gain.value = IsPlayingSound ? 0.00 : 0.05;
  IsPlayingSound = !IsPlayingSound;
  soundToggle.text(IsPlayingSound ? "Mute Sound" : "Play Sound");
}

var soundToggle = d3.select('#animatedWrapper').insert("button", ":first-child")
  .text("Play Sound")
  .style("position", "absolute")
  .style("top", 10)
  .style("left", 560)
  .style("height", 25)
  .on("click", toggleSound);


var mouseIsDown = false;

function mouseDown()
{
  mouseIsDown = true;
  movePoint(d3.mouse(this));
}

function mouseUp()
{
  mouseIsDown = false;
}

function mouseMove()
{
  if (mouseIsDown)
  {
    movePoint(d3.mouse(this));
  }
}

function movePoint(e)
{
  xComponent = e[0];
  yComponent = e[1];

  updateFrequency(xRange.invert(xComponent));
}

function update()
{
  FREQ_INTERPOLATION += 0.2;

  currentFrequency = GET_LISTEN_FREQUENCY();
  oscillator.frequency.value = currentFrequency;

  freqText
    .text("Freq: " + currentFrequency.toFixed() + " Hz")
    .attr("x", xRange(currentFrequency) + 8);


  freqLine
    .attr("x1", function(d, i) { return xRange(currentFrequency); })
    .attr("x2", function(d, i) { return xRange(currentFrequency); })
    ;

  freqSample
    .attr("x", xRange(currentFrequency) - 2);
}

d3.timer(update, 50);


}) ();
