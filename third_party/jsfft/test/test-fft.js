require('./test_helper')

var ComplexArray = require('../lib/complex_array').ComplexArray

describe('fft', function() {
  describe('#FFT()', function() {
    describe('on N=4 Arrays', function() {
      it('should return a single frequency given a constant array', function() {
        assertFFTMatches([1, 1, 1, 1], new ComplexArray([2, 0, 0, 0]))
      })

      it('should return flat with a delta function input', function() {
        assertFFTMatches([1, 0, 0, 0], new ComplexArray([0.5, 0.5, 0.5, 0.5]))
      })

      it('should return a single high freq', function() {
        assertFFTMatches([1, -1, 1, -1], new ComplexArray([0, 0, 2, 0]))
      })

      it('should return a single low freq', function() {
        assertFFTMatches([1, 0, -1, -0], new ComplexArray([0, 1, 0, 1]))
      })

      it('should return a high freq and DC', function() {
        assertFFTMatches([1, 0, 1, 0], new ComplexArray([1, 0, 1, 0]))
      })
    })

    describe('on N=6 Arrays', function() {
      it('should return a single frequency given a constant array', function() {
        assertFFTMatches(
          [1, 1, 1, 1, 1, 1],
          new ComplexArray([Math.sqrt(6), 0, 0, 0, 0, 0])
        )
      })

      it('should return flat with a delta function input', function() {
        var a = 1 / Math.sqrt(6)
        assertFFTMatches(
          [1, 0, 0, 0, 0, 0],
          new ComplexArray([a, a, a, a, a, a])
        )
      })
    })

    describe('on N=`prime` Arrays', function() {
      it('should match the DFT', function() {
        var a = new ComplexArray(13)

        a.map(function(value) {
          value.real = Math.random()
          value.imag = Math.random()
        })

        assertFFTMatchesDFT(a)
      })
    })

    describe('on N=512 Arrays', function() {
      it('should match the DFT', function() {
        var a = new ComplexArray(512)

        a.map(function(value) {
          value.real = Math.random()
          value.imag = Math.random()
        })

        assertFFTMatchesDFT(a)
      })
    })

    describe('on N=900 Arrays', function() {
      it('should match the DFT', function() {
        var a = new ComplexArray(900)

        a.map(function(value) {
          value.real = Math.random()
          value.imag = Math.random()
        })

        assertFFTMatchesDFT(a)
      })
    })
  })

  describe('#frequencyMap()', function() {
    it('should not modify the original', function() {
      var
        original = new ComplexArray([1, 2, 3, 4]),
        filtered = original.frequencyMap(function() {})

      assertComplexArraysAlmostEqual(original, filtered)
    })

    it('should halve the original', function() {
      var
        original = new ComplexArray([1, 2, 3, 4]),
        filtered = original.frequencyMap(function(value, i) {
          value.real /= 2
          value.imag /= 2
        })

      assertComplexArraysAlmostEqual(
          new ComplexArray([0.5, 1, 1.5, 2]), filtered)
    })

    it('should return zeroed ComplexArray', function() {
      var
        original = new ComplexArray([1, 2, 3, 4]),
        filtered = original.frequencyMap(function(value, i) {
          value.real = value.imag = 0
        })

      assertComplexArraysAlmostEqual(new ComplexArray([0, 0, 0, 0]), filtered)
    })

    it('should shift the original', function() {
      var
        original = new ComplexArray([1, 2, 3, 4]),
        filtered = original.frequencyMap(function(value, i) {
          var
            // Multiply by a phase to shift the original.
            real_multiplier = i % 2 ? 0 : (1 - i),
            imag_multiplier = i % 2 ? (2 - i) : 0,
            swap_real = value.real,
            swap_imag = value.imag

          value.real = real_multiplier * swap_real - imag_multiplier * swap_imag
          value.imag = real_multiplier * swap_imag + imag_multiplier * swap_real
        })

      assertComplexArraysAlmostEqual(new ComplexArray([4, 1, 2, 3]), filtered)
    })
  })
})

