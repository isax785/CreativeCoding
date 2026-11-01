// Define spacing and dimensions for the lines and arches
let lineGap = 10;
let archGap = lineGap * 2;
let archRadius = 60;
let lineOffset = archRadius / 2;
let archNumber = 8;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#e8e0d5');
  // ellipse(mouseX, mouseY, 50, 50);
  noStroke();
  fill('#9F6642');
  arc(width / 2, height / 1.2, width / 2, width / 2, PI, TWO_PI);
  
  fill('#B39279B3');
  arc(width / 2, height / 1.7, width / 2, width / 2, 0, PI);

  // Define the style by setting the color and weight of the lines
  stroke('#264563');
  strokeWeight(3);
  noFill(); // Ensure the arcs are not filled

  for (let i = 0; i < archNumber; i++) {
      line(width / 2 - (i * lineGap) - lineOffset, height / 1.75, width / 2 - (i * lineGap) - lineOffset, height / 3);
      line(width / 2 + (i * lineGap) + lineOffset, height / 1.75, width / 2 + (i * lineGap) + lineOffset, height / 3);
      arc(width / 2, height / 3, archRadius + i * archGap, archRadius + i * archGap, PI, TWO_PI);
  }
}
  
  