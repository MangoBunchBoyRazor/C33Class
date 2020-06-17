const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

   /* box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);*/
    createBodies();

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    //console.log(mouseX,mouseY);
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(bird.body);
       Body.setPosition(bird.body,{x: 200, y: 50});
    }
    console.log(keyCode);
    if(keyCode === 82){
        console.log("Working");
       /* Body.setPosition(box1.body,{x:700, y:320});
        Body.setPosition(box2.body,{x:920, y:320});
        Body.setPosition(pig1.body,{x:810, y:350});
        Body.setPosition(log1.body,{x:810, y:260});
        Body.setAngle(log1.body,PI/2);
        Body.setPosition(box3.body,{x:700, y:240});
        Body.setPosition(box4.body,{x:920, y:240});
        Body.setPosition(pig3.body,{x:810,y:220});
        Body.setPosition(log3.body,{x:810,y:180});
        Body.setAngle(log3.body,PI/2);
        Body.setPosition(box5.body,{x:810,y:160});
        Body.setPosition(log4.body,{x:760,y:120});
        Body.setAngle(log4.body,PI/7);
        Body.setPosition(log5.body,{x:870,y:120});
        Body.setAngle(log5.body,-PI/7);
        World.add(world, [pig1.body,pig3.body]);
        pig1.Visibility = 255;
        pig3.Visibility = 255;*/
        Body.setPosition(bird.body,{x:200, y:50});
        slingshot.attach(bird.body);
        deleteBodies();
        createBodies();
        score = 0;
        bird.trajectory = [];
    }
}
function createBodies(){
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
}
function deleteBodies(){
    World.remove(world, [box1.body, box2.body, box3.body, box4.body, box5.body,
                pig1.body, pig3.body, log1.body, log3.body, log4.body, log5.body]);
    box1 = null;
    box2 = null;
    pig1 = null;
    log1 = null;
    box3 = null;
    box4 = null;
    pig3 = null;
    log3 = null;
    box5 = null;
    log4 = null;
    log5 = null;
}
async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}