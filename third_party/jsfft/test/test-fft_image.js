require('../lib/fft_image')
require('./test_helper')

var assert = require('assert'),
    fft_lib = require('../lib/fft'),
    complex_array_lib = require('../lib/complex_array'),
    ComplexArray = complex_array_lib.ComplexArray

function randomImageData(n) {
  var array = new Uint8ClampedArray(n),
      i

  for(i = 0; i < n; i++) {
    array[i] = Math.random() * 128
  }
  return array
}

function mergeRGBA(r, g, b, a) {
  var n = r.length,
      output = new Uint8ClampedArray(4 * n),
      i

  for(i = 0; i < n; i++) {
    output[4 * i    ] = r[i]
    output[4 * i + 1] = g[i]
    output[4 * i + 2] = b[i]
    output[4 * i + 3] = a[i]
  }
  return output
}

function mergeComplexRGBA(r, g, b, a) {
  var n = r.length,
      output = new ComplexArray(4 * n),
      i

  for(i = 0; i < n; i++) {
    output.real[4 * i    ] = r.real[i]
    output.imag[4 * i    ] = r.imag[i]
    output.real[4 * i + 1] = g.real[i]
    output.imag[4 * i + 1] = g.imag[i]
    output.real[4 * i + 2] = b.real[i]
    output.imag[4 * i + 2] = b.imag[i]
    output.real[4 * i + 3] = a.real[i]
    output.imag[4 * i + 3] = a.imag[i]
  }

  return output
}

describe('fft', function() {
  describe('#FFTImageDataRGBA()', function() {
    it('transforms independent channels', function() {
      var n = 48,
          r = randomImageData(n),
          g = randomImageData(n),
          b = randomImageData(n),
          a = new Uint8ClampedArray(n),
          data = mergeRGBA(r, g, b, a),
          expected = mergeComplexRGBA(DFT(r), DFT(g), DFT(b), DFT(a)),
          output = fft_lib.FFTImageDataRGBA(data, n, 1)

      assertComplexArraysAlmostEqual(expected, output)
    })

    xit('transforms in 2D')
  })
})

