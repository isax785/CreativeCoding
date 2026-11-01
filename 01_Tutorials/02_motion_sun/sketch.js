let wavesStartOffset = {};
let sunRaysOffset = 0;
let sunRaySpeed = 0.005;
let wave1Speed = 0.08;
let wave2Speed = -0.08;
let wave3Speed = 0.03;

function setup() {
  createCanvas(400, 600);
}

function drawTriangle(x, y, triangleSize) {
  // funciton for testing the rotation angle
  push();
  fill("#1ac94f")
  translate(x, y);
  rotate(HALF_PI/2);
  triangle(-triangleSize, triangleSize, triangleSize, triangleSize, 0, -triangleSize);
  pop();
}

function drawSun(centerX, centerY, radius) {
  noStroke();
  fill("#b4481a");
  circle(centerX, centerY, radius);
  
  let numberOfTriangles = 10;
  let distance = 140;
  let triangleSize = 20;
  drawSunRays(centerX, centerY, numberOfTriangles, distance, triangleSize, sunRaySpeed);
  // drawTriangle(width / 2, height / 3.3, 20);
}

function drawSunRays(centerX, centerY, numberOfTriangles, distance, triangleSize, rotationSpeed) {
  for (let i = 0; i < numberOfTriangles; i++) {
    let angle = map(i, 0, numberOfTriangles, 0, TWO_PI);
    let x = centerX + cos(angle + sunRaysOffset) * distance;
    let y = centerY + sin(angle + sunRaysOffset) * distance;
    
    push();
    translate(x, y);
    rotate(angle + HALF_PI + sunRaysOffset);
    triangle(-triangleSize, triangleSize, triangleSize, triangleSize, 0, -triangleSize);
    pop();
  }
  sunRaysOffset += rotationSpeed;
}

function drawWave(color, waveHeight, xScale, yScale, offsetSpeed) {
  if (!(color in wavesStartOffset)) {
    wavesStartOffset[color] = 0;
  }

  stroke(color);
  for (let i = 0; i < width; i++) {
    let y = yScale * sin(i * xScale + wavesStartOffset[color]) + waveHeight;
    line(i, height, i, height - y);
  }
  wavesStartOffset[color] += offsetSpeed;
}


function draw() {
  background("#e1d7bb");
  
  drawSun(width / 2, height / 3.3, 220);
  

  drawWave("#28636f", 200, 0.02, 30, wave1Speed);
  drawWave("#1c4457", 130, 0.016, 12, wave2Speed);
  drawWave("#0d1d38", 70, 0.02, 25, wave3Speed);
}
