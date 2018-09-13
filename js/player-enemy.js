
"use strict";

//Declaring global variables
let score = 0;
let level = 1;
let xStepValue = 105;
let yStepValue = 82;
const canvas = document.getElementById('canvas');
let openModal = document.getElementById('modal');
let closeModal = document.getElementById('close-modal');
let playButton = document.getElementById('play-button');
let replayButton = document.getElementById('replay');
let closeButton = document.getElementById('close-button');
let enemyLocation = [63, 147, 230];
let points = document.getElementById('msg');
let scoreCounter = document.querySelector(".score");
let levelCounter = document.querySelector(".level");
let scoreLevel = document.querySelector(".scoreLevel");

document.addEventListener("DOMContentLoaded", function (event) {
    openModal.classList.add('show');
    //Source: https://www.dl-sounds.com/royalty-free/fantasy-game-loop/
    var bgtrack = document.getElementById("bgtrack");
    bgtrack.autoplay = false;
    bgtrack.loop = true;
    bgtrack.volume = 0.7;
});

playButton.addEventListener('click', () => {
    scoreLevel.setAttribute('style', 'display: block');
    openModal.setAttribute('style', 'display: none');
    closeModal.setAttribute('style', 'display: none');
    bgtrack.play();
});

scoreCounter.innerHTML = `Score: ${score}`;
levelCounter.innerHTML = `Level: ${level}`;

// Enemies our player must avoid
let Enemy = function(x, y, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

let moreBugs = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    // load new set of enemies
    for (let i = 0; i <= numEnemies; i++) {
        let enemy = new Enemy(0, Math.random() * 184 + 50, 100+ Math.random() * 256);
        allEnemies.push(enemy);
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.velocity * dt;
	
	// make enemies loop to left side of canvas after reaching canvas.width
    if (this.x > 510) {
        this.x = -90;
        this.velocity = 100 + Math.floor(Math.random() * 222);
    }
	
	//On collision with bugs
	//Source: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
	if (player.x + 55 > this.x &&
		player.x  < this.x + 55 &&
		player.y + 50 > this.y &&
		player.y < this.y + 50) {
		player.reset();
		scoreCounter.innerHTML = `Score: ${score-= 3}`;
		points.classList.add("points");
		points.innerHTML = '<text style="color:red"> Aww! </text>';
		setTimeout(() => {
			points.classList.remove("points");
			points.innerText = '';
		}, 2500);
	}
};
    
    /*enemyLocation = [63, 147, 230];
    enemyLocation.forEach(function (locationY) {
        enemy = new Enemy(0, locationY, 200);
        allEnemies.push(enemy);*/

//when the player completes a level by reaching the water tiles
function nextLevel() {
	if (level <= 10) {
		scoreCounter.innerHTML = `Score: ${score+= 10}`;
		levelCounter.innerHTML = `Level: ${level++}`;
		points.classList.add("points");
		points.innerHTML = '<text style="color:green"> Well done! </text>';
		setTimeout(() => {
			points.classList.remove("points");
			points.innerText = '';
		}, 2500);
		moreBugs(level);
		setTimeout(() => {
			player.reset();
		}, 500);
	}
	else 
		displayScoreLevel();
}

let displayScoreLevel = () => {
    //call up congratulations modal when user reaches level 10 and reset all progress values
    bgtrack.pause();
    closeModal.setAttribute('style', 'display: block');
    scoreLevel.setAttribute('style', 'display: none');
    document.getElementById('results').innerHTML = `<h4> Whoop Whoop! You completed all levels!<br><br><br> Like to play again? Click the button below</h4>`;
    document.removeEventListener('keyup', keyPress);
    document.removeEventListener('touchstart', startTouch);
};

replayButton.addEventListener('click', () => {
    levelCounter.innerHTML = `Score: ${level = 1}`;
    scoreCounter.innerHTML = `Score: ${score = 0}`;
    scoreLevel.setAttribute('style', 'display: block');
    openModal.setAttribute('style', 'display: none');
    closeModal.setAttribute('style', 'display: none');
    bgtrack.play();
    document.addEventListener('keyup', keyPress, true);
    document.addEventListener('touchstart', startTouch, true);
});
	
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
enemyLocation.forEach(function(locationY) {
    // Now instantiate your objects.
    const enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// Now write your own player class
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), 
Player.prototype.updateImage = function(image) {
    this.sprite = `images/char-${image}.png`;
    this.render();
};
Player.prototype.reset = function() {
    player.x = 202;
    player.y = 405;
};

//render() 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// and a handleInput() method.
Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x -= xStepValue;
    }

    if (key == 'right' && this.x < 405) {
        this.x += xStepValue;
    }

    if (key == 'up' && this.y > 0) {
        this.y -= yStepValue;
        if (this.y < 0) {
            nextLevel();
        }
    }

    if (key == 'down' && this.y < 405) {
        this.y += yStepValue;
    }
    // returns player back to starting position when player reaches the water tiles
    if (this.y < 0) {
        setTimeout(() => {
            player.reset();
        }, 800);

    }
};

//Instantiate Object
const player = new Player(202, 405);

// player's character choice
const choiceForm = document.querySelector('.player-character');
choiceForm.addEventListener('submit', event => {
     event.preventDefault();

  // get the selected player icon
      let imageChoice;
      const images = [...choiceForm.querySelectorAll('input[name="player"]')];
      for (const image of images) {
          if (image.checked) {
              imageChoice = image.value;
              break;
          }
      }    
  player.updateImage(imageChoice);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

function keyPress(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyPress);
document.addEventListener('touchstart', startTouch, false);
document.addEventListener('touchmove', moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {

    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0 && player.x > 0) {
            // swiped left
            console.log("swiped left");
            player.x -= 102;
        } if (diffX < 0 && player.x < 405) {
            // swiped right
            console.log("swiped right");
            player.x += 102;
        }
    } else {
        // sliding vertically
        if (diffY > 0 && player.y > 0) {
            // swiped up
            console.log("swiped up");
            player.y -= 83;
            if (player.y < 0) {
                nextLevel();
            }

        } if (diffY < 0 && player.y < 405) {
            // swiped down
            console.log("swiped down");
            player.y += 83;
        }
    }

    initialX = null;
    initialY = null;
};
