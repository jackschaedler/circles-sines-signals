!function() {

  var EPSILON = 1e-4,
      assert = require('assert'),
      complex_array_lib = require('../lib/complex_array'),
      fft_lib = require('../lib/fft'),
      ComplexArray = complex_array_lib.ComplexArray,
      isComplexArray = complex_array_lib.isComplexArray,
      PI = Math.PI,
      SQRT2 = Math.SQRT2,
      SQRT1_2 = Math.SQRT1_2,
      cos = Math.cos,
      sin = Math.sin,
      sqrt = Math.sqrt

  global.assertComplexArraysAlmostEqual = function(first, second) {
    var message = second + ' != ' + first

    assert.equal(first.length, second.length, message)

    first.forEach(function(value, i) {
      assertApproximatelyEqual(value.real, second.real[i], message)
      assertApproximatelyEqual(value.imag, second.imag[i], message)
    })
  }

  global.assertFFTMatches = function(original, expected) {
    var transformed, copy

    if (!isComplexArray(expected)) {
      throw TypeError('expected match should be a ComplexArray')
    }

    copy = new ComplexArray(original)
    transformed = fft_lib.FFT(original)
    assertComplexArraysAlmostEqual(expected, transformed)
    assertComplexArraysAlmostEqual(copy, fft_lib.InvFFT(transformed))
  }

   global.assertFFTMatchesDFT = function(input) {
    input = new ComplexArray(input)

    assertComplexArraysAlmostEqual(DFT(input), fft_lib.FFT(input))
  }

  global.DFT = function(input) {
    var n = input.length,
        amplitude = 1 / sqrt(n),
        output = new ComplexArray(input),
        phase = {real: 0, imag: 0},
        delta = {real: 0, imag: 0},
        i, j,
        _swap

    if (!isComplexArray(input)) {
      input = new ComplexArray(input)
    }

    for(i = 0; i < n; i++) {
      output.real[i] = 0, output.imag[i] = 0
      phase.real = 1, phase.imag = 0
      delta.real = cos(2*PI*i/n), delta.imag = sin(2*PI*i/n)

      for(j = 0; j < n; j++) {
        output.real[i] += phase.real * input.real[j] - phase.imag * input.imag[j]
        output.imag[i] += phase.real * input.imag[j] + phase.imag * input.real[j]
        _swap = phase.real
        phase.real = phase.real * delta.real - phase.imag * delta.imag
        phase.imag = _swap * delta.imag + phase.imag * delta.real
      }
      output.real[i] *= amplitude
      output.imag[i] *= amplitude
    }

    return output
  }

  function assertApproximatelyEqual(first, second, message) {
    var delta = Math.abs(first - second)
    assert.ok(delta < EPSILON, message)
  }

}()
