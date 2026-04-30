let characterImg;
let thoughtsImg;
let thoughts2Img;
let thoughts3Img;

let x, y;
let vy = 0;

let size = 120;
let gravity = 0.35;
let groundY;

// Thought bubble state
let showFloat = false; // starts hidden now
let showClimb = false;
let showRocket = false;

let floatClicked = false;
let climbClicked = false;

// Layout
let spacing = 140;
let bubbleYOffset = -150;

function preload() {
  grassBg = loadImage("Grass1.jpg");
  characterImg = loadImage("Bort.png");
  thoughtsImg = loadImage("Float.png");
  thoughts2Img = loadImage("Climb.png");
  thoughts3Img = loadImage("Rocket.png");
}

function setup() {
  createCanvas(3200, 2000);
  canvas.parent("p5-container"); // attach to your div
  
  clear(); // ensures transparency
  imageMode(CENTER);

  x = width / 2;
  groundY = height - size / 2;
  y = groundY;
}

function draw() {
  // Background
  //image(grassBg, width / 2, height / 2, width, height);
  clear();
  // Horizontal movement
  x = lerp(x, mouseX, 0.08);

  // Jump logic
  if (mouseY < y) {
    vy -= 0.6;
  }

  vy += gravity;
  vy = constrain(vy, -4, 8);
  y += vy;

  // Top limit
  let topLimit = 140;
  if (y < topLimit) {
    y = topLimit;
    vy = 1.2;
  }

  // Ground
  if (y > groundY) {
    y = groundY;
    vy = 0;
  }

  // Draw character
  image(characterImg, x, y, size, size);

  // Thought bubbles
  let bubbleY = y + bubbleYOffset;

  if (showFloat) {
    image(thoughtsImg, x - spacing, bubbleY, 100, 100);
  }

  if (showClimb) {
    image(thoughts2Img, x, bubbleY, 100, 100);
  }

  if (showRocket) {
    image(thoughts3Img, x + spacing, bubbleY, 100, 100);
  }
}

function mousePressed() {
  let bubbleY = y + bubbleYOffset;


  if (!showFloat && dist(mouseX, mouseY, x, y) < size / 2) {
    showFloat = true;
    return; // stop here so it doesn't trigger other clicks
  }

  // FLOAT
  if (showFloat && dist(mouseX, mouseY, x - spacing, bubbleY) < 50) {
    floatClicked = true;
    showClimb = true;
  }

  // CLIMB
  else if (showClimb && dist(mouseX, mouseY, x, bubbleY) < 50) {
    climbClicked = true;
    showRocket = true;
  }

  // ROCKET
  else if (
    showRocket &&
    floatClicked &&
    climbClicked &&
    dist(mouseX, mouseY, x + spacing, bubbleY) < 50
  ) {
    window.location.href = "https://your-next-page.com";
  }
}