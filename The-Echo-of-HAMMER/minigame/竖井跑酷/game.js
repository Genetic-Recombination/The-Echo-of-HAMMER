const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// 玩家精灵图
const playerSprite = new Image();
playerSprite.src = "detectivewalking.png";

// goal 精灵图
const goalSprite = new Image();
goalSprite.src = "2walking.png";

// 玩家
const player = {
  x: 270,
  y: 500,
  width: 50,
  height: 50,
  velX: 0,
  velY: 0,
  speed: 5,
  jumpPower: 12,
  gravity: 0.6,
  onGround: false,
  wallSliding: false,
  canWallJump: false,
  hasWallJumped: false,
  prevX: 0,
  prevY: 0,
  frameX: 0,
  frameY: 0,
  frameCount: 0,
  action: "idle",
  facing: 1
};

const keys = {};

// 提示信息
const startMessageLines = [
  "zq警官被困住了！救救他！",
  "操作：WASD 或 方向键移动",
  "空格跳跃",
  "靠墙时长按按空格并快速左右移动可蹬墙跳"
];
let alertMessage = "";
let alertColor = "yellow";
let alertTimer = 0;
const alertDuration = 180;
let showStartMessage = true;
setTimeout(() => { showStartMessage = false; }, 5000);

// 游戏结束标志
let gameOver = false;

// 连续掉落计数
let fallCount = 0;

// 平台数组（保持原样）
const platforms = [
  {x: 230, y: 730, width: 150, height: 20, velX:0, velY:0},
  {x: 230, y: 130, width: 40, height: 600, velX:0, velY:0},
  {x: 230, y: 200, width: 40, height: 600, velX:0, velY:0},
  {x: 340, y: 130, width: 40, height: 600, velX:0, velY:0},
  {x: 500, y: 200, width: 120, height: 20, velX: 1, velY: 0, minX: 400, maxX: 720},
  {x: 800, y: 200, width: 120, height: 20, velX: 0, velY: 1, minY: 100, maxY: 300},
  {x: 1100, y: 200, width: 120, height: 20, velX: -1, velY: 0, minX: 1000, maxX: 1320},
  {x: 1400, y: 200, width: 120, height: 20, velX: 0, velY: -1, minY: 100, maxY: 300},
  {x: 1380, y: -300, width: 40, height: 400, velX: 0, velY: 0},
  {x: 1520, y: -300, width: 40, height: 400, velX: 0, velY: 0},
  {x: 1620, y: 200, width: 120, height: 20, velX: 0, velY: 1, minY: -300, maxY:500},
  {x: 1820, y: 400, width: 120, height: 20, velX: 0, velY: 1, minY: -300, maxY:500},
  {x: 2020, y: -100, width: 120, height: 20, velX: 0, velY: 1, minY: -300, maxY:500},
  {x: 2220, y: 0, width: 120, height: 20, velX: 0, velY: 1, minY: -300, maxY:500},
  {x: 2500, y: 150, width: 120, height: 20, velX: 1, velY: 0, minX: 2400, maxX: 2700},
  {x: 2800, y: 100, width: 120, height: 20, velX: 0, velY: 1, minY: 0, maxY: 200},
  {x: 3100, y: 200, width: 120, height: 20, velX: -1, velY: 0, minX: 2900, maxX: 3200},
  {x: 3400, y: 200, width: 120, height: 20, velX: 0, velY: -1, minY: -100, maxY: 600},
  {x: 3380, y: -300, width: 40, height: 400, velX: 0, velY: 0},
  {x: 3520, y: -300, width: 40, height: 400, velX: 0, velY: 0},
  {x: 3700, y: 300, width: 120, height: 20, velX: 0, velY: -1, minY: 100, maxY: 400},
  {x: 3900, y: 100, width: 120, height: 20, velX: 0, velY: 1, minY: -200, maxY: 200},
  {x: 4100, y: 200, width: 120, height: 20, velX: 1, velY: 0, minX: 4000, maxX: 4300},
  {x: 4300, y: 200, width: 120, height: 20, velX: -1, velY: 0, minX: 4200, maxX: 4400}
];

// 终点
const goal = {x: 4300, y: 180, width: 60, height: 20};

let cameraX = 0;
let cameraY = 0;

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// 一键抓捕按钮
const captureBtn = document.createElement("button");
captureBtn.textContent = "一键找到zq警官";
captureBtn.style.position = "absolute";
captureBtn.style.top = "20px";
captureBtn.style.left = "50%";
captureBtn.style.transform = "translateX(-50%)";
captureBtn.style.padding = "10px 20px";
captureBtn.style.fontSize = "16px";
captureBtn.style.display = "none";
document.body.appendChild(captureBtn);

captureBtn.addEventListener("click", () => {
  player.x = goal.x + player.width;
  player.y = goal.y - 30;
  fallCount = 0;
  captureBtn.style.display = "none";
  alertMessage = "已传送到终点！";
  alertColor = "yellow";
  alertTimer = alertDuration;
});

function updatePlatforms() {
  for (let plat of platforms) {
    if (plat.velX) {
      plat.x += plat.velX;
      if (plat.x < plat.minX || plat.x + plat.width > plat.maxX) plat.velX *= -1;
    }
    if (plat.velY) {
      plat.y += plat.velY;
      if (plat.y < plat.minY || plat.y + plat.height > plat.maxY) plat.velY *= -1;
    }
  }
}

function updatePlayer() {
  player.prevX = player.x;
  player.prevY = player.y;

  if(keys["ArrowLeft"] || keys["KeyA"]) {
    player.velX = -player.speed;
    player.facing = -1;
  } else if(keys["ArrowRight"] || keys["KeyD"]) {
    player.velX = player.speed;
    player.facing = 1;
  } else player.velX = 0;

  player.action = player.velX !== 0 ? "run" : "idle";

  player.velY += player.gravity;

  player.x += player.velX;
  player.onGround = false;
  player.wallSliding = false;
  player.canWallJump = false;

  // 水平碰撞
  for(let plat of platforms){
    if(player.x + player.width > plat.x &&
       player.x < plat.x + plat.width &&
       player.y + player.height > plat.y &&
       player.y < plat.y + plat.height){
      if(player.prevX + player.width <= plat.x){
        player.x = plat.x - player.width;
        player.canWallJump = "left";
        player.wallSliding = true;
      } else if(player.prevX >= plat.x + plat.width){
        player.x = plat.x + plat.width;
        player.canWallJump = "right";
        player.wallSliding = true;
      }
    }
  }

  // 垂直碰撞
  player.y += player.velY;
  for(let plat of platforms){
    if(player.x + player.width > plat.x &&
       player.x < plat.x + plat.width &&
       player.y + player.height > plat.y &&
       player.y < plat.y + plat.height){
      if(player.velY > 0 && player.prevY + player.height <= plat.y){
        player.y = plat.y - player.height;
        player.velY = 0;
        player.onGround = true;
        player.x += plat.velX || 0;
        player.y += plat.velY || 0;
      } else if(player.velY < 0 && player.prevY >= plat.y + plat.height){
        player.y = plat.y + plat.height;
        player.velY = 0;
      }
    }
  }

  if(player.wallSliding && player.velY > 2) player.velY = 2;

  if(keys["ArrowUp"] || keys["Space"] || keys["KeyW"]){
    if(player.onGround){
      player.velY = -player.jumpPower;
    } else if(player.wallSliding && !player.hasWallJumped){
      player.velY = -player.jumpPower;
      player.velX = player.canWallJump === "left" ? player.speed : -player.speed;
      player.hasWallJumped = true;
      player.facing = player.velX > 0 ? 1 : -1;
    }
  }

  if(player.onGround || !player.wallSliding) player.hasWallJumped = false;

  // 掉落判断
  if(player.y > canvas.height){
    alertMessage = "掉落！";
    alertColor = "red";
    alertTimer = alertDuration;
    fallCount++;
    resetGame();
    if(fallCount >= 3) captureBtn.style.display = "block";
  }

  // 到达终点
  if(player.x < goal.x + goal.width &&
     player.x + player.width > goal.x &&
     player.y < goal.y + goal.height &&
     player.y + player.height > goal.y){
    alertMessage = "胜利！";
    alertColor = "yellow";
    alertTimer = alertDuration;
    gameOver = true;
  }

  cameraX = player.x - canvas.width/2 + player.width/2;
  cameraY = player.y - canvas.height/2 + player.height/2;
  if(cameraY > 0) cameraY = 0;

  player.frameCount++;
  if(player.action === "idle") {
    player.frameX = 1;
    player.frameY = 0;
  } else if(player.action === "run") {
    if(player.frameCount % 10 === 0){ 
      player.frameX = (player.frameX + 1) % 3;
      player.frameY = 2;
    }
  }
}

function resetGame(){
  player.x = 270;
  player.y = 300;
  player.velX = 0;
  player.velY = 0;
  player.hasWallJumped = false;
  gameOver = false;
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-cameraX, -cameraY);

  // 平台
  ctx.fillStyle = "#444";
  for(let plat of platforms){
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }

  // 玩家
  if(playerSprite.complete){
    const frameW = playerSprite.width / 3;
    const frameH = playerSprite.height / 4;

    ctx.save();
    ctx.translate(player.x + player.width/2, player.y);
    ctx.scale(player.facing, 1);
    ctx.drawImage(
      playerSprite,
      player.frameX * frameW,
      player.frameY * frameH,
      frameW,
      frameH,
      -player.width/2,
      0,
      player.width,
      player.height
    );
    ctx.restore();
  } else {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  // goal
  if(goalSprite.complete){
    const frameW = goalSprite.width / 3;
    const frameH = goalSprite.height / 4;
    const spriteRow = 0;
    const spriteCol = 1;
    const scale = 1.2;
    const drawW = frameW * scale;
    const drawH = frameH * scale;
    ctx.drawImage(
      goalSprite,
      spriteCol * frameW,
      spriteRow * frameH,
      frameW,
      frameH,
      goal.x,
      goal.y - (drawH - goal.height),
      drawW,
      drawH
    );
  } else {
    ctx.fillStyle = "gold";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
  }

  // 开局提示
  if(showStartMessage){
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    const x = cameraX + canvas.width/2;
    let y = cameraY + canvas.height/4;
    for(let i=0;i<startMessageLines.length;i++){
      ctx.fillText(startMessageLines[i], x, y + i*25);
    }
  }

  if(alertTimer > 0){
    ctx.fillStyle = alertColor;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(alertMessage, cameraX + canvas.width/2, cameraY + canvas.height/2);
    alertTimer--;
  }

  ctx.restore();
}

function gameLoop(){
  if(!gameOver){
    updatePlatforms();
    updatePlayer();
  }
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.getElementById('exitBtn').addEventListener('click', () => {
    window.close();
});

