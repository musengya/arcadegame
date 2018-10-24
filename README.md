frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
//declare variables for the modals
const modal = document.querySelector(".start-game");
const overlay = document.querySelector(".overlay");
const gameover = document.querySelector("game-over");
const win = document.querySelector(".winner");

// starting points and lives
let playerPoints = 0;
let PlayerLives = 4;

// function to start game
function startGame() {
    modal.classList.add("hide");
    overlay.classList.add("hide");
}
// function when player looses all ives
function gameOver() {
    overlay.classList.add("show");
    gameover.classList.add("show");
}
//function to checklives
function checkLives() {
    if (alllives.length === 0) {
        gameOver()
    }
}



// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = y + 55; //more centered stroll across the blocks
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if enemy has not passed boundary
    if (this.x < this.boundary) {
        //move forward
        //increment x by speed * dt
        this.x += this.speed * dt; 
    } else {
        //reset position to start
        this.x = this.resetPos;
    }  
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
//Player has no speed
class Hero {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55; // We subtract 20px for  a more centered position
        this.x = this.startX;
        this.y = this.startY; 
        this.victory = false;
    }
    update() {
        //check collision here
        for (let enemy of allEnemies) {
            //Did player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                this.reset();
            } 
            if (this.y === 55) {
                this.victory = true;
            }
        }  
    }
    //reset Hero
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //update hero x and y property according to input
    handleInput(input) {
        switch (input) {
            case "left":
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case "up":
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case "right":
                if (this.x < this.step * 4) {
                this.x += this.step;
                }
                break;
            case "down":
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
}
//store new object in a variable called player
// Now instantiate your objects.
const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2= new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);


//Draw player on the screen

// Player update method

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {
}
    // Prevent player from moving beyond canvas wall boundaries
    /*if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};*/

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

    Player.prototype.handleInput = function (keyPress) {
  
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        };
    
        if (keyPress == 'right' && this.x < 405) {
            this.x += 102;
        };
    
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        };
    
        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
        };
      
        if (this.y < 0) {
            setTimeout(function () {
                this.x = 202;
                this.y = 405;
            }, 600);
    
        };
    };
    /*switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

// Position "y" where the enemies will are created
/*let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;*/
var enemyLocation = [63, 147, 230];


enemyLocation.forEach(function(LocationY) {
    enemy = new Enemy(0, LocationY, 200);
    allEnemies.push(enemy);
});
var player = new player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});