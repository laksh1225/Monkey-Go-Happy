var backImage,backgr;
var monkey, monkey_running;
var obstacle , obstacleImage;
var ground,ground_img;
var FoodGroup , obstaclesGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  invisibleGround = createSprite(400,390,1000,10);
  invisibleGround.velocityX = -4;
  invisibleGround.x = invisibleGround.width/2;
  invisibleGround.visible = false;

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
    }
    

  if(FoodGroup.isTouching(monkey)){
    score = score + 2; 
    FoodGroup.destroyEach();
    }
    
    
    if(obstaclesGroup.isTouching(monkey)){
       monkey.scale = 0.10;
    
    }
      
      switch(score){
      case 10 : monkey.scale = 0.12;
                break;
      case 20 : monkey.scale = 0.14;
                break;
      case 30 : monkey.scale = 0.16;
                break;
      case 40 : monkey . scale = 0.18;
                break;
        default : break;
    }
      
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  
  }
    
    food();
    obstacles();
    
    monkey.collide(invisibleGround);
    
       
    drawSprites();
    
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Score : " + score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time 😁 :" + survivalTime,100,50);
 

}


function food(){
  if(frameCount%80 === 0){
  banana = createSprite(600,Math.round(random(100,180)),10,10);
  banana.velocityX = -5;
  banana.setLifeTime = 500;
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.08;
  
  FoodGroup.add(banana);
  
  }
  }
  
  
  function obstacles(){
   if (frameCount % 60 === 0){
  var obstacle = createSprite(600,320,10,10);
  obstacle.velocityX = -(6 + score/100);
  obstacle.lifetime = 300;
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.1;
  
  obstaclesGroup.add(obstacle);
   }
  }
  