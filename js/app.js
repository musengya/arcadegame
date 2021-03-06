// Declaring the variables
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

// Enemies our player must avoid
let Enemy = function (x, y, speed) {

    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field 
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -40;
        this.speed = 200 + Math.floor(Math.random() * 222);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
}

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
let Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The image of the player of horn-girl is added to the playing field 
    this.sprite= "images/char-horn-girl.png";
};

Player.prototype.update = function (dt) {
   
}

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == "left" && this.x > 0) {
        this.x -= 102;
    };

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == "right" && this.x < 405) {
        this.x += 102;
    };

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (keyPress == "up" && this.y > 0) {
        this.y -= 83;
    };

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == "down" && this.y < 405) {
        this.y += 83;
    };

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position and display modal
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
            modal.classList.add("show-modal");
						closeButton.addEventListener("click", toggleModal);
						window.addEventListener("click", windowOnClick);
        }, 1000);
    };
};


// All enemies are placed in an array
let allEnemies = [];

// Position of the 3 enemies on the y axis located on the stone road
const enemyPosition = [62, 146, 232];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
const player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
    document.addEventListener("keyup", event => {
        const allowedKeys = {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
        player.handleInput(allowedKeys[event.keyCode]);
    });


    // Add restart button to the instruction section

   const restart = document.querySelector("#restart");
           restart.addEventListener("click", function() {
           window.location.reload();
   });
   
   // function for the modal
   function toggleModal() {
           modal.classList.toggle("show-modal");
   }
   
   function windowOnClick(event) {
           if (event.target === modal) {
                   toggleModal();
           }
   }
   
   // restart button for the modal
   const restartModal = document.querySelector("#restart-modal");
        restartModal.addEventListener("click", function() {
        window.location.reload();
});