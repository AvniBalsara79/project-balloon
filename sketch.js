var backgroundImg, backGround;
var bird,birdImg;
var enemy1,enemy2,enemy3,enemyImg;
var grass1,grass2,grass3,grassImg;
var stone1,stone2,stone3,stoneImg;
var bullet,bullet2,bullet3,bulletimg;
var lives=3,life1,life2,life,lifeimg;
var gameState=0;
var board,boardImg;
var diamond,diamond2,diamondImg;
var score = 0;
var edge;

function preload(){
  backgroundImg = loadImage('bg.jpg');
  birdImg = loadAnimation('b1.png','b2.png','b3.png','b4.png');
  enemyImg = loadAnimation('4.png','5.png','6.png','7.png','8.png','9.png',);
  grassImg = loadImage('1617523698490.png')
  stoneImg = loadImage('1617523632733.png')
  bulletimg = loadImage('1617519529904.png')
  boardimg = loadImage('1617528339326.png')
  diamondImg= loadImage('1617528531157.png')
  lifeimg= loadImage('lives.png')
}

function setup() {
   var canvas = createCanvas(800,950);

    //bird
    bird = createSprite(400,900, 100, 100);
    bird.addAnimation('flying',birdImg);
    bird.scale = 0.5;
    bird.velocityY = 0;

    bird.debug= false;
    bird.setCollider('circle',0,0,50);

    //enemy
    enemy1 = createSprite(60, 455, 100,100);
    enemy1.addAnimation('shooting',enemyImg);
    enemy1.scale=0.45;

    enemy2 = createSprite(60, 740,100,100);
    enemy2.addAnimation('shooting',enemyImg);
    enemy2.scale=0.45;

    enemy3 = createSprite(60, 210, 100,100);
    enemy3.addAnimation('shooting',enemyImg);
    enemy3.scale=0.45;

    //grass
    grass1 = createSprite(60,290,100,100);
    grass1.addImage(grassImg);
    grass1.scale=0.45

    grass2 = createSprite(60,535,100,100);
    grass2.addImage(grassImg);
    grass2.scale=0.45

    grass3 = createSprite(60,820,100,100);
    grass3.addImage(grassImg);
    grass3.scale=0.45

    //stone
    stone1 = createSprite(60,270,100,100);
    stone1.addImage(stoneImg);
    stone1.scale=0.45

    stone2 = createSprite(60,515,100,100);
    stone2.addImage(stoneImg);
    stone2.scale=0.45

    stone3 = createSprite(60,800,100,100);
    stone3.addImage(stoneImg);
    stone3.scale=0.4;

    bulletgrp = new Group();

    diamond = createSprite(400,50, 100, 100);
    diamond.addImage(diamondImg);
    diamond.scale = 0.5;
    diamond.visible=false

    diamond2 = createSprite(400,900, 100, 100);
    diamond2.addImage(diamondImg);
    diamond2.scale = 0.5;
    diamond2.visible= false

    life1 = createSprite(600,50);
    life1.addImage(lifeimg);
    life1.scale=0.11;

    life2 = createSprite(670,50);
    life2.addImage(lifeimg);
    life2.scale=0.11;

    life3 = createSprite(740,50);
    life3.addImage(lifeimg);
    life3.scale=0.11;
}

function draw() {

  background(backgroundImg);
  edge= createEdgeSprites();

  textSize(30);
  strokeWeight(8);
  stroke('black');
  fill('yellow');
  text('Score: '+score,20,80);

  if(gameState===0){

    bird.bounceOff(edge[2]);
    bird.bounceOff(edge[3]);

    if(keyDown(LEFT_ARROW)){
      bird.x = bird.x -10;
    }
  
    if(keyDown(RIGHT_ARROW)){
      bird.x = bird.x +10;
  }
  
  if(keyDown(DOWN_ARROW)){
    bird.velocityY= 4;
  }
  
  if(keyDown(UP_ARROW)){
    bird.velocityY=-4;
  }
 
  if(bird.isTouching(diamond)){
     
     diamond.destroy();
     score=score+1;
     bird.velocityY=-(6+score/5);
     bird.velocityY=(6+score/5);
     createDiamond2();

     console.log(bird.velocityY);
}

  if(bird.isTouching(diamond2)){
    
    diamond2.destroy();
    score=score+1;
    createDiamond();
}

  if(bulletgrp.isTouching(bird)){
      lives= lives-1;
  
     if(lives===2){
        life1.visible=false;
        //gameState=1;
      }
      
      else if(lives===1){
        life2.visible=false;
        //gameState=2;
      }
  
     else if(lives===0){
       life3.visible=false;
        //gameState=3;
      }
      
     bulletgrp.destroyEach();
      console.log(lives);
       if(lives===0){
          gameState=3;
       }
  }
  
  spawnBullets();
  //console.log(frameCount);
  //console.log(bird.y);

  drawSprites();
}

  if(gameState===3){

  textSize(50);
  stroke('darkBlue');
  strokeWeight(10);
  fill('Yellow');
  text('Oops!..You Lost the Game!!',105,450);
}

}

function spawnBullets(){
  if(frameCount % 50===0){

    //bullet
    bullet = createSprite(100, 210,80,100);
    bullet.addImage(bulletimg);
    bullet.scale=0.06;

    bullet.velocityX= 5;

    bulletgrp.add(bullet);
  }

  //bullet2
  if(frameCount % 60===0){
    bullet2 = createSprite(100, 450,80,100);
    bullet2.addImage(bulletimg);
    bullet2.scale=0.06;

    bullet2.velocityX= 5;

    bulletgrp.add(bullet2);
  }

  //bullet3
  if(frameCount % 70===0){
    bullet3 = createSprite(100, 750,80,100);
    bullet3.addImage(bulletimg);
    bullet3.scale=0.06;

    bullet3.velocityX= 5;

    bulletgrp.add(bullet3);
  }
}

function createDiamond(){
  diamond = createSprite(400,50, 100, 100);
  diamond.addImage(diamondImg);
  diamond.scale = 0.5;
}

function createDiamond2(){
    diamond2 = createSprite(400,900, 100, 100);
    diamond2.addImage(diamondImg);
    diamond2.scale = 0.5;
}
