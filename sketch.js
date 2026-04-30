let characterImg;
let thoughtsImg;
let thoughts2Img;
let thoughts3Img;

let x, y;
let vy = 0;

let size = 120;
let gravity = 0.35;
let groundY;

// Movement control
let grounded = false;
let startDelay = 30; // small delay before player can move

// Thought bubble state
let showFloat = false;
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
  let canvas = createCanvas(2200, 2000);
  canvas.parent("p5-container");

  clear(); // transparent background
  imageMode(CENTER);

  x = width / 2;
  groundY = height - size / 2;
  y = groundY;
}

function draw() {
  clear();

  // Follow mouse horizontally
  x = lerp(x, mouseX, 0.08);

  // Countdown delay
  if (startDelay > 0) startDelay--;

  // Apply gravity
  vy += gravity;
  vy = constrain(vy, -4, 8);
  y += vy;

  // Ground check
  if (y > groundY) {
    y = groundY;
    vy = 0;
    grounded = true;
  }

  // Only allow upward movement AFTER landing + delay
  if (grounded && startDelay <= 0 && mouseY < y) {
    vy -= 0.6;
  }

  // Top limit
  let topLimit = 140;
  if (y < topLimit) {
    y = topLimit;
    vy = 1.2;
  }

  // Draw character
  image(characterImg, x, y, size, size);

  // Thought bubbles
  let bubbleY = y + bubbleYOffset;

  if (showFloat) {
    image(thoughtsImg, x - spacing, bubbleY, 150, 150);
  }

  if (showClimb) {
    image(thoughts2Img, x, bubbleY, 150, 150);
  }

  if (showRocket) {
    image(thoughts3Img, x + spacing, bubbleY, 150, 150);
  }
}

function mousePressed() {
  let bubbleY = y + bubbleYOffset;

  // First click: show float bubble
  if (!showFloat && dist(mouseX, mouseY, x, y) < size / 2) {
    showFloat = true;
    return;
  }

  // FLOAT
  if (showFloat && dist(mouseX, mouseY, x - spacing, bubbleY) < size / 2) {
    floatClicked = true;
    showClimb = true;
  }

  // CLIMB
  else if (showClimb && dist(mouseX, mouseY, x, bubbleY) < size / 2) {
    climbClicked = true;
    showRocket = true;
  }

  // ROCKET
  else if (
    showRocket &&
    floatClicked &&
    climbClicked &&
    dist(mouseX, mouseY, x + spacing, bubbleY) < size / 2
  ) {
    window.location.href = "https://trey0rizzo-spec.github.io/v2TrainWebsite/";
  }
}