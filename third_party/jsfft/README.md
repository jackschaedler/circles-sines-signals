# jsfft

Small, efficient Javascript FFT implementation for node or the browser.

## Usage

JSFFT ships with a **complex_array** and a **fft** module.

```javascript
var data = new complex_array.ComplexArray(512)
// Use the in-place mapper to populate the data.
data.map(function(value, i, n) {
  value.real = (i > n/3 && i < 2*n/3) ? 1 : 0
})
```

Including the **fft** module attaches FFT methods to ComplexArray.  FFT and
InvFFT perform in-place transforms on the underlying data:

```javascript
var frequencies = data.FFT()
// Implement a low-pass filter using the in-place mapper.
frequencies.map(function(frequency, i, n) {
  if (i > n/5 && i < 4*n/5) {
    frequency.real = 0
    frequency.imag = 0
  }
})
```

Alternatively, frequency-space filters can be implemented via the frequencyMap:

```javascript
var filtered = data.frequencyMap(function(frequency, i, n) {
  if (i > n/5 && i < 4*n/5) {
    frequency.real = 0
    frequency.imag = 0
  }
})
```

## Other Implementations

[DSP](https://github.com/corbanbrook/dsp.js) is a full featured Digital Signal
Processing library in JS which includes a JS FFT implementation.
