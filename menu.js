var menuoptions =
[
  ["Introduction", "index.html"],
  ["Signals", "signals.html"],
  ["Discrete Signals", "discrete_signals.html"],
  ["Aliasing", "aliasing.html"],
  ["Sound", "sound.html"],
  ["Timbre", "sound2.html"],
  ["Sine & Cosine", "sincos.html"],
  ["Trigonometry Review", "trig_review.html"],
  ["The Sampling Theorem", "sampling.html"],
  ["Nyquist Frequency", "sampling2.html"],
  ["Wagon Wheel Effect", "sampling4.html"],
  ["Sine Wave Aliasing", "sampling3.html"],
  ["Representation & Transforms", "coordinates.html"],
  ["The Fourier Transform", "dft_introduction.html"],
  ["Notation", "notation.html"],
  ["Complex Numbers", "complex.html"],
  ["Euler’s Formula", "euler.html"],
  ["The Dot Product", "dotproduct.html"],
  ["Correlation", "dotproduct2.html"],
  ["Correlation With Sine", "dotproduct3.html"],
  ["Correlation With Sine and Cosine", "dotproduct4.html"],
  ["Discrete Fourier Transform Example", "dft_walkthrough.html"],
  ["Digging Deeper", "dft_deeper.html"],
  ["The DFT & Frequency", "dft_frequency.html"],
  ["Leakage", "dft_leakage.html"],
  ["Zero Padding", "zeropadding.html"],
  ["Sine Wave Properties", "sine_wave_properties.html"],
  //["Convolution", "convolution.html"],
  ["The Fast Fourier Transform", "fft.html"],
  ["Conclusion", "conclusion.html"]
];

var currentIndex;
for (var i = 0; i < menuoptions.length; i++)
{
  var pathArray = location.pathname.substring(1).split("/");
  var currentPage = pathArray[pathArray.length - 1];
  var className = currentPage === menuoptions[i][1]
    ? 'sectionButton current'
    : 'sectionButton';

  var style = currentPage === menuoptions[i][1]
    ? "color: #bbb"
    : "";

  if (currentPage === menuoptions[i][1])
  {
    currentIndex = i;
  }

  var divvy = d3.select("#menu").append("div")
    .attr('class', className)
      .append("a")
      .attr('href', menuoptions[i][1])
      .attr("style", style)
      .text(menuoptions[i][0].toUpperCase());
    //.text(menuoptions[i].toUpperCase());
}


var titleContents =
'<div style="color: #ddd; font-size: 22px">SEEING <span style="color:rgb(93,217,241)">CIRCLES</span>, <span style="color:rgb(243,48,110);">SINES</span>, AND <span style="color:rgb(232,218,106);">SIGNALS</span><!--<svg id="phasortitle" class="svgWithText" width="500" height="20" style="display: inline">--></svg></div><div class="subheader" style="margin-top: 0px; color: #888; font-size: 18px; width: 800px">A COMPACT PRIMER ON DIGITAL SIGNAL PROCESSING<span id="icons" style="margin-left: 10"></span></div>';

document.getElementById('titleinfo').innerHTML = titleContents;

document.getElementById('icons').innerHTML = 
'<span class="icon-twitter bigicon" style="color: #aaa; cursor: pointer;" onclick="window.open(\'http://www.twitter.com/jackschaedler\');"> <span style="font-size:10px; color: #555"></span></span><span class="icon-github-circled bigicon" style="color: #aaa; cursor: pointer" onclick="window.open(\'http://www.github.com/jackschaedler/circles-sines-signals\');"><span style="font-size:10px; padding-left: 4px; color: #555"></span></span>';

if (document.getElementById('footer') != null)
{
  document.getElementById('footer').innerHTML = '<div class="footerbutton" style=""><a href="' + menuoptions[currentIndex + 1][1] + '">NEXT <span style="font-size: 12px">▶</span></a></div>';
}

