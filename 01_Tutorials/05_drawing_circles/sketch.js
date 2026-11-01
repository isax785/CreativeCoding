var props = {
  // Circle properties
  circleNo: 5,
  circleNoMin: 1,
  circleNoMax: 30,
  circleNoStep: 1,
  
  // main circle size
  baseCircleSize: 50,
  baseCircleSizeMin: 10,
  baseCircleSizeMax: 200,
  baseCircleSizeStep: 1,

  // Size difference
  sizeDifference: 75,
  sizeDifferenceMin: 1,
  sizeDifferenceMax: 100,
  sizeDifferenceStep: 1,

  // Color difference
  colorDifference: 12,
  colorDifferenceMin: 1,
  colorDifferenceMax: 50,
  colorDifferenceStep: 1,

  // Text size
  textSize: 25,
  textSizeMin: 20,
  textSizeMax: 70,
  textSizeStep: 5,

  // Stroke weight
  strokeWeightValue: 1,
  strokeWeightValueMin: 0,
  strokeWeightValueMax: 10, 
  strokeWeightValueStep: 1,

  // Stroke setting
  hasStroke: false,
  
  // Colors
  strokeColor: '#ffffff',
  baseColor: '#e76f51',
  backgroundColor: '#2a9d8f',
};

let font;

function preload() {
  font = loadFont('LuckiestGuy-Regular.ttf');
}

function setup() {
  createCanvas(400, 500);

  var gui = createGui("Settings");
  gui.setPosition(450, 10);
  gui.addObject(props);
}

function addText() {
  textFont(font);
  textAlign(CENTER);
  textSize(props.textSize);
  stroke(255);
  strokeWeight(3);
  fill(props.baseColor);

  text("Stay focused!", width / 2, height / 1.15);
}

function draw() {
  if (!props.hasStroke) {
    noStroke();
  } else {
    stroke(props.strokeColor);
    strokeWeight(props.strokeWeightValue);
  }

  background(props.backgroundColor);
  
  
  colorMode(HSB, 360, 100, 100);
  
  for (let i = props.circleNo - 1; i >= 0; i--) {
    let colorObj = color(props.baseColor);
    let h = hue(colorObj);
    let s = saturation(colorObj);
    let b = brightness(colorObj);

    fill(color((h + (props.colorDifference * i)) % 360, s, b));
    circle(width / 2, height / 2, (props.baseCircleSize + (i * props.sizeDifference)));
  }

  addText();
}