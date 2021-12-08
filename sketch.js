var JOGAR = 1;
var FIM = 0;
var estadoDoJogo = 1;

var faca,fruta ,monstro,grupoDasFrutas,grupoDoMonstro, pontuacao,r,frutaAleatoria, posicao;

var facaImage , fruta1, fruta2 ,fruta3,fruta4, monstroImage, fimDeJogoImage;

var facaSound,fimDeJogoSound;

function preload(){
  
  facaImage = loadImage("knife.png");
  monstroImage = loadAnimation("alien1.png","alien2.png")
  fruta1 = loadImage("fruit1.png");
  fruta2 = loadImage("fruit2.png");
  fruta3 = loadImage("fruit3.png");
  fruta4 = loadImage("fruit4.png");
  fimDeJogoImage = loadImage("gameover.png");
  
  facaSound = loadSound("knifeSwoosh.mp3");
  fimDeJogoSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
   faca = createSprite(40,200,20,20);
   faca.addImage(facaImage);
   faca.scale = 0.7
  
  faca.setCollider("rectangle",0,0,40,40);

  
   pontuacao = 0;
   grupoDasFrutas = new Group();
   grupoDoMonstro = new Group();
  
}

function draw() {
  background("lightblue");
  
  if(estadoDoJogo === JOGAR){
    
    Frutas();
    Monstro();
    
    faca.y = World.mouseY;
    faca.x = World.mouseX;
  
    if(grupoDasFrutas.isTouching(faca)){
      grupoDasFrutas.destroyEach();
      facaSound.play();
    if(pontuacao < 10){
      pontuacao ++;
     }
    else{
      pontuacao += 2;
     }
    }
    else
    {
      if(grupoDoMonstro.isTouching(faca)){
        estadoDoJogo = FIM;
        
        fimDeJogoSound.play();
        
        grupoDasFrutas.destroyEach();
        grupoDoMonstro.destroyEach();
        grupoDasFrutas.setVelocityXEach(0);
        grupoDoMonstro.setVelocityXEach(0);
        
        faca.addImage(fimDeJogoImage);
        faca.scale = 2;
        faca.x = 300;
        faca.y = 300;
      }
    }
  }
  
  if(pontuacao == 20){
    estadoDoJogo = FIM;
    fill("black");
    textSize(40);
    text("Você venceu!",200,200);
  }
  
  drawSprites();

  textSize(25);
  text("Pontuação : "+ pontuacao,250,50);
}


function Monstro(){
  if(World.frameCount%200 === 0){
    monstro = createSprite(400,200,20,20);
    monstro.addAnimation("Movendo", monstroImage);
    monstro.y = Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monstro.velocityX = -8 - (pontuacao);
    monstro.setLifetime = 50;
    
    grupoDoMonstro.add(monstro);
  }
}

function Frutas(){
  if(World.frameCount%80 === 0){
    posicao = Math.round(random(1,2));
    fruta = createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(posicao == 1)
    {
    fruta.x = 600;
    //update below give line of code for increase fruitGroup speed by 4
    fruta.velocityX = -3 - (pontuacao);
    }
    else
    {
      if(posicao == 2){
      fruta.x = 0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruta.velocityX = 3 + (pontuacao);
      }
    }
    
    fruta.scale = 0.2;
     //fruit.debug=true;
     r = Math.round(random(1,4));
    if (r == 1) {
      fruta.addImage(fruta1);
    } else if (r == 2) {
      fruta.addImage(fruta2);
    } else if (r == 3) {
      fruta.addImage(fruta3);
    } else {
      fruta.addImage(fruta4);
    }
    
    fruta.y = Math.round(random(50,550));
   
    
    fruta.setLifetime = 100;
    
    grupoDasFrutas.add(fruta);
  }
}