let particles = [];

function setup() {
  // キャンバスを作成し、p5CanvasContainerに設定
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5CanvasContainer');
  
  // パーティクルを生成
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(20, 30, 48); // ダークブルーの背景
  particles.forEach(p => p.update().show());
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
  }

  update() {
    this.acc = p5.Vector.random2D();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.edges();
    return this;
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    noStroke();
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
