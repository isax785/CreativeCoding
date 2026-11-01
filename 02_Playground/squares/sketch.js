let time = 0;
let T = 1000; // period [ms]
let H = 600;
let W = 400;
let S = 40;
let speed = H / T / 2;

function setup() {
  createCanvas(400, H);
}


let y=0;

function draw_square() {
  // A square is a four-sided shape defined by the x, y, and s parameters. x and y set the location of its top-left corner. s sets its width and height. 
  fill('#9F6642');
  y = (speed * time) % H;
  square(W/2-S/2, y, S);
}

function draw_quad() {
  // Quadrilaterals include rectangles, squares, rhombuses, and trapezoids. The first pair of parameters (x1, y1) sets the quad's first point. The next three pairs of parameters set the coordinates for its next three points (x2, y2), (x3, y3), and (x4, y4). Points should be added in either clockwise or counter-clockwise order.


}

function draw() {
  background('#0ee86c')
  // draw_quad(); 
  fill('#9F6642'); 
  draw_square();
  time += deltaTime; // [ms]
}
