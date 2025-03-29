let particles = [];
const particleCount = 150;
let hueValue = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);

  // Create initial particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // Semi-transparent background for trails
  background(0, 0, 0, 0.05);

  // Update hue based on mouse position
  hueValue = (mouseX / width) * 360;

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

function mouseMoved() {
  // Add a new particle at mouse position when moving
  if (frameCount % 3 === 0) {
    particles.push(new Particle(mouseX, mouseY, true));

    // Keep particle count reasonable
    if (particles.length > particleCount * 1.5) {
      particles.shift();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y, fromMouse = false) {
    this.pos = createVector(
      x || random(width),
      y || random(height)
    );
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.size = random(3, 12);
    this.hue = hueValue + random(-20, 20);
    this.fromMouse = fromMouse;
    this.maxSpeed = fromMouse ? 5 : 2;
    this.lifespan = 255;
  }

  update() {
    // Add some perlin noise for organic movement
    let noiseScale = 0.01;
    let noiseVal = noise(this.pos.x * noiseScale, this.pos.y * noiseScale, frameCount * 0.01);
    let noiseAngle = map(noiseVal, 0, 1, 0, TWO_PI * 2);

    let noiseForce = p5.Vector.fromAngle(noiseAngle);
    noiseForce.mult(0.1);
    this.acc.add(noiseForce);

    // Apply force toward/away from mouse
    let mousePos = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mousePos, this.pos);
    let distance = dir.mag();

    if (distance < 200) {
      dir.normalize();
      // Attract or repel based on mouse position
      let mouseInfluence = map(mouseY, 0, height, -0.5, 0.5);
      dir.mult(mouseInfluence);
      this.acc.add(dir);
    }

    // Update physics
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }

    // Decrease lifespan for mouse particles
    if (this.fromMouse) {
      this.lifespan -= 2;
    }
  }

  display() {
    // Update hue based on global value and position
    this.hue = (hueValue + map(this.pos.y, 0, height, 0, 60)) % 360;

    // Calculate alpha based on lifespan for mouse particles
    let alpha = this.fromMouse ? this.lifespan / 255 : 0.7;

    // Calculate brightness based on velocity
    let speed = this.vel.mag();
    let brightness = map(speed, 0, this.maxSpeed, 50, 100);

    noStroke();
    fill(this.hue, 80, brightness, alpha);

    // Draw with blend mode for glow effect
    blendMode(ADD);
    circle(this.pos.x, this.pos.y, this.size);
    blendMode(BLEND);
  }

  isDead() {
    return this.fromMouse && this.lifespan <= 0;
  }
}

// Remove dead particles periodically
setInterval(() => {
  particles = particles.filter(p => !p.isDead());
}, 1000);