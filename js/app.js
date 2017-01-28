// Player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    // Sprites are for different player states - TBD
    this.spriteSwimming = 'images/char-horn-girl-swiming.png'; 
    this.spriteEaten = 'images/char-horn-girl-eaten.png';
};

// Player update method moves player around canvas a prevents
// player for exiting the canvas edges
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;

    // Constrain player to canvas boundry
    if(this.x <= 0) this.x = 0;
    if(this.x >= 400) this.x = 400;
    if(this.y <= 0) this.y = 0;
    if(this.y >=415) this.y = 415;
    // Put player back on starting bank
    if(this.y < 83) player.reset();

    player.collide();
};

// Player render method draws player on canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player handleInput method connects player movement to arrow keys
// in particular increments
Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left':
        this.x = this.x - 101;
        break;
        case 'up':
        this.y = this.y - 83;
        break;
        case 'right':
        this.x = this.x + 100;
        break;
        case 'down':
        this.y = this.y + 83;
        break;
    }
};

// Reset the player after a collision
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 415;
};

// Enemies class our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    // A helper we've provided will easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // Randomizes speed of enemies
    this.speed = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (90 - 30)) + 30;
    };
    this.speed = this.speed();
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Mltiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x = this.x + this.speed * dt;
    // Stop enemies from leaving the canvas forever
    if(this.x > 600) {
        this.x = 0;
    }
    return;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate objects
enemy1 = new Enemy(-101,166);
enemy2= new Enemy(-101,249);
enemy3 = new Enemy(-101,322);
enemy4 = new Enemy(-201,186);
enemy5= new Enemy(-301,269);
enemy6 = new Enemy(-201,332);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = new Player(202, 423);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Detect collisions between player and enemies
Player.prototype.collide = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            this.reset();
            break;
        }
    }
};