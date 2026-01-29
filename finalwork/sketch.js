// 最終課題を制作しよう

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
let player;
let enemies = [];
let bullets = [];
let score = 0;
let life = 3;
let gameOver = false;
let enemySpeed = 2;

function setup() {
  createCanvas(600, 400);
  player = { x: width / 2, y: height - 30, r: 15 };
}

function draw() {
  background(220);

  if (!gameOver) {
    score++;

  
    if (frameCount % 300 === 0) {
      enemySpeed += 0.5;
    }

    
    if (frameCount % 60 === 0) {
      let type = int(random(3)); 
      enemies.push({
        x: random(width),
        y: 0,
        r: 15,
        speed: enemySpeed,
        type: type,
        dx: random(-2, 2)
      });
    }

    
    for (let i = enemies.length - 1; i >= 0; i--) {
      moveEnemy(enemies[i]);
      drawEnemy(enemies[i]);

      
      if (hitCheck(player, enemies[i])) {
        life--;
        enemies.splice(i, 1);
        if (life <= 0) gameOver = true;
      }
    }

    
    for (let i = bullets.length - 1; i >= 0; i--) {
      moveBullet(bullets[i]);
      fill(0);
      rect(bullets[i].x, bullets[i].y, 4, 10);

      for (let j = enemies.length - 1; j >= 0; j--) {
        if (hitCheck(bullets[i], enemies[j])) {
          score += 100;
          enemies.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }

  
    if (keyIsDown(LEFT_ARROW)) player.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  }

  
  fill(0, 0, 255);
  ellipse(player.x, player.y, player.r * 2);


  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
  text("Life: " + life, 10, 40);

  if (gameOver) {
    textAlign(CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2);
  }
}


function keyPressed() {
  if (key === " ") {
    bullets.push({ x: player.x, y: player.y, r: 5 });
  }
}


function moveEnemy(e) {
  e.y += e.speed;

  
  if (e.type === 2) {
    e.x += e.dx;
  }
}


function drawEnemy(e) {
  if (e.type === 0) {
    fill(255, 0, 0); 
  } else if (e.type === 1) {
    fill(0, 255, 0); 
    e.y += 2;
  } else if (e.type === 2) {
    fill(150, 0, 150); 
  }
  ellipse(e.x, e.y, e.r * 2);
}


function moveBullet(b) {
  b.y -= 7;
}


function hitCheck(a, b) {
  let d = dist(a.x, a.y, b.x, b.y);
  return d < a.r + b.r;
}