function setup() {
  createCanvas(400, 400);
  // let c = color("black");
}

let rad = 0;
let N = 15;


function draw() {
  let green = color("#97ed55");
  let purple = color("#9029ff");
  let c = color("black");
  
  background(green);

  // background("#97ed55");
  noStroke();
  fill("#9029ff");

  for (let i = 0; i < N; i++) {
    c = lerpColor(green, purple, N * 100);
    fill(c);

    // fill(250/2*(1+cos(4*(rad+HALF_PI/N*i))));  // black and white tone
    circle(width/2 + width/5*cos(2*PI/N*i),
          height/2 + height/5*sin(2*PI/N*i),
          15*(1+abs(cos(4*(rad+HALF_PI/N*i)))));
  }
  
  rad += PI / 200;
}