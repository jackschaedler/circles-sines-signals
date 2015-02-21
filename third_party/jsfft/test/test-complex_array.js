var assert = require('assert'),
  complex_array = require('../lib/complex_array'),
  ComplexArray = complex_array.ComplexArray

function assertArrayEquals(first, second) {
  var message = first + ' != ' + second

  first.forEach(function(item, i) {
    assert.equal(item, second[i], message)
  })
}

describe('isComplexArray', function() {
  it('should correctly identify complex arrays', function() {
    assert.ok(!complex_array.isComplexArray(1))
    assert.ok(!complex_array.isComplexArray([1,2,3]))
    assert.ok(!complex_array.isComplexArray('string'))

    assert.ok(complex_array.isComplexArray(new ComplexArray(1)))
  })
})

describe('ComplexArray', function() {
  describe('#__constructor__()', function() {
    it('should construct from a number', function() {
      var a = new ComplexArray(10)
      assert.equal(10, a.real.length)
      assert.equal(10, a.imag.length)
      assert.equal(0, a.real[0])
      assert.equal(0, a.imag[0])
    })

    it('should construct from a number with a type', function() {
      var a = new ComplexArray(10, Int32Array)
      assert.equal(Int32Array, a.ArrayType)
      assert.equal(10, a.real.length)
      assert.equal(10, a.imag.length)
      assert.equal(0, a.real[0])
      assert.equal(0, a.imag[0])
    })

    it('should contruct from a real array', function() {
      var a = new ComplexArray([1, 2])
      assertArrayEquals([1, 2], a.real)
      assertArrayEquals([0, 0], a.imag)
    })

    it('should contruct from a real array with a type', function() {
      var a = new ComplexArray([1, 2], Int32Array)
      assert.equal(Int32Array, a.ArrayType)
      assertArrayEquals([1, 2], a.real)
      assertArrayEquals([0, 0], a.imag)
    })

    it('should contruct from another complex array', function() {
      var a = new ComplexArray(new ComplexArray([1, 2]))
      assertArrayEquals([1, 2], a.real)
      assertArrayEquals([0, 0], a.imag)
    })
  })

  describe('#map()', function() {
    it('should alter all values', function() {
      var a = new ComplexArray([1, 2])

      a.map(function(value, i) {
        value.real *= 10
        value.imag = i
      })
      assertArrayEquals([10, 20], a.real)
      assertArrayEquals([0, 1], a.imag)
    })
  })

  describe('#forEach()', function() {
    it('should touch every value', function() {
      var
        a = new ComplexArray([1, 2]),
        sum = 0

      a.imag[0] = 4
      a.imag[1] = 8
      a.forEach(function(value, i) {
        sum += value.real
        sum += value.imag
      })
      assert.equal(15, sum)
    })
  })

  describe('#conjugate()', function() {
    it('should multiply a number', function() {
      var
        a = new ComplexArray([1, 2]),
        b

      a.imag[0] = 1
      a.imag[1] = -2
      b = a.conjugate()
      assertArrayEquals([1, 2], b.real)
      assertArrayEquals([-1, 2], b.imag)
    })
  })

  describe('#magnitude()', function() {
    it('should give the an array of magnitudes', function() {
      var a = new ComplexArray([1, 3])

      a.imag[0] = 0
      a.imag[1] = 4
      assertArrayEquals([1, 5], a.magnitude())
    })

    it('should return an iterable ArrayType object', function() {
      var
        sum = 0,
        a = new ComplexArray([1, 2])

      a.magnitude().forEach(function(value, i) {
        sum += value
      })
      assert.equal(3, sum)
    })
  })
})