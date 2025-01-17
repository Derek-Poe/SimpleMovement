//Start Game
window.addEventListener('load', startGame);

//Debug Mode Start
isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile != true) {

  isMobile = false;

}

if (isMobile == false) {

  alert("Debug Mode");
  debug = true;
  titleScreenActive = false;
  accelX = 0;
  accelY = 0;
  accelZ = 0;

}
else {

  debug = false;
  titleScreenActive = true;

}


//Variable Declarations
speed = 1;
growthRate = 0.05;
growthStarted = false;
var playerPieceGrowing;
enemySpeed = 0.5;
enemy2Speed = 0.55;
enemyProjectileSpeed = 3.25;
enemyFireRate = 4000;
enemyFiring = false;
enemyFiringLarge = false;
var activelyFiring;
var activelyFiringLarge;
var randomX;
var randomY;
var enemySpeedX;
var enemySpeedY;
var enemy2SpeedX;
var enemy2SpeedY;
var aimPositionX;
var aimPositionY;
var firePositionX;
var firePositionY;
game1Active = false;
game1Loss = false;
game1Score = 0;
game1HighScore = 0;
addon1 = false;
enemyPieceActive = false;
enemyPiece2Active = false;
gamePaused = false;
testActive = false;
var PlayerPiece;
var PointPiece1;
var EnemyPiece1;
var EnemyPiece2;
var EnemyProjectile1;
var LargeMain;
largeMainLaunched = false;
largeTraveling = false;
var LargeMini1;
var LargeMini2;
var LargeMini3;
var LargeMini4;
var LargeMini5;
var LargeMini6;
var LargeMini7;
var LargeMini8;
var LargeMini9;
var LargeMini10;
var LargeMini11;
var LargeMini12;
var LargeMini13;
var LargeMini14;
var LargeMini15;
var LargeMini16;
largeMiniSize = 3;
mainProjectileActive = false;
minisLaunched = false;
moreMinisLaunched = false;
gameAreaClearDisabled = false;
gameAreaSizeFactor = 1;
position = "(0, 0)";
auto = false;
accel = false;
rcolor = "";
backButtonCount = 0;
debugPassUsed = false;
lossDetectionEnabled = false;


//Provide Debug Information
document.getElementById("speedLabel").innerHTML = speed;
document.getElementById("positionLabel").innerHTML = position;
document.getElementById("playerPieceSizeLabel").innerHTML = "30 x 30";


//Start Basic Game Functions
function startGame() {

  if (debug == true) {

    PlayerPiece = new component(30, 30, "white", 305, 165, 0, 0);
    GameArea.start();
    increaseAreaSize();
    document.querySelector("#div1").style.visibility = "visible";

  }
  else {

    accelToggle();

    PlayerPiece = new component(0, 0, "black", 0, 0, 0, 0);
    GameArea.start();
    document.body.removeChild(document.querySelector("#div1"));
    fullScreen();

    document.querySelector("#canvas1").addEventListener('click', function() {

      if (titleScreenActive == true) {

        titleScreenActive = false;
        PlayerPiece = new component(30, 30, "white", ((GameArea.canvas.width / 2) - (PlayerPiece.width / 2)), ((GameArea.canvas.height / 2) - (PlayerPiece.height / 2)), 0, 0);
        startGame1();
      }

    });

  }

}


//Create Canvas
var GameArea = {

  canvas: document.createElement("canvas"),

  start: function() {

    this.canvas.id = "canvas1";
    this.canvas.width = 320;
    this.canvas.height = 180;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);

  },

  clear: function() {

    if (gameAreaClearDisabled == false) {

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

  }

}


//Create PlayerPiece
function component(width, height, color, x, y, speedX, speedY) {

  //PlayerPiece Attribute Declarations
  this.width = width;
  this.height = height;
  this.speedX = speedX;
  this.speedY = speedY;
  this.x = x;
  this.y = y;

  //Add PlayerPiece to Canvas
  this.update = function() {

    ctx = GameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //Move PlayerPiece
  this.newPos = function() {

    //PlayerPiece Speed Declarations
    this.x += this.speedX;
    this.y += this.speedY;
    position = "(" + Math.round(PlayerPiece.x) + ", " + Math.round(PlayerPiece.y) + ")";

    if (debug == true) {

      document.getElementById("positionLabel").innerHTML = position;

    }

    //Move PlayerPiece with Accelerometer		
    accelX = accelX * speed;
    accelY = accelY * speed;

    if (accel == true) {

      PlayerPiece.speedY = accelX;

    }

    if (accel == true) {

      PlayerPiece.speedX = accelY;

    }

    //Detect Collision with Point Block
    if (game1Active == true) {

      if (
        PlayerPiece.x < PointPiece1.x + PointPiece1.width &&
        PlayerPiece.x + PlayerPiece.width > PointPiece1.x &&
        PlayerPiece.y < PointPiece1.y + PointPiece1.height &&
        PlayerPiece.y + PlayerPiece.height > PointPiece1.y
      ) {

        startGame1();

      }

    }

    //AutoMove
    if (auto == true) {

      if (this.y <= -1) {

        randomColor();
        console.log(rcolor);
        PlayerPiece = new component(PlayerPiece.width, PlayerPiece.height, rcolor, PlayerPiece.x, PlayerPiece.y, PlayerPiece.speedX, PlayerPiece.speedY);
        PlayerPiece.speedY = speed;

      }
      else if (this.y >= GameArea.canvas.height - PlayerPiece.height + 1) {

        randomColor();
        console.log(rcolor);
        PlayerPiece = new component(PlayerPiece.width, PlayerPiece.height, rcolor, PlayerPiece.x, PlayerPiece.y, PlayerPiece.speedX, PlayerPiece.speedY);
        PlayerPiece.speedY = speed * -1;

      }
      else if (this.x <= -1) {

        randomColor();
        console.log(rcolor);
        PlayerPiece = new component(PlayerPiece.width, PlayerPiece.height, rcolor, PlayerPiece.x, PlayerPiece.y, PlayerPiece.speedX, PlayerPiece.speedY);
        PlayerPiece.speedX = speed;

      }
      else if (this.x >= GameArea.canvas.width - PlayerPiece.width + 1) {

        randomColor();
        console.log(rcolor);
        PlayerPiece = new component(PlayerPiece.width, PlayerPiece.height, rcolor, PlayerPiece.x, PlayerPiece.y, PlayerPiece.speedX, PlayerPiece.speedY);
        PlayerPiece.speedX = speed * -1;

      }

    }

    //Detect Collision with Wall and Create Boundary
    if (this.x <= -1) {

      if (this.y <= -1) {

        this.x = 0;
        this.y = 0;
      }
      else if (this.y >= GameArea.canvas.height - PlayerPiece.height + 1) {

        this.x = 0;
        this.y = GameArea.canvas.height - PlayerPiece.height;

      }
      else {

        this.x = 0;
        markBorderTouch();

      }

    }
    else if (this.y <= -1) {

      if (this.x <= -1) {

        this.x = 0;
        this.y = 0;

      }
      else if (this.x >= GameArea.canvas.width - PlayerPiece.width + 1) {

        this.x = GameArea.canvas.width - PlayerPiece.width;
        this.y = 0;

      }
      else {

        this.y = 0;
        markBorderTouch();

      }

    }
    else if (this.x >= GameArea.canvas.width - PlayerPiece.width + 1) {

      if (this.y <= -1) {

        this.x = GameArea.canvas.width - PlayerPiece.width;
        this.y = 0;

      }
      else if (this.y >= GameArea.canvas.height - PlayerPiece.height + 1) {

        this.x = GameArea.canvas.width - PlayerPiece.width;
        this.y = GameArea.canvas.height - PlayerPiece.height;

      }
      else {

        this.x = GameArea.canvas.width - PlayerPiece.width;
        markBorderTouch();

      }

    }
    else if (this.y >= GameArea.canvas.height - PlayerPiece.height + 1) {

      if (this.x >= GameArea.canvas.width - PlayerPiece.width + 1) {

        this.x = GameArea.canvas.width - PlayerPiece.width;
        this.y = GameArea.canvas.height - PlayerPiece.height;

      }
      else if (this.x <= -1) {

        this.x = 0;
        this.y = GameArea.canvas.height - PlayerPiece.height;

      }
      else {

        this.y = GameArea.canvas.height - PlayerPiece.height;
        markBorderTouch();

      }

    }

  }

}


//Create Game Scores on Canvas
function gameScores() {

  if (game1Active == true) {

    let score = GameArea.context;
    score.font = "25px Arial";

    if (game1Score <= game1HighScore) {

      score.fillStyle = "#00e600";

    }
    else {

      score.fillStyle = "#ffffa8";

    }

    score.fillText("Score: " + game1Score, GameArea.canvas.width - 110, 30);

    let highScore = GameArea.context;
    highScore.font = "25px Arial";
    highScore.fillStyle = "#00e600";
    highScore.fillText("High Score: " + game1HighScore, GameArea.canvas.width - 168, 60);

  }

}

function titleScreen() {

  if (titleScreenActive == true) {

    if (game1Loss == false) {

      let title = GameArea.context;
      title.font = "25px Arial";
      title.fillStyle = "#FFFF00";
      title.fillText("Simple Movement", (GameArea.canvas.width / 2) - 100, (GameArea.canvas.height / 2) - 10);

    }
    else {

      let title = GameArea.context;
      title.font = "25px Arial";
      title.fillStyle = "red";
      title.fillText("Try Again?", (GameArea.canvas.width / 2) - 100, (GameArea.canvas.height / 2) - 10);

    }

    let touchtostart = GameArea.context;
    touchtostart.font = "22px Arial";
    touchtostart.fillStyle = "#00e600";
    touchtostart.fillText("Touch to Start", (GameArea.canvas.width / 2) - 60, (GameArea.canvas.height / 2) + 35);

  }

}


//PlayerPiece and Enemy Projectile Creations
PointPiece1 = new component(0, 0, "black", 0, 0);
EnemyPiece1 = new component(0, 0, "black", 0, 0);
EnemyPiece2 = new component(0, 0, "black", 0, 0);
EnemyProjectile1 = new component(0, 0, "black", 0, 0);
LargeMain = new component(0, 0, "black", 0, 0);
LargeMini1 = new component(0, 0, "black", 0, 0);
LargeMini2 = new component(0, 0, "black", 0, 0);
LargeMini3 = new component(0, 0, "black", 0, 0);
LargeMini4 = new component(0, 0, "black", 0, 0);
LargeMini5 = new component(0, 0, "black", 0, 0);
LargeMini6 = new component(0, 0, "black", 0, 0);
LargeMini7 = new component(0, 0, "black", 0, 0);
LargeMini8 = new component(0, 0, "black", 0, 0);
LargeMini9 = new component(0, 0, "black", 0, 0);
LargeMini10 = new component(0, 0, "black", 0, 0);
LargeMini11 = new component(0, 0, "black", 0, 0);
LargeMini12 = new component(0, 0, "black", 0, 0);
LargeMini13 = new component(0, 0, "black", 0, 0);
LargeMini14 = new component(0, 0, "black", 0, 0);
LargeMini15 = new component(0, 0, "black", 0, 0);
LargeMini16 = new component(0, 0, "black", 0, 0);


//Move Enemys Toward Player/PointPiece
function enemySpeedCalculation() {

  //if(enemyPieceActive == true){

  if (EnemyPiece1.x + (EnemyPiece1.width / 2) < PlayerPiece.x + (PlayerPiece.width / 2)) {

    enemySpeedX = enemySpeed;

  }
  else if (EnemyPiece1.x + (EnemyPiece1.width / 2) > PlayerPiece.x + (PlayerPiece.width / 2)) {

    enemySpeedX = enemySpeed * -1;

  }
  else {

    enemySpeedX = 0;

  }

  if (EnemyPiece1.y + (EnemyPiece1.height / 2) < PlayerPiece.y + (PlayerPiece.height / 2)) {

    enemySpeedY = enemySpeed;

  }
  else if (EnemyPiece1.y + (EnemyPiece1.height / 2) > PlayerPiece.y + (PlayerPiece.height / 2)) {

    enemySpeedY = enemySpeed * -1;

  }
  else {

    enemySpeedY = 0;

  }

  //}

  //if(enemyPiece2Active == true){
  if (EnemyPiece2.x + (EnemyPiece2.width / 2) < PointPiece1.x + (PointPiece1.width / 2)) {

    enemy2SpeedX = enemy2Speed;

  }
  else if (EnemyPiece2.x + (EnemyPiece2.width / 2) > PointPiece1.x + (PointPiece1.width / 2)) {

    enemy2SpeedX = enemy2Speed * -1;

  }
  else {

    enemy2SpeedX = 0;

  }

  if (EnemyPiece2.y + (EnemyPiece2.height / 2) < PointPiece1.y + (PointPiece1.height / 2)) {

    enemy2SpeedY = enemy2Speed;

  }
  else if (EnemyPiece2.y + (EnemyPiece2.height / 2) > PointPiece1.y + (PointPiece1.height / 2)) {

    enemy2SpeedY = enemy2Speed * -1;

  }
  else {

    enemy2SpeedY = 0;

  }

  //}

}


//Choose Enemy Line of Fire
function enemyAimCalculation() {

  if (EnemyPiece1.x >= PlayerPiece.x - 20 && EnemyPiece1.x <= PlayerPiece.x + PlayerPiece.height + 20) {

    aimPositionX = 0;

  }
  else if (EnemyPiece1.x < PlayerPiece.x) {

    aimPositionX = 1;

  }
  else if (EnemyPiece1.x > PlayerPiece.x) {

    aimPositionX = -1;

  }

  if (EnemyPiece1.y >= PlayerPiece.y - 20 && EnemyPiece1.y <= PlayerPiece.y + PlayerPiece.height + 20) {

    aimPositionY = 0;

  }
  else if (EnemyPiece1.y < PlayerPiece.y) {

    aimPositionY = 1;

  }
  else if (EnemyPiece1.y > PlayerPiece.y) {

    aimPositionY = -1;

  }

}


//Move Enemys
function enemyPosition() {

  if (game1Loss == false) {

    if (enemyPieceActive == true) {

      EnemyPiece1.x += enemySpeedX;
      EnemyPiece1.y += enemySpeedY;

    }

    if (enemyPiece2Active == true) {

      EnemyPiece2.x += enemy2SpeedX;
      EnemyPiece2.y += enemy2SpeedY;

    }

    if (
      PlayerPiece.x < EnemyPiece1.x + EnemyPiece1.width &&
      PlayerPiece.x + PlayerPiece.width > EnemyPiece1.x &&
      PlayerPiece.y < EnemyPiece1.y + EnemyPiece1.height &&
      PlayerPiece.y + PlayerPiece.height > EnemyPiece1.y

    ) {
      if (lossDetectionEnabled == true) {
        alert("Enemy1Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < EnemyPiece2.x + EnemyPiece2.width &&
      PlayerPiece.x + PlayerPiece.width > EnemyPiece2.x &&
      PlayerPiece.y < EnemyPiece2.y + EnemyPiece2.height &&
      PlayerPiece.y + PlayerPiece.height > EnemyPiece2.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("Enemy2Loss");
      }
      enemyTouch();

    }

    if (
      PointPiece1.x < EnemyPiece2.x + EnemyPiece2.width &&
      PointPiece1.x + PointPiece1.width > EnemyPiece2.x &&
      PointPiece1.y < EnemyPiece2.y + EnemyPiece2.height &&
      PointPiece1.y + PointPiece1.height > EnemyPiece2.y
    ) {

      enemyScore();

    }

  }

}


//Move Enemy Projectile
function enemyProjectilePosition() {

  if (game1Loss == false) {

    if (enemyPieceActive == true) {

      EnemyProjectile1.x += firePositionX;
      EnemyProjectile1.y += firePositionY;

    }

    if (largeMainLaunched == true) {

      LargeMain.x += largeFirePositionX;
      LargeMain.y += largeFirePositionY;

    }

    if (minisLaunched == true) {

      LargeMini1.x += 0 * enemyProjectileSpeed;
      LargeMini1.y += 1 * enemyProjectileSpeed;
      LargeMini2.x += 1 * enemyProjectileSpeed;
      LargeMini2.y += 1 * enemyProjectileSpeed;
      LargeMini3.x += 1 * enemyProjectileSpeed;
      LargeMini3.y += 0 * enemyProjectileSpeed;
      LargeMini4.x += 1 * enemyProjectileSpeed;
      LargeMini4.y += -1 * enemyProjectileSpeed;
      LargeMini5.x += 0 * enemyProjectileSpeed;
      LargeMini5.y += -1 * enemyProjectileSpeed;
      LargeMini6.x += -1 * enemyProjectileSpeed;
      LargeMini6.y += -1 * enemyProjectileSpeed;
      LargeMini7.x += -1 * enemyProjectileSpeed;
      LargeMini7.y += 0 * enemyProjectileSpeed;
      LargeMini8.x += -1 * enemyProjectileSpeed;
      LargeMini8.y += 1 * enemyProjectileSpeed;

    }

    if (moreMinisLaunched == true) {

      LargeMini9.x += 0 * enemyProjectileSpeed;
      LargeMini9.y += 1 * enemyProjectileSpeed;
      LargeMini10.x += 1 * enemyProjectileSpeed;
      LargeMini10.y += 0 * enemyProjectileSpeed;
      LargeMini11.x += 1 * enemyProjectileSpeed;
      LargeMini11.y += 0 * enemyProjectileSpeed;
      LargeMini12.x += 0 * enemyProjectileSpeed;
      LargeMini12.y += -1 * enemyProjectileSpeed;
      LargeMini13.x += 0 * enemyProjectileSpeed;
      LargeMini13.y += -1 * enemyProjectileSpeed;
      LargeMini14.x += -1 * enemyProjectileSpeed;
      LargeMini14.y += 0 * enemyProjectileSpeed;
      LargeMini15.x += -1 * enemyProjectileSpeed;
      LargeMini15.y += 0 * enemyProjectileSpeed;
      LargeMini16.x += 0 * enemyProjectileSpeed;
      LargeMini16.y += 1 * enemyProjectileSpeed;

    }

    if (
      PlayerPiece.x < EnemyProjectile1.x + EnemyProjectile1.width &&
      PlayerPiece.x + PlayerPiece.width > EnemyProjectile1.x &&
      PlayerPiece.y < EnemyProjectile1.y + EnemyProjectile1.height &&
      PlayerPiece.y + PlayerPiece.height > EnemyProjectile1.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MainProjectileLoss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMain.x + LargeMain.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMain.x &&
      PlayerPiece.y < LargeMain.y + LargeMain.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMain.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("LargeProjectileLoss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini1.x + LargeMini1.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini1.x &&
      PlayerPiece.y < LargeMini1.y + LargeMini1.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini1.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile1Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini2.x + LargeMini2.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini2.x &&
      PlayerPiece.y < LargeMini2.y + LargeMini2.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini2.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile2Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini3.x + LargeMini3.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini3.x &&
      PlayerPiece.y < LargeMini3.y + LargeMini3.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini3.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile3Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini4.x + LargeMini4.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini4.x &&
      PlayerPiece.y < LargeMini4.y + LargeMini4.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini4.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile4Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini5.x + LargeMini5.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini5.x &&
      PlayerPiece.y < LargeMini5.y + LargeMini5.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini5.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile5Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini6.x + LargeMini6.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini6.x &&
      PlayerPiece.y < LargeMini6.y + LargeMini6.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini6.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile6Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini7.x + LargeMini7.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini7.x &&
      PlayerPiece.y < LargeMini7.y + LargeMini7.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini7.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile7Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini8.x + LargeMini8.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini8.x &&
      PlayerPiece.y < LargeMini8.y + LargeMini8.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini8.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile8Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini9.x + LargeMini9.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini9.x &&
      PlayerPiece.y < LargeMini9.y + LargeMini9.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini9.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile9Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini10.x + LargeMini10.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini10.x &&
      PlayerPiece.y < LargeMini10.y + LargeMini10.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini10.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile10Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini11.x + LargeMini11.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini11.x &&
      PlayerPiece.y < LargeMini11.y + LargeMini11.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini11.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile11Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini12.x + LargeMini12.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini12.x &&
      PlayerPiece.y < LargeMini12.y + LargeMini12.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini12.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile12Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini13.x + LargeMini13.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini13.x &&
      PlayerPiece.y < LargeMini13.y + LargeMini13.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini13.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile13Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini14.x + LargeMini14.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini14.x &&
      PlayerPiece.y < LargeMini14.y + LargeMini14.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini14.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile14Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini15.x + LargeMini15.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini15.x &&
      PlayerPiece.y < LargeMini15.y + LargeMini15.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini15.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile15Loss");
      }
      enemyTouch();

    }

    if (
      PlayerPiece.x < LargeMini16.x + LargeMini16.width &&
      PlayerPiece.x + PlayerPiece.width > LargeMini16.x &&
      PlayerPiece.y < LargeMini16.y + LargeMini16.height &&
      PlayerPiece.y + PlayerPiece.height > LargeMini16.y
    ) {
      if (lossDetectionEnabled == true) {
        alert("MiniProjectile16Loss");
      }
      enemyTouch();

    }

    if (
      EnemyProjectile1.x < 0 - EnemyProjectile1.width ||
      EnemyProjectile1.x > GameArea.canvas.width ||
      EnemyProjectile1.y < 0 - EnemyProjectile1.height ||
      EnemyProjectile1.y > GameArea.canvas.height
    ) {
      EnemyProjectile1 = new component(0, 0, "black", 0, 0);

    }

  }

}


//Ensure Enemies and Projectiles are Off of the Canvas
function clearEnemies() {

  if (enemyPieceActive == false) {

    EnemyPiece1 = new component(0, 0, "black", 0, 0);
    EnemyProjectile1 = new component(0, 0, "black", 0, 0);

  }

  if (enemyPiece2Active == false) {

    EnemyPiece2 = new component(0, 0, "black", 0, 0);

  }

  if (mainProjectileActive == false) {

    EnemyProjectile1 = new component(0, 0, "black", 0, 0);

  }

  if (largeMainLaunched == false) {

    LargeMain = new component(0, 0, "black", 0, 0);

  }

  if (minisLaunched == false) {

    LargeMini1 = new component(0, 0, "black", 0, 0);
    LargeMini2 = new component(0, 0, "black", 0, 0);
    LargeMini3 = new component(0, 0, "black", 0, 0);
    LargeMini4 = new component(0, 0, "black", 0, 0);
    LargeMini5 = new component(0, 0, "black", 0, 0);
    LargeMini6 = new component(0, 0, "black", 0, 0);
    LargeMini7 = new component(0, 0, "black", 0, 0);
    LargeMini8 = new component(0, 0, "black", 0, 0);

  }

  if (moreMinisLaunched == false) {

    LargeMini9 = new component(0, 0, "black", 0, 0);
    LargeMini10 = new component(0, 0, "black", 0, 0);
    LargeMini11 = new component(0, 0, "black", 0, 0);
    LargeMini12 = new component(0, 0, "black", 0, 0);
    LargeMini13 = new component(0, 0, "black", 0, 0);
    LargeMini14 = new component(0, 0, "black", 0, 0);
    LargeMini15 = new component(0, 0, "black", 0, 0);
    LargeMini16 = new component(0, 0, "black", 0, 0);

  }

}


//Update on Canvas
function updateGameArea() {

  GameArea.clear();
  titleScreen();
  PlayerPiece.newPos();
  PlayerPiece.update();
  PointPiece1.update();
  EnemyPiece1.update();
  EnemyPiece2.update();
  EnemyProjectile1.update();
  enemyPosition();
  enemyProjectilePosition();
  gameScores();
  enemySpeedCalculation();
  enemyAimCalculation();
  LargeMain.update();
  LargeMini1.update();
  LargeMini2.update();
  LargeMini3.update();
  LargeMini4.update();
  LargeMini5.update();
  LargeMini6.update();
  LargeMini7.update();
  LargeMini8.update();
  LargeMini9.update();
  LargeMini10.update();
  LargeMini11.update();
  LargeMini12.update();
  LargeMini13.update();
  LargeMini14.update();
  LargeMini15.update();
  LargeMini16.update();
  clearEnemies();

}


//Increase Player Speed
function increaseSpeed() {
  //increaseSpeed = function(){
  speed += 1;

  if (debug == true) {

    document.getElementById("speedLabel").innerHTML = speed;

  }

}


//Decrease Player Speed
function decreaseSpeed() {

  if (speed > 0) {

    speed -= 1;

    if (debug == true) {

      document.getElementById("speedLabel").innerHTML = speed;

    }

  }

}


//Reset Player Speed
function resetSpeed() {

  speed = 1;

  if (debug == true) {

    document.getElementById("speedLabel").innerHTML = speed;

  }

}


//Increase Canvas Size
function increaseAreaSize() {

  document.documentElement.style.overflow = "hidden";
  gameAreaSizeFactor += 0.25;
  GameArea.canvas.width = (gameAreaSizeFactor * 20) * 16;
  GameArea.canvas.height = (gameAreaSizeFactor * 20) * 9;
  PlayerPiece.x = (GameArea.canvas.width / 2) - (PlayerPiece.width / 2);
  PlayerPiece.y = (GameArea.canvas.height / 2) - (PlayerPiece.height / 2);

  if (debug == true) {

    document.querySelector("#canvas1").style = "margin-left: auto; margin-right: auto";
    document.getElementById("areaSizeLabel").innerHTML = GameArea.canvas.width + " x " + GameArea.canvas.height;

  }

}


//Decrease Canvas Size
function decreaseAreaSize() {

  if (gameAreaSizeFactor != 0.25) {

    gameAreaSizeFactor -= 0.25;
    GameArea.canvas.width = (gameAreaSizeFactor * 20) * 16;
    GameArea.canvas.height = (gameAreaSizeFactor * 20) * 9;
    PlayerPiece.x = (GameArea.canvas.width / 2) - (PlayerPiece.width / 2);
    PlayerPiece.y = (GameArea.canvas.height / 2) - (PlayerPiece.height / 2);

    if (debug == true) {

      document.getElementById("areaSizeLabel").innerHTML = GameArea.canvas.width + " x " + GameArea.canvas.height;

    }

  }

}


//Fit Cavas Size to Mobile Device Screen
function fullScreen() {

  GameArea.canvas.width = document.querySelector("body").scrollWidth - 6;
  GameArea.canvas.height = document.querySelector("body").scrollHeight - 6;
  //GameArea.canvas.width = screen.width-6;
  //GameArea.canvas.height = screen.height-29.5;
  //GameArea.canvas.height += 25;
  //GameArea.canvas.width += 1;
  //GameArea.canvas.style = "width = 100%; height = 100%";

  if (debug == true) {

    document.getElementById("areaSizeLabel").innerHTML = GameArea.canvas.width + " x " + GameArea.canvas.height;

  }

  //document.getElementById("canvas1").scrollIntoView();	
  //window.scrollBy(screen.width, 0);
  //document.documentElement.style.overflow = "hidden";
  //document.body.style.overflow = "hidden";
  //document.querySelector("#canvas1").style.overflow = "hidden";

}


//Increase Player Size
function increasePlayerPieceSize() {

  PlayerPiece.width += 10;
  PlayerPiece.height += 10;

  if (debug == true) {

    document.getElementById("playerPieceSizeLabel").innerHTML = PlayerPiece.width + " x " + PlayerPiece.height;

  }

}


//Decrease Player Size
function decreasePlayerPieceSize() {

  if (PlayerPiece.width > 10) {

    PlayerPiece.width -= 10;
    PlayerPiece.height -= 10;

    if (debug == true) {

      document.getElementById("playerPieceSizeLabel").innerHTML = PlayerPiece.width + " x " + PlayerPiece.height;

    }

  }

}


//Move Player Left, Right, Up, and Down
function startLeft() {

  PlayerPiece.speedX = speed * -1;

}

function startRight() {

  PlayerPiece.speedX = speed;

}

function startUp() {

  PlayerPiece.speedY = speed * -1;

}

function startDown() {

  PlayerPiece.speedY = speed;

}


//Stop Player Movement Left and Right
function stopPieceX() {

  if (auto == true) {

    stopAuto();
    PlayerPiece.speedX = 0;

  }
  else {

    PlayerPiece.speedX = 0;

  }

}


//Stop Player Movement Up and Down
function stopPieceY() {

  if (auto == true) {

    stopAuto();
    PlayerPiece.speedY = 0;

  }
  else {

    PlayerPiece.speedY = 0;

  }

}


//Start and Stop Player Auto Movement ("ScreenSaver Mode")
function startAuto() {

  auto = true;
  game1Active = false;
  document.getElementById("autoEnableLabel").innerHTML = "Enabled";
  document.getElementById("autoEnableLabel").style = "color: green";
  PlayerPiece.speedY = speed - (speed * 2);
  PlayerPiece.speedX = speed;

}

function stopAuto() {

  auto = false;
  document.getElementById("autoEnableLabel").innerHTML = "Disabled";
  document.getElementById("autoEnableLabel").style = "color: black";
  PlayerPiece.speedY = 0;
  PlayerPiece.speedX = 0;

}


//Start and Stop Accelerometer Control
function accelToggle() {

  if (accel == false && debug == false) {

    accel = true;

    //redundant...
    if (debug == true) {

      document.getElementById("accelLabel").innerHTML = "Enabled";
      document.getElementById("accelLabel").style = "color: green";

    }

  }
  else if (game1Active == false && debug == false) {

    accel = false;
    document.getElementById("accelLabel").innerHTML = "Disabled";
    document.getElementById("accelLabel").style = "color: black";

  }

}


//Stop and Start Enemy Movement and Player Growth
function pauseGame() {

  if (gamePaused == false) {

    game1BGM.pause();
    enemySpeed = 0;
    enemyFireRate = 0;
    growthRate = 0;
    gamePaused = true;

  }
  else if (gamePaused == true) {

    game1BGM.play();
    enemySpeed = 0.5;
    enemyFireRate = 4000;
    gamePaused = false;

  }

}


//End Game on Wall Collision
function markBorderTouch() {

  if (game1Active == true) {

    if (game1Loss == false) {

      PlayerPiece = new component(0, 0, "black", 0, 0, 0, 0);
      PointPiece1 = new component(0, 0, "black", 0, 0, 0, 0);
      EnemyPiece1 = new component(0, 0, "black", 0, 0);
      EnemyPiece2 = new component(0, 0, "black", 0, 0);
      EnemyProjectile1 = new component(0, 0, "black", 0, 0);
      if (lossDetectionEnabled == true) {
        alert("BorderTouchLoss");
      }
      if (game1Loss == false) {

        game1BGM.stop();
        lossSound.play();

      }

      game1Loss = true;
      titleScreenActive = true;
      enemyPieceActive = false;
      enemyPiece2Active = false;

      if (game1Score >= game1HighScore && debugPassUsed == false) {

        game1HighScore = game1Score;

        if (debug == false) {

          localStorage.setItem("Game1 High Score", game1HighScore);

        }

      }

      debugPassUsed = false;

      clearInterval(playerPieceGrowing);
      growthStarted = false;

      clearInterval(activelyFiring);
      enemyFiring = false;
      clearInterval(activelyFiringLarge);
      enemyFiringLarge = false;

      if (largeTraveling != false) {

        clearInterval(largeTraveling);

      }

      LargeMain = new component(0, 0, "black", 0, 0);
      stopMinis();

    }

  }

}


//End Game on Enemy or Projectile Collision
function enemyTouch() {

  if (game1Loss == false) {

    PlayerPiece = new component(0, 0, "black", 0, 0, 0, 0);
    PointPiece1 = new component(0, 0, "black", 0, 0, 0, 0);
    EnemyPiece1 = new component(0, 0, "black", 0, 0);
    EnemyPiece2 = new component(0, 0, "black", 0, 0);
    EnemyProjectile1 = new component(0, 0, "black", 0, 0);
    game1BGM.stop();
    lossSound.play();
    game1Loss = true;
    titleScreenActive = true;
    enemyPieceActive = false;
    enemyPiece2Active = false;

    if (game1Score >= game1HighScore && debugPassUsed == false) {

      game1HighScore = game1Score;

      if (debug == false) {

        localStorage.setItem("Game1 High Score", game1HighScore);

      }

    }

    debugPassUsed = false;

    clearInterval(playerPieceGrowing);
    growthStarted = false;
    clearInterval(activelyFiring);
    enemyFiring = false;
    clearInterval(activelyFiringLarge);
    enemyFiringLarge = false;

    if (largeTraveling != false) {

      clearInterval(largeTraveling);

    }

    LargeMain = new component(0, 0, "black", 0, 0);
    stopMinis();

  }

}


//Generate Random X and Y Positions Away from Player
function generateRandomX() {

  let sideChoice = Math.floor(Math.random() * 2);
  let randomDecision;

  if (sideChoice == 0) {

    randomDecision = Math.floor(Math.random() * (PlayerPiece.x));

    if (randomDecision > (PlayerPiece.x - 50)) {

      generateRandomX();

    }
    else {

      randomX = randomDecision;

    }

  }
  else if (sideChoice == 1) {

    randomDecision = Math.floor(Math.random() * ((GameArea.canvas.width - EnemyPiece1.width) - (PlayerPiece.x + PlayerPiece.width)) + (PlayerPiece.x + PlayerPiece.width));

    if (randomDecision < (PlayerPiece.x + PlayerPiece.width + 50)) {

      generateRandomX();

    }
    else {

      randomX = randomDecision;

    }

  }


}

function generateRandomY() {

  let sideChoice = Math.floor(Math.random() * 2);
  let randomDecision;

  if (sideChoice == 0) {

    randomDecision = Math.floor(Math.random() * (PlayerPiece.y));

    if (randomDecision > (PlayerPiece.y - 50)) {

      generateRandomY();

    }
    else {

      randomY = randomDecision;

    }

  }
  else if (sideChoice == 1) {

    randomDecision = Math.floor(Math.random() * ((GameArea.canvas.height - EnemyPiece1.height) - (PlayerPiece.y + PlayerPiece.height)) + (PlayerPiece.y + PlayerPiece.height));

    if (randomDecision < (PlayerPiece.y + PlayerPiece.height + 50)) {

      generateRandomY();

    }
    else {

      randomY = randomDecision;

    }

  }

}


//Generate Random Color
function randomColor() {

  rcolor = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')';

}


//Increase Player Size by Growth Rate
function growPlayerPiece() {

  PlayerPiece.width += growthRate;
  PlayerPiece.height += growthRate;

  if (debug == true) {

    document.getElementById("playerPieceSizeLabel").innerHTML = PlayerPiece.width + " x " + PlayerPiece.height;

  }

}


//Game1 Super Function...
function startGame1() {


  //if(debug == false){
  //fullScreen();	
  //}

  if (game1Active == false) {

    speed = 0;
    game1Score = -1;

    if (localStorage.getItem("Game1 High Score") > 0) {

      game1HighScore = localStorage.getItem("Game1 High Score");

    }
    else {

      game1HighScore = 0;

    }

    gameStartSound.play();

  }

  if (game1Loss == true) {

    titleScreenActive = false;
    game1Score = 0;

  }

  if (game1Score == 0) {

    game1BGM.play();

  }

  if (growthStarted == false && game1Score == 0) {

    PlayerPiece.width += 2.5;
    PlayerPiece.height += 2.5;
    playerPieceGrowing = setInterval(growPlayerPiece, 50);
    growthStarted = true;

  }

  game1Active = true;
  generateRandomX();
  generateRandomY();

  PointPiece1 = new component(10, 10, "yellow", Math.floor(Math.random() * (GameArea.canvas.width - PlayerPiece.width - 5)) + 5, Math.floor(Math.random() * (GameArea.canvas.height - PlayerPiece.height - 5) + 5));
  //PointPiece1 = new component(10, 10, "#33d6ff", randomX, randomY);

  if (game1Active == true) {

    if (speed == 0) {

      PlayerPiece.x = ((GameArea.canvas.width / 2) - (PlayerPiece.width / 2));
      PlayerPiece.y = ((GameArea.canvas.height / 2) - (PlayerPiece.height / 2));
      PlayerPiece.width += 2.5;
      PlayerPiece.height += 2.5;
      speed = 0.875;

    }

    PlayerPiece = new component(PlayerPiece.width, PlayerPiece.height, "white", PlayerPiece.x, PlayerPiece.y, PlayerPiece.speedX, PlayerPiece.speedY);

  }

  if (game1Loss == true) {

    game1Loss = false;
    game1Score = 0;
    PlayerPiece = new component(30, 30, "white", ((GameArea.canvas.width / 2) - (PlayerPiece.width / 2)), ((GameArea.canvas.height / 2) - (PlayerPiece.height / 2)), PlayerPiece.speedX, PlayerPiece.speedY);

    if (debug == true) {

      document.getElementById("playerPieceSizeLabel").innerHTML = PlayerPiece.width + " x " + PlayerPiece.height;

    }

    PlayerPiece.x = (GameArea.canvas.width / 2) - (PlayerPiece.width / 2);
    PlayerPiece.y = (GameArea.canvas.height / 2) - (PlayerPiece.height / 2);
    game1BGM.play();
    resetSpeed();

  }
  else {

    speed += 0.125;
    PlayerPiece.width -= 2.5;
    PlayerPiece.height -= 2.5;

    if (debug == true) {

      document.getElementById("speedLabel").innerHTML = speed;
      document.getElementById("playerPieceSizeLabel").innerHTML = PlayerPiece.width + " x " + PlayerPiece.height;

    }

    if (game1Score <= 98) {

      game1Score += 1;

    }

    if (testActive == true) {

      lossSound.stop();
      pointSound.stop();
      pointSound.play();

    }

  }

  if (game1Score >= 5) {

    spawnEnemy();

  }

  if (game1Score >= 10) {

    spawnEnemy2();

  }

  if (game1Score >= 15) {

    if (enemyFiring == false) {

      enemyFire();
      activelyFiring = setInterval(enemyFire, enemyFireRate);

    }

    enemyFiring = true;

  }

  if (game1Score >= 20) {

    if (enemyFiringLarge == false) {

      enemyFireLarge();
      activelyFiringLarge = setInterval(enemyFireLarge, enemyFireRate);

    }

    enemyFiringLarge = true;

  }

  testActive = true;

}


//Spawn Enemys
function spawnEnemy() {

  if (enemyPieceActive == false) {

    enemyPieceActive = true;
    generateRandomX();
    generateRandomY();
    EnemyPiece1 = new component(20, 20, "#CC6C0C", randomX, randomY);
    enemySpawnSound.play();

  }

}

function spawnEnemy2() {

  if (enemyPiece2Active == false) {

    enemyPiece2Active = true;
    generateRandomX();
    generateRandomY();
    EnemyPiece2 = new component(17.5, 17.5, "#9400F4", randomX, randomY);
    enemy2SpawnSound.play();

  }

}


//Subtract Point and Move PointPiece
function enemyScore() {

  if (game1Score > 0) {

    game1Score -= 1;
    enemyScoreSound.play();

  }

  PointPiece1 = new component(10, 10, "yellow", Math.floor(Math.random() * (GameArea.canvas.width - PlayerPiece.width - 5)) + 5, Math.floor(Math.random() * (GameArea.canvas.height - PlayerPiece.height - 5) + 5));

}


//Fire Enemy Projectile
function enemyFire() {

  if (enemyPieceActive == true) {

    mainProjectileActive = true;
    firePositionX = aimPositionX * enemyProjectileSpeed;
    firePositionY = aimPositionY * enemyProjectileSpeed;
    EnemyProjectile1 = new component(5, 5, "red", EnemyPiece1.x + (EnemyPiece1.width / 2), EnemyPiece1.y + (EnemyPiece1.height / 2));
    setTimeout(stopMainProjectile, enemyFireRate - 250);
    pewSound.play();

  }
}

//Fire Large Enemy Projectile
function enemyFireLarge() {

  if (enemyPieceActive == true) {

    largeMainLaunch();

  }

}

function largeMainLaunch() {

  largeFirePositionX = aimPositionX * (enemyProjectileSpeed / 3);
  largeFirePositionY = aimPositionY * (enemyProjectileSpeed / 3);
  LargeMain = new component(10, 10, "pink", EnemyPiece1.x + (EnemyPiece1.width / 2), EnemyPiece1.y + (EnemyPiece1.height / 2));
  largeTraveling = setInterval(largeMainTravel, 50);
  largeLaunchSound.play();
  largeMainLaunched = true;
  setTimeout(largeMainDetonate, 1250);

}

function largeMainTravel() {

  randomColor();
  LargeMain = new component(10, 10, rcolor, LargeMain.x, LargeMain.y);

}

function largeMainDetonate() {

  clearInterval(largeTraveling);
  launchMinis();
  largeDetonateSound.play();
  LargeMain = new component(0, 0, "black", 0, 0);
  largeMainLaunched = false;

}

function launchMinis() {

  minisLaunched = true;
  LargeMini1 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini2 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini3 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini4 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini5 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini6 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini7 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));
  LargeMini8 = new component(largeMiniSize, largeMiniSize, "red", LargeMain.x + (LargeMain.width / 2), LargeMain.y + (LargeMain.height / 2));

  if (game1Score >= 25) {

    setTimeout(launchMoreMinis, 650);

  }

  setTimeout(stopMinis, 7000);

}

function launchMoreMinis() {

  moreMinisLaunched = true;
  miniSplitSound.play();
  LargeMini9 = new component(largeMiniSize, largeMiniSize, "red", LargeMini2.x + (LargeMini2.width / 2), LargeMini2.y + (LargeMini2.height / 2));
  LargeMini10 = new component(largeMiniSize, largeMiniSize, "red", LargeMini2.x + (LargeMini2.width / 2), LargeMini2.y + (LargeMini2.height / 2));
  LargeMini11 = new component(largeMiniSize, largeMiniSize, "red", LargeMini4.x + (LargeMini4.width / 2), LargeMini4.y + (LargeMini4.height / 2));
  LargeMini12 = new component(largeMiniSize, largeMiniSize, "red", LargeMini4.x + (LargeMini4.width / 2), LargeMini4.y + (LargeMini4.height / 2));
  LargeMini13 = new component(largeMiniSize, largeMiniSize, "red", LargeMini6.x + (LargeMini6.width / 2), LargeMini6.y + (LargeMini6.height / 2));
  LargeMini14 = new component(largeMiniSize, largeMiniSize, "red", LargeMini6.x + (LargeMini6.width / 2), LargeMini6.y + (LargeMini6.height / 2));
  LargeMini15 = new component(largeMiniSize, largeMiniSize, "red", LargeMini8.x + (LargeMini8.width / 2), LargeMini8.y + (LargeMini8.height / 2));
  LargeMini16 = new component(largeMiniSize, largeMiniSize, "red", LargeMini8.x + (LargeMini8.width / 2), LargeMini8.y + (LargeMini8.height / 2));

}

function stopMainProjectile() {

  mainProjectileActive = false;
  EnemyProjectile1 = new component(0, 0, "black", 0, 0);

}

function stopMinis() {

  minisLaunched = false;
  moreMinisLaunched = false;
  LargeMini1 = new component(0, 0, "black", 0, 0);
  LargeMini2 = new component(0, 0, "black", 0, 0);
  LargeMini3 = new component(0, 0, "black", 0, 0);
  LargeMini4 = new component(0, 0, "black", 0, 0);
  LargeMini5 = new component(0, 0, "black", 0, 0);
  LargeMini6 = new component(0, 0, "black", 0, 0);
  LargeMini7 = new component(0, 0, "black", 0, 0);
  LargeMini8 = new component(0, 0, "black", 0, 0);
  LargeMini9 = new component(0, 0, "black", 0, 0);
  LargeMini10 = new component(0, 0, "black", 0, 0);
  LargeMini11 = new component(0, 0, "black", 0, 0);
  LargeMini12 = new component(0, 0, "black", 0, 0);
  LargeMini13 = new component(0, 0, "black", 0, 0);
  LargeMini14 = new component(0, 0, "black", 0, 0);
  LargeMini15 = new component(0, 0, "black", 0, 0);
  LargeMini16 = new component(0, 0, "black", 0, 0);

}

//Listener for All KeyDown Events
document.addEventListener('keydown', function(event) {

  if (event.code == 'ArrowDown') {

    startDown();
  }

  if (event.code == 'ArrowUp') {

    startUp();

  }

  if (event.code == 'ArrowRight') {

    startRight();

  }

  if (event.code == 'ArrowLeft') {

    startLeft();

  }

  if (event.code == 'Digit2') {

    increaseSpeed();

  }

  if (event.code == 'Digit1') {

    decreaseSpeed();

  }

  if (event.code == 'KeyW') {

    increaseAreaSize();

  }

  if (event.code == 'KeyQ') {

    decreaseAreaSize();

  }

  if (event.code == 'KeyS') {

    increasePlayerPieceSize();

  }

  if (event.code == 'KeyA') {

    decreasePlayerPieceSize();

  }

  if (event.code == 'KeyP') {

    pauseGame();

  }

  if (event.code == 'Space') {

    startGame1();

  }

  if (event.code == 'Delete') {

    spawnEnemy();

  }

  if (event.code == 'Backquote') {

    accel = false;
    accelX = 0;
    accelY = 0;
    accelZ = 0;
    console.log("Accelerometer Disabled");

  }

  //Auto Move
  if (event.code == 'Backslash' || event.code == 'Escape') {

    if (auto == false && event.code != 'Escape') {

      startAuto();

    }
    else {

      stopAuto();

    }

  }

});

document.addEventListener('keyup', function(event) {

  if (event.code == 'ArrowDown') {

    stopPieceY();

  }

  if (event.code == 'ArrowUp') {

    stopPieceY();

  }

  if (event.code == 'ArrowRight') {

    stopPieceX();

  }

  if (event.code == 'ArrowLeft') {

    stopPieceX();

  }

});


//Back Button
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
  e.preventDefault();

  if (game1Active == true && game1Loss == false) {

    backButtonCount += 1

  }

  if (backButtonCount >= 7) {

    backButtonCount = 0;

    let debugPass = prompt("Enter Debug Password:");

    if (debugPass == "butts") {

      let debugActions = 0;

      let clearScoreResponse = prompt("Clear High Score? (y / n)")

      if (clearScoreResponse == "y") {

        game1HighScore = 0;
        localStorage.setItem("Game1 High Score", 0);

        debugActions += 1;

      }
      else if (clearScoreResponse == "n" || clearScoreResponse == "") {

        //nothing

      }
      else {

        alert("INVALID RESPONSE");

      }

      let enableLossDetection = prompt("Enable Loss Detection? (y / n)");

      if (enableLossDetection == "y") {

        lossDetectionEnabled = true;

        debugActions += 1;

      }
      else if (enableLossDetection == "n" || enableLossDetection == "") {

        //nothing

      }
      else {

        alert("INVALID RESPONSE");

      }

      let desiredScore = prompt("Enter Desired Score:");

      if (parseInt(desiredScore) >= 0) {

        game1Score += parseInt(desiredScore);

        debugActions += 1;

      }
      else if (desiredScore == "" || desiredScore == "n") {

        //nothing

      }
      else {

        alert("INVALID RESPONSE");

      }

      if (debugActions > 0) {

        debugPassUsed = true;

      }


    }
    else if (debugPass == "") {



    }
    else {

      alert("INVALID PASSWORD");

    }

  }

}
