class Food {
    constructor(){
        this.foodStock = 20;
        this.lastFed = 0;
        this.x=0;
        this.image = loadImage("Milk.png");
        this.bedroomimg = loadImage("virtual pet images/Bed Room.png");
        this.gardenimg = loadImage("virtual pet images/Garden.png");
        this.washroomimg = loadImage("virtual pet images/Wash Room.png");
    }

    updateFoodStock(food){
        this.foodStock = food;
        database.ref('/').update({
            Food: food
        });
    }
    getFoodStock(){
        this.x = database.ref('Food');
        this.x.on("value",(data)=>{
            this.foodStock=data.val();
          })
    }
    deductFood(){
        this.foodStock--;
        updateFoodStock(this.foodStock);
    }

    display(){

     var x = 80, y = 100;
     imageMode(CENTER);
     if(gameState === "Hungry"){
        if(this.foodStock != 0){
             for(var i = 0; i < this.foodStock; i++){
                 if(i % 10 === 0){
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y, 50, 50);
                x += 30; 
            }
        }
     }
    }
    bedroom(){
      // background(this.bedroomimg);
      image(this.bedroomimg,200,200,600,600);

    }
    async garden(){
       
       image(this.gardenimg,200,200,600,600);
    }
    washroom(){
        image(this.washroomimg,200,200,600,600);
    }

}
