var path,car;
var opponentPlayer1,player2,player3;
var pathImg,carImg;


var gameOverImg;

var opponentPlayer1,opponentPlayer2,opponentPlayer3;
var opp1Img,opp2Img,opp3Img; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  opp1Img=loadImage("car1.png");
  opp2Img=loadImage("car3.png");
  opp3Img=loadImage("car4.png");
  carImg=loadImage("car2.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;


car  = createSprite(70,150);
car.addImage(carImg)

  
car.setCollider("rectangle",0,0,20,20);
//car.debug=true;

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
opp1G = new Group();
opp2G = new Group();
opp3G = new Group();
  
 
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   car.y = World.mouseY;
  
   edges= createEdgeSprites();
   car .collide(edges);
  
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
 
  
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      redCyclists();
    } else if (select_oppPlayer == 2) {
     yellowCyclists();
    } else {
      opp1yclists();
    }
  }
  
   if(opp1G.isTouching(car)){
     gameState = END;
      opp1G.visible=false;
    }
    
    if(opp2G.isTouching(car)){
      gameState = END;
      opp2G.visible=false;
    }
    
    if(opp3G.isTouching(car)){
      gameState = END;
      opp3G.visible=false;
    }
    gameOver.visible = false;
    car.visible=true;
  
}else if (gameState === END) {
    gameOver.visible = true;
    car.visible=false;
    reset();
  
    
    path.velocityX = 0;
    car.visible=false;
   
    opp1G.setVelocityXEach(0);
    opp1G.setLifetimeEach(-1);
    opp1G.destroyEach();
    opp2G.setVelocityXEach(0);
    opp2G.setLifetimeEach(-1);
    opp2G.destroyEach();
    opp3G.setVelocityXEach(0);
    opp3G.setLifetimeEach(-1);
    opp3G.destroyEach();
  
    
}
  opp1G.lifetime=100;
  opp2G.lifetime=100;
  opp3G.lifetime=100;
}

function opp1yclists(){
        opponentPlayer1 =createSprite(1100,Math.round(random(50, 250)));
        opponentPlayer1.velocityX = -(6 + 2*distance/150);
        opponentPlayer1.addImage(opp1Img);
        opponentPlayer1.setLifetime=170;
        opp1G.add(opponentPlayer1);
}

function yellowCyclists(){
        opponentPlayer2 =createSprite(1100,Math.round(random(50, 250)));
        opponentPlayer2.velocityX = -(6 + 2*distance/150);
        opponentPlayer2.addImage(opp2Img);
        opponentPlayer2.setLifetime=170;
        opp2G.add(opponentPlayer2);
}

function redCyclists(){
        opponentPlayer3 =createSprite(1100,Math.round(random(50, 250)));
        opponentPlayer3.velocityX = -(6 + 2*distance/150);
        opponentPlayer3.addImage(opp3Img);
        opponentPlayer3.setLifetime=170;
        opp3G.add(opponentPlayer3);
}

function reset(){
  
  text("Press 'UP ARROW' to Restart",530,210);
 
   if(keyDown("UP_Arrow")){
  
      car.visible=true;
     distance=0;
   gameState=PLAY;
  
   opp1G.visible=false;
   opp3G.visible=false;
   opp2G.visible=false;
   
   
  
      
  }
  
  
  
  
  
  
}






