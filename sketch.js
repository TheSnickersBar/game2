// created all the global variables
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle, obstacles1,obstacles2, obstacles3,obstacles4, obstacles5, obstacles6;
var score = 0;
var clouds, cloudsimage;
var obstaclesGroup;
var cloudsGroup;
var play = 1;
var end = 0;
var gamestate = play;
var gameOver;
var restart;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  // trex image
  trex_collided = loadImage("trex_collided.png");
  // ground image
  groundImage = loadImage("ground2.png")
  // all of the obstacles images
  obstacles1 = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");
  obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");
  cloudsimage = loadImage("cloud.png")
  gameoverimage = loadImage("gameOver.png");
  reset = loadImage("restart.png");
}


function setup() {
  
  createCanvas(600, 200);
  // create trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collidedform",trex_collided);
  trex.scale = 0.5;
  // create ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  // create invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  // created obstacles and clouds groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  gameOver = createSprite(300,50,30,20);
  gameOver.addImage("gameovertext",gameoverimage);
  restart = createSprite(300,100,30,30);
  restart.addImage("restart button",reset);
}

function draw() {
  background(245);
  trex.collide(invisibleGround);
  text(score,570,40);
  
  // playstate
  if (gamestate === play)  {
  
  ground.velocityX = -2;
  gameOver.visible = false;
  restart.visible = false;
  // trex jump
  if(keyDown("space") && trex.y > 161 ) {
    trex.velocityY = -13;
  }
  
  //console.log(trex.y);
  trex.velocityY = trex.velocityY + 0.7
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  

  
  score = score + Math.round(getFrameRate()/60);
  
  
  spawnClouds();
  spawnObstacles();
    
  if(trex.isTouching(obstaclesGroup)) {
    gamestate = end;
  }
  
  }
  
  
  // what to do in end state
  else if(gamestate === end) {
    gameOver.visible = true;
    restart.visible = true;
 trex.changeAnimation("collidedform",trex_collided);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
  }
  
  // if restart sprite is pressed back to play state
  if(mousePressedOver(restart)) {
    gamestate = play;
    cloudsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;
  }
  drawSprites();
  
}

// creates the obstacles
function spawnObstacles() {
  if (frameCount%100 === 0) {
  obstacle = createSprite(600,160,20,20);
  obstacle.velocityX = -6;
  var rand = Math.round(random(1,6));
  
  switch (rand) {
  
    case 1: obstacle.addImage(obstacles1);
    break;
    case 2: obstacle.addImage(obstacles2);
    break;
    case 3: obstacle.addImage(obstacles3);
    break;
    case 4: obstacle.addImage(obstacles4);
    break;
    case 5: obstacle.addImage(obstacles5);
    break;
    case 6: obstacle.addImage(obstacles6);
    break;
    default : break;
  }
    obstacle.lifetime = 100;
    obstacle.scale = 0.6;
    obstaclesGroup.add(obstacle);
  }
}
  
// created the clouds
function spawnClouds() {
  if (frameCount%70 === 0) {
    var randomizer = Math.round(random(80,120));
    clouds = createSprite(600,randomizer,20,20);
    clouds.velocityX = -5;
    clouds.addImage(cloudsimage);
    clouds.scale = 0.7;
    clouds.depth = trex.depth;
    clouds.depth = clouds.depth - 1;
    clouds.lifetime = 120;
    
    cloudsGroup.add(clouds);
                                
    
    
    
  }
}