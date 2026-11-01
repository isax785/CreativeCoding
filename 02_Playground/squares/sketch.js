const T = 1000; // period [ms]
const H = 600;
const W = 1000;
const LINES = 5; // number of lines
const S = W / LINES / 2;  // size
const speed = H / T / 4;
const FPS = 60;
const T_INT = 1000;  // generation of new square [ms]
const X0 = W/2-S/2;
const bg_color = '#0ee86c';
const sq_color = '#9228e9';

class SquaresQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element); 
  }
  dequeue() {
    return this.isEmpty() ? null : this.items.shift();
  }
  peek() {
    return this.isEmpty() ? null : this.items[0];
  }
  isEmpty() {
    return this.len()=== 0;
  }
  size() {
    return this.items.length;
  }
  len() {
    return this.items.length;
  }
  print() {
    console.log(this.items.join(" -> "));
  }
}

let squares = new SquaresQueue();

let sound_clicked;

function setup() {
  createCanvas(W, H);
  // squares.enqueue(new Square(X0, S, millis()));
  sound_clicked = loadSound('magic.mp3');
   
  setInterval(generateSquare, T_INT);
}

class Square{
  constructor(x, size, line) {
    this.size_max = size;
    this.size = 0;
    this.size1 = 0
    this.line = line;
    this.x = x;
    this.x1 = x;
    this.y = 0;
    this.isInStage = true;
    this.color = sq_color;
  }

  draw() {
    fill(this.color);
    this.size = this.size_max / H * this.y;
    this.size1 = this.size_max / H * (this.y+this.size);
    this.y += deltaTime * speed;
    this.x = - (W / 2 - W / LINES * this.line) / H * this.y + W / 2;
    this.x1 = - (W / 2 - W / LINES * this.line) / H * (this.y + this.size) + W / 2;
    if (this.y <= H) {
      // square(this.x, this.y, this.size);
      // square(this.x - this.size / 2, this.y, this.size);
      this.calc_quad();
      quad(this.qx1, this.qy1, this.qx2, this.qy2, this.qx3, this.qy3, this.qx4, this.qy4);
    }
    else {
      this.isInStage = false;
    }
  }
  calc_quad() {
    // quadrilateral points, start from upper-left corner, clockwise
    this.qx1 = this.x-this.size/2;
    this.qy1 = this.y;
    this.qx2 = this.x+this.size /2;
    this.qy2 = this.y;
    this.qx3 = this.x1+this.size1/2;
    this.qy3 = this.y+this.size;
    this.qx4 = this.x1-this.size1 /2;
    this.qy4 = this.y+this.size;
  }
}

let l = 0;
let score = 0;

function generateSquare() {
  l = round(random(0, LINES), 0);
  // console.log("Line:", l); // DEBUG
  squares.enqueue(new Square(X0, S, l));
}

function draw() {
  frameRate(FPS);
  background(bg_color);

  for (i=0; i<=LINES; i++) {line(W/2, 0, W/LINES*i, H);}  // DEBUG: draw lines

  for (i=0; i<squares.len(); i++) {
    squares.items[i].draw();
    // console.log(i, squares.items[i].y, squares.peek(i).isInStage);  // DEBUG
  }
  if (squares.peek(0) != null) {
    if (squares.peek(0).isInStage == false) {
          squares.dequeue();
          // console.log("deque", squares.len(), squares.items); // DEBUG
        } 
  }
  addText();
}
// Adapted from Learning Processing by Daniel Shiffman
// http://www.learningprocessing.com
// Doorbell sample by Corsica_S via freesound.org,
// Creative Commons BY 3.0

// A Class to describe a "doorbell" (really a button)
// class Doorbell {
//   constructor(x_, y_, r_) {
//     // Location and size
//     this.x = x_;
//     this.y = y_;
//     this.r = r_;
//   }
//   // Is a point inside the doorbell? (used for mouse rollover, etc.)
//   contains(mx, my) {
//     return dist(mx, my, this.x, this.y) < this.r;
//   }

//   // Show the doorbell (hardcoded colors, could be improved)
//   display(mx, my) {
//     if (this.contains(mx, my)) {
//       fill(100);
//     } else {
//       fill(175);
//     }
//     stroke(0);
//     strokeWeight(4);
//     ellipseMode(RADIUS);
//     ellipse(this.x, this.y, this.r, this.r);
//   }
// }



// // A sound file object
// let dingdong;

// // A doorbell object (that will trigger the sound)
// let doorbell;

// function setup() {
//   createCanvas(200, 200);

//   // Load the sound file.
//   // We have included both an MP3 and an OGG version.
//   soundFormats('mp3', 'ogg');
//   dingdong = loadSound('assets/doorbell.mp3');

//   // Create a new doorbell
//   doorbell = new Doorbell(width / 2, height / 2, 32);
// }

// function draw() {
//   background(255);
//   // Show the doorbell
//   doorbell.display(mouseX, mouseY);
// }

// function mousePressed() {
//   // If the user clicks on the doorbell, play the sound!
//   if (doorbell.contains(mouseX, mouseY)) {
//     dingdong.play();
//   }
// }


function mousePressed() {
  let square;
  if (squares.len() > 0)  {
    console.log("Clicked") // DEBUG
    for (i=0;i < squares.len();i++) {
      square = squares.items[i];
      if (square.x-square.size/2 < mouseX && 
        mouseX < square.x+square.size/2 && 
        square.y < mouseY && 
        mouseY < square.y+square.size) 
        // FIXME: implement the click within quad area
      { 
          score += 1;
          sound_clicked.play();
          square.color = bg_color;
          break;
      }
    }
  }
}

function addText() {
  // textFont(font);
  textAlign(RIGHT);
  textSize(10);
  // stroke(255);
  // strokeWeight(0);
  fill("#000000");

  text(millis(), W * 0.95, H * 0.95);

  fill("red");
  textSize(30);

  text("Score: "+ score, W * 0.98, H * 0.1);

}