const params = {
  radius: 100,
  disp: 50,
  speed: 1,
  color: "#74ff29",
  background: "#4b4b1a",
};

let h = 400
let w = 400
let x0 = w / 2;
let y0 = h / 2;
let angle = 0

function setup() {
  createCanvas(w, h);
  setupGUI();
}

function draw() {
  background(params.background);
  noStroke();
  fill(params.color);

  circle(x0, y0, params.radius);

  angle += TWO_PI * params.speed / params.disp;
  y0 = h / 2 + params.disp * cos(angle);

  stroke("black");
  noFill();
  circle(x0, h/2, params.radius);
}

function setupGUI() {
  const pane = new Tweakpane.Pane();
  
  // add folders
  let generalFolder = pane.addFolder({ title: "General" });
  generalFolder.addInput(params, "color");
  generalFolder.addInput(params, "background");
  generalFolder.addInput(params, "radius", {min: 5, max: 300});
  generalFolder.addInput(params, "disp", {min: 10, max: 100});
  generalFolder.addInput(params, "speed", {min: 1, max: 5});
}