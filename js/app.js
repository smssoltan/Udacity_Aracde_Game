/*
*Name: Sultan Shagal
*Project 3
*In this project we were to develop the functionality of the arcade game that was given.
*Using Object Oriented Programing principles to create objects, properties, and methods.

*/

let movement= 69 ; //how much of increment/decrement to the player's position upon moving.
let allEnemies =[]; //An array that will hold 3 objects of class Enemy
let player = new Player(); //creating a new object of class Player

// Enemies our player must avoid
let  Enemy = function(name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.name =name;    //name of the Enemy
    this.x=-100;    //position of x-axis
    this.y=60;      //position of the y-axis
    this.speed=5;   //initial speed
     
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //* A method that reinitialize the speed property to a random value of integer. 
    this.changeSpeed= function (){this.speed= Math.random()*69|39;}

    //* A method that makes the object change its x-axis position till it reaches the
    //*boundaries of the map. Then, it will restart at the initial position with a different
    //*random speed. 
    this.walking= function(){

        
        let obj = this;     //obj = the Enemy object itself

        let walkingOnX = setInterval(function(){    //loop
            
            obj.x+=obj.speed;   //increment the position of the x-axis by the object's speed.
            if(obj.x<510){
                // console.log('I am m working');       //*for debugging
                // console.log(obj.x);
                }
            
            if(obj.x>=510){//console.log('Reached the limit ! ');       //*when it reaches the position of
            obj.x=-110                                                  //* 510 or more, reset the x-axis position
            obj.changeSpeed();                                          //*to -100
            
            }
        },100); //repeat every 0.1 sec
        
    }    

    
};

//* Update the enemy's position. Creat 3 object of Enemy class 
//* push them to the array, then call the walking method.
(Enemy.prototype.update = function() {
    
    let Enemy1 = creatEnemies('Enemy1', Math.random()*101|0, 60);
    let Enemy2 = creatEnemies('Enemy2', Math.random()*101|0, 140);
    let Enemy3 = creatEnemies('Enemy3', Math.random()*101|0, 220);
    allEnemies.push(Enemy1, Enemy2, Enemy3)

    Enemy1.walking();
    Enemy2.walking();
    Enemy3.walking();
    
})();

//* Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//* Declaring the Player Class 
function Player(){

    this.sprite='images/char-boy.png';  //loading the player's image
    this.x= 200;        // assign x-axis position.
    this.y= 400;        // assign y-axis position.

 
    this.handleInput= function() {

       
    }
   
}
    //* Immediately invoked function that is declared in the object's prototype.
    //* Update the player's position. Also, we defined an object collision detection system.
    //* As well as, a canvas that has the winning condition, counter of a successful number of the player's attempt
    //* to reach the river. Lastly, an alert that the player will witness after beating the game.
(Player.prototype.update = function(dt) {

    let counter =0;         //counter of the player's attempt to reach the river. 
    
    scoreBoard(counter);    
    let temp =setInterval(function(){
        //console.log(getDistance(player.x, allEnemies[0].x, player.y, allEnemies[0].y ));
        let o = document.body.getElementsByTagName('div').item('canvas');   //the canvas that was created.
        if(getDistance(player.x, allEnemies[0].x, player.y, allEnemies[0].y)<=40 || //collision system
        getDistance(player.x, allEnemies[1].x, player.y, allEnemies[1].y) <=40||    //if any Enemy x,y position
        getDistance(player.x, allEnemies[2].x, player.y, allEnemies[2].y)<=40       //collide with a player x,y position.
        ){
            // reset the player's position to the initial position.
            player.y=400;
            player.x=200;
            counter=0;
            // reset counter value in the scoreboard
            o.getElementsByTagName('h1')[0].innerText= `\n Counter: ${counter}`;
            
        }
    })

    let tempo= setInterval(function(){      //loop
        
        let o = document.body.getElementsByTagName('div').item('canvas');   // canvas that was declared earlier

        if(player.y==-14){      // if the player reached the river
        //console.log('hit');
        
        // reset the player's position to the initial position.
        player.y=400;
        player.x=200;
    
        counter+=1;     // increment the value of counter.
        
        o.getElementsByTagName('h1')[0].innerText= `\n Counter: ${counter}`;    //Update counter in the scoreboard.
        //console.log(counter);
        
            //Using SweetAlert that makes beautiful success popup message. 
        if (counter ==5){swal({     //swal is pre declared keyword that is used in SweetAlert.
            title: "Well Done",
            text: `“I can accept failure, everyone fails at something. But I can’t accept not trying.” —Michael Jordan`,
            icon: "success",
            button: "Play Again" 
        })
        counter=0;  //reset counter to 0 to start a new game.
        // reset the scoreboard to 0
        o.getElementsByTagName('h1')[0].innerText= `\n Counter: ${counter}`;
    };
        
    }
    },400); //wait for a 0.4 sec after reaching the river.

})();

//* a function that uses the Pythagorean theorem to calculate the distance between 2 points.
function getDistance(x2,x1,y2,y1){

   let xDistance = x2-x1;
   let yDistance = y2-y1;

   return Math.sqrt(Math.pow(xDistance, 2)+ Math.pow(yDistance, 2))


}

//* a function that creat a Div, h1, h2, and h3 elements and adds them to the body in html.
//* Also, it creates the score boards that keep the user up with the number of successfully attempt.
function scoreBoard(){

    let div = document.createElement("DIV");
    // let canvas = document.createElement("CANVAS");
    let title = document.createElement("H1");
    let title2 = document.createElement("H2");
    let title3 = document.createElement("H3");
    // canvas.style.background= "#ededed";
    div.style.background= "#ededed";
    
    title.innerHTML= `\n Counter: 0`;
    title2.innerHTML=`Try to pass to the river without colliding with a bug.`;
    title3.innerHTML =' \n Winning condition: pass 5 times without any collision'
    title.style.color="black";
    title2.style.color="black";
    title3.style.color="black";
    // canvas.appendChild(title);
    div.appendChild(title);
    div.appendChild(title2);
    div.appendChild(title3);
    document.body.appendChild(div);


}
//* method to draw the player's image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

      //* a function that return a new object of Enemy class with name, speed, y-axis position
      //* of the user's choice.
function creatEnemies(name, speed, y){
    let anEnemy= new Enemy(name);
    anEnemy.y=y;
    
    anEnemy.speed=speed;
    return anEnemy;
    
}

//* This listens for key presses and sends the keys to your
//* Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //console.log(keyCode); //*for debugging
    //console.log(e);

    //* upon hearing for this specific keys(left, right, down, up),
    //*increment/decrement the player's position on the x and y axis by 70.
    //console.log(e.keyCode)
    if(e.keyCode==37 &&player.x>0){
        //console.log('left')
        player.x=player.x-movement;}
    if(e.keyCode==39 &&player.x<400){
        //console.log('right')
        player.x=player.x+movement;}

    if(e.keyCode==40 &&player.y<400){
        //console.log('down')
        player.y=player.y+movement;}
    
    if(e.keyCode==38 &&player.y>0){
        //console.log('Up')
        player.y=player.y-movement;}
    
        player.handleInput(allowedKeys[e.keyCode]); 
    
   
});
