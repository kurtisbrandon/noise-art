// Original Creation: 
// By Joseph Gentle https://github.com/josephg/noisejs
// Generated by CoffeeScript 1.3.3

// Modified Version:
// By Kurtis Grant https://github.com/kurtisbrandon

var TAU, button, canvas, ctx, draw, f, fpselem, h, p1, particles, period, raf, w, _i, strands, angScaler, pxpf, yStrtOff, xStrtOff, started, colOff;

started = false;

// Create canvas
canvas = document.getElementsByTagName('canvas')[0];

// Appears to do nothing?
// fpselem = document.getElementById('fps');

// Set w, h to width and height of canvas
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

// Get canvas context
ctx = canvas.getContext('2d');

// Sets number of particle 'strands'
strands = 800;

// Set angle scaler (1 = full 360deg posibility)
angScaler = 0.3;

// Pixels drawn per frame
pxpf = 1;

// X Start offset
xStrtOff = w;

// Start offset
yStrtOff = 25;

// Set line width
ctx.lineWidth = 1.5;

// Set TAU to 2*PI radians (a whole circle)
TAU = 2 * Math.PI;

// Set period (length of a full sin or cos wave)
period = 1 / 400; 

// Draw canvas background
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = 'rgba(1,1,1,0.3)';

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyC') {
    // Set w, h to width and height of canvas
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    // Draw canvas background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(1,1,1,0.3)';

    started = false;

  } else if (e.code === 'ArrowRight') {

    // Set w, h to width and height of canvas
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    // Draw canvas background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(1,1,1,0.3)';
    
    // Set noise seed (determines varied outcome of the program)
    noise.seed(Math.random()); 

    // Color offset
    colOff = Math.random() * 360;
    
    // Initialize the particles array
    particles = [];
    
    started = true;
    
    // Loops through and creates starting points for each strand
    for (_i = 1; _i <= strands; _i++) {
      p1 = {
        // Set the first half of the strand
        
        // Where will this strand be relative to it's peers?
        x: w / 2 + (Math.random() - 0.5) * xStrtOff, 
        // Offset from other strands from starting point along pre-determined path
        y: h / 2 + (Math.random() - 0.5) * yStrtOff, 
        // What angle will this strand travel at?
        a: 0
      };
      particles.push(p1);
      
      // Set the second half of the strand
      particles.push({
        // Starts at same location as first half
        x: p1.x,
        y: p1.y,
        // But begins travelling in the opposite direction (180deg)
        a: TAU / 2
      });
    }
  }
})
  
  draw = function() {
    var a, p, v, _j, _len, _results;
    _results = [];
    for (_j = 0, _len = particles.length; _j < _len; _j++) {
    p = particles[_j];

    // Color of this point in the particle strand determined by perlin2 2D array
    // This 2D array will be smooth values from -1 to 1, it's also used for the
    //    wave forms
    v = noise.simplex2(p.x * period, p.y * period); // RANGE -1 to 1

    // ctx.fillStyle = "hsla(" + (Math.floor(v * 360)) + ", 95%, 80%, 0.1)"; //////
    ctx.strokeStyle = "hsla(" + (Math.floor(v * 40) + colOff) + ", 95%, 85%, 0.15)"; 

    // Draw point (which is actually a small rect)
    // ctx.fillRect(p.x, p.y, 1, 1); //////

    // Appears to do nothing? ******************
    // p.h++;

    // 'Steer' the angle of the point by a small amount, 
    //    depends on the 'v' noise value.
    a = v * 2 * Math.PI * angScaler + p.a;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);

    // Add to the x & y, values that correspond to the particle's 
    //    angle of travel (pxpf removed)
    p.x += Math.cos(a) * ( v+1 ) * pxpf;
    // Not sure why we push to _results ****************
    _results.push(p.y += Math.sin(a) * pxpf);

    ctx.lineTo(p.x, p.y);
    ctx.stroke()
  }
  return _results;
};

raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
  return window.setTimeout(callback, 1000 / 60);
};


// button = document.getElementsByTagName('input')[0];

// button.onclick = function() {
//   return window.open(canvas.toDataURL('image/png'));
// };

f = function() {
  raf(f);
  if (started) {
    return draw();
  }
};

raf(f);