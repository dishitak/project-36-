  
var dog,sadDog,happyDog, foodSObj, foodStock

var milk, milkImg;
var fedTime,lastTime,feed,addFoods;


function preload()
{
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/happydog.png");
  
  

}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
 

  foodobj=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,10,10);
  dog.addImage(sadDog);
  dog.scale = 0.15;

 feed = createButton("Feed the dong");
 feed.posititon(700,95);
 feed.mousePressed(feedDog);

 addFood = createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);
  
  
  
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.025;
  milk1.visible = false;


  for (var i = 5; i < 500; i=i+10) 
{

var dot = createSprite(i, 5, 3, 3);
dot.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(i, 495, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(495,i, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(5,i, 3, 3);
dot1.shapeColor = "blue";

}
}


function draw() {  
  background(46, 139, 87);

  foodsObj.display();
  fedTime = database.ref('FeedTime');
  feedTime.on("value",function(data)
  {
    lastFed = data.val();
  })

  fill(225,225,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed :"+lastFed%12+"PM",350,30);
   
  }
  else if(lastFed==0)
  {
     text("Last Feed: 12AM",350,30)

       
  }
 else{
   text("Last Feed :"+lastFed+"AM",350,30);
 }

 drawSprites();
}



  

function readStock(data)
{
  foodS = data.val();
  foodsObj = data.val(); 
  foodsObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime :hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update({
    FoodS:foodS
  })
}