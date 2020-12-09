//Create variables here
var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;
var namebox;
var value;
var milkimg,milkbottle;
var currentTime;
var gameState,readState;
var sadDog;
function preload()
{
  dogimage = loadImage("dogimg.png");
  dogimage2 = loadImage("dogimg1.png");
  milkimg = loadImage("Milk.png");
  sadDog = loadImage("dogimg.png");

}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();
  //foodObj.updateFoodStock(20);

  dog = createSprite(450,300);
  dog.addImage(dogimage);
  dog.scale = 0.2;

  database = firebase.database();
  //food = database.ref('Food');
  //food.on("value",readStock);

  feed = createButton("Feed your dog");
  feed.position(650,200);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(770,200);
  addFood.mousePressed(addFoods);
  
  namebox = createInput('').attribute('placeholder','Your pet name');
  namebox.position(450,200)

  milkbottle = createSprite(370,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  value = namebox.value();
  console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  currentTime=hour();
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }
   if(gameState!="Hungry")
   {
     feed.hide();
     addFood.hide();
     namebox.hide();
     //dog.remove();
     dog.visible = 0;
   }
   else
   {
     feed.show();
     addFood.show();
     namebox.show();
     dog.visible = 1;
     //dog.addImage(sadDog)
   }
  console.log(currentTime);
  console.log(lastFed);
  if(currentTime === lastFed+1){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime === lastFed+2){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime <=lastFed+4 && currentTime >=lastFed+2 ){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
   console.log(gameState)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogimage);
  }
  else{
    dog.addImage(dogimage2);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogimage);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}

function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}

function update(state)
{

  database.ref('/').update({
    gameState:state
  });
}
