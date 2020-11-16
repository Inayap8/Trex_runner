var trex, trex_runs, trexcollide;
var edges;
var ground;
var groundpic,x,y;
var invisibleground;
var cloudimage;
var o1, o2, o3, o4, o5, o6;
var score = 0
var A = 10
const B = 20
var cloudg;
var obstacleg;
var gamestate = 0
var gameover, restart;
var gameover1, restart1;
var jumpimage;

function preload() {
  trex_runs = loadAnimation("trex1.png", "trex2.png", "trex3.png");
jumpimage=loadAnimation("Jump (1).png","Jump (2).png","Jump (3).png","Jump (4).png","Jump (5).png","Jump (6).png","Jump (7).png","Jump (8).png","Jump (9).png","Jump (10).png","Jump (11).png","Jump (12).png")
  groundpic = loadImage("ground-1.png")
  cloudimage = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
 
  trexcollide = loadAnimation("Dead (8).png")
  gameover1 = loadImage("gameOver.png")
  restart1 = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200)
  trex = createSprite(30, 170, 20, 20);
  trex.addAnimation("trex running", trex_runs);
  trex.addAnimation("trex died", trexcollide)
  trex.addAnimation("trexjumps",jumpimage)
  trex.scale = 0.1
  edges = createEdgeSprites();
    
  x=0;
  y=width;
  
   invisibleground = createSprite(300, 195, 600, 10);

  cloudg = new Group();
  obstacleg = new Group();
  gameover = createSprite(300, 80, 20, 20);
  gameover.addImage(gameover1);
  gameover.scale = 0.6
  restart = createSprite(300, 120, 10, 10);
  restart.addImage(restart1)
  restart.scale = 0.5
  gameover.visible = false;
  restart.visible = false;

 trex.setCollider("circle",-50 ,0,250 )


}

function draw() {

 
  background("lightblue");
  if (gamestate == 0) {
    image(groundpic,x,180,width,20)
     image(groundpic,y,180,width,20)
    x=x-2
    y=y-2
    if (x<=-width){
      x=width
    }
    if (y<=-width){
      y=width
    }
    if (trex.y>165){
      trex.changeAnimation("trex running")
   }
    if (keyDown("space") && trex.y > 164) {
      trex.velocityY = -12
      score = score + 1
      trex.changeAnimation("trexjumps")
    }
    
    gameover.visible = false;
    restart.visible = false;

  
    
    trex.velocityY = trex.velocityY + 0.5
    createobstacles();
    createclouds();
    
    if (obstacleg.isTouching(trex)) {
      trex.changeAnimation("trex died")
      gamestate = 1
    }
    if (frameCount % 180 == 0) {
      score = score + 1
    }

  } else if (gamestate == 1) {
     image(groundpic,0,180,width,20)
    trex.y=180
     
    cloudg.setVelocityXEach(0)
    obstacleg.setVelocityXEach(0)
    trex.setVelocity(0, 0)
    cloudg.setLifetimeEach(-1)
    obstacleg.setLifetimeEach(-1)
    gameover.visible = true
    restart.visible = true;
    if (mousePressedOver(restart)) {
      obstacleg.destroyEach();
      cloudg.destroyEach();
      trex.changeAnimation("trex running")
      score = 0
      gamestate = 0
   
    }

  }

  trex.collide(invisibleground)
  invisibleground.visible = false



  text("score:" + score, 500, 20)



  drawSprites();

}

function createclouds() {
  if (frameCount % 60 == 0) {
    var clouds = createSprite(600, Math.round(random(10, 100)), 10, 10)
    clouds.addImage(cloudimage)
    clouds.scale = 0.5
    clouds.depth = trex.depth
    trex.depth = trex.depth + 1
    clouds.depth=gameover.depth
    gameover.depth=gameover.depth +1
    clouds.velocityX = -5;
    clouds.lifetime = 600 / 5
    cloudg.add(clouds)
  }
}

function createobstacles() {
  if (frameCount % 100 == 0) {
    var obstacle = createSprite(600, 170, 20, 20);
    obstacle.velocityX = -3;
    var r =Math.round(random(1, 4));
    switch (r) {
      case 1:
        obstacle.addImage(o1);
        obstacle.scale = 0.4    
        break;
      case 2:
        obstacle.addImage(o2)
        obstacle.scale = 0.4 
        obstacle.y=168
        break;
      case 3:
        obstacle.addImage(o3)
        obstacle.scale = 0.15
        obstacle.y=155
        break;
      case 4:
        obstacle.addImage(o4);
        obstacle.scale = 0.15
        obstacle.y=150
        obstacle.setCollider("rectangle",0,100,500,350 )
        break;
      
    }
    obstacle.lifetime = 600 / 3
    obstacleg.add(obstacle)
   
  }

}