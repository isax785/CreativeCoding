// https://alexcodesart.com/animating-abstract-art-a-beginners-guide-to-tweening-with-p5-js/

let options = {
  nrOfCircles: 2,
  endDegreeTop: 0,
  endDegreeBottom: 0,
  delay: 0,
};

const startSize = 400;
const backgroundStartSize = 1500;

const lowerHalfColors = [
  '#2E84EE', '#4290F0', '#569BF1', '#6AA7F3', '#7EB3F5',
  '#93C0F6', '#A8CCF8', '#BDD8FA', '#D3E5FC', '#E9F2FD'
];

const upperHalfColors = [
  '#EE982E', '#F0A242', '#F1AC56', '#F3B66A', '#F5C07E',
  '#F6CA93', '#F8D4A8', '#FADEBD', '#FCE9D3', '#FDF4E9'
];

function setup() {
  createCanvas(600, 600);
  pixelDensity(3);

  options.endDegreeTop = PI;
  
  p5.tween.manager.addTween(options, 'tween')
    .addMotions([
      { key: 'endDegreeTop', target: TWO_PI },
      { key: 'endDegreeBottom', target: PI },
    ], 1000, 'easeInCubic')
    .addMotion('nrOfCircles', 10, 1200, 'easeOutCubic')
    .addMotion('delay', 0, 500, 'easeOutCubic')
    .addMotion('nrOfCircles', 1, 1000, 'easeInCubic')
    .addMotions([
      { key: 'endDegreeTop', target: PI },
      { key: 'endDegreeBottom', target: 0 },
    ], 1000, 'easeOutCubic')
    .startTween();
}

function draw() {
  background(240);
  noStroke();
  pixelDensity(3);

  const backgroundSizeDifference = backgroundStartSize / options.nrOfCircles;
  const sizeDifference = startSize / options.nrOfCircles;

  // Draw background semicircles
  drawSemicircles(options.nrOfCircles, upperHalfColors, 25, backgroundStartSize, backgroundSizeDifference, PI, options.endDegreeTop, false);
  drawSemicircles(options.nrOfCircles, lowerHalfColors, 25, backgroundStartSize, backgroundSizeDifference, 0, options.endDegreeBottom, true);

  // Draw foreground semicircles
  drawSemicircles(options.nrOfCircles, upperHalfColors, 255, startSize, sizeDifference, PI, options.endDegreeTop, false);
  drawSemicircles(options.nrOfCircles, lowerHalfColors, 255, startSize, sizeDifference, 0, options.endDegreeBottom, true);
}

function drawSemicircles(nrOfCircles, colors, alpha, startSize, sizeDifference, startDegree, endDegree, direction) {
  for (let i = 0; i < nrOfCircles; i++) {
    push();
    let fillColor = color(colors[i]);
    fillColor.setAlpha(alpha);
    fill(fillColor);

    if (direction) {
      translate(width / 2 + (i * sizeDifference) * 0.5, height / 2);
    } else {
      translate(width / 2 - (i * sizeDifference) * 0.5, height / 2);
    }

    arc(0, 0, startSize - (i * sizeDifference), startSize - (i * sizeDifference), startDegree, endDegree);
    pop();
  }
}