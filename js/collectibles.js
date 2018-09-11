
//Gems
let Gems = function(x, y) {
	this.x = -300;
    this.y = -300;
    this.sprite = 'images/Gem Blue.png';
	
	this.xGemLocation = [400, 300, 200, 100];
    this.yGemLocation = [230, 145, 60];
};

Gems.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gems.prototype.update = function () {
	const gemArray = [
              'images/Gem Blue.png',
              'images/Gem Green.png',
              'images/Gem Orange.png'
	];
	
	if (player.x + 80 > this.x && 
	player.x < this.x + 80 && 
	player.y + 50 > this.y && 
	player.y < this.y + 50) {
		this.sprite = gemArray[Math.floor(Math.random() * gemArray.length)];
		score += 10;

	// Initially, the gem should be invisible, outside the canvas
		this.x = -300;
		this.y = -300;
	// But after the time is elapsed, the gem appears
		setTimeout(() => {
			this.x = this.xGemLocation[Math.floor(Math.random() * this.xGemLocation.length)];
			this.y = this.yGemLocation[Math.floor(Math.random() * this.yGemLocation.length)];
		}, Math.random() * 200);
	}
}

//keys
let Key = function(x, y) {
	this.x = -500;
    this.y = -400;
    this.sprite = 'images/Key.png';
	
	this.xKeyLocation = [400, 300, 200, 100];
    this.yKeyLocation = [220, 108, 47];
};

Key.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Key.prototype.update = function () {
	if (player.x + 80 > this.x && 
	player.x < this.x + 80 && 
	player.y + 50 > this.y && 
	player.y < this.y + 50) {
		
		score += 20;
	// Initially, the gem should be invisible, outside the canvas
		this.x = -300;
		this.y = -300;
	// But after the time is elapsed, the gem appears
		setTimeout(() => {
			this.x = this.xKeyLocation[Math.floor(Math.random() * this.xKeyLocation.length)];
			this.y = this.yKeyLocation[Math.floor(Math.random() * this.yKeyLocation.length)];
		}, Math.random() * 200);
	}
}

let Star = function(x, y) {
	this.x = -400;
    this.y = -100;
    this.sprite = 'images/Key.png';
	
	this.xStarLocation = [400, 300, 200, 100];
    this.yStarLocation = [37, 80, 90];
};

Star.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//stars
Star.prototype.update = function () {
	if (player.x + 80 > this.x && 
	player.x < this.x + 80 && 
	player.y + 50 > this.y && 
	player.y < this.y + 50) {
		score += 20;

	// Initially, the gem should be invisible, outside the canvas
		this.x = -300;
		this.y = -300;
	// But after the time is elapsed, the gem appears
		setTimeout(() => {
			this.x = this.xStarLocation[Math.floor(Math.random() * this.xStarLocation.length)];
			this.y = this.yStarLocation[Math.floor(Math.random() * this.StarLocation.length)];
		}, Math.random() * 200);
	}
}

//instantiate objects
const gem = new Gems();
const key = new Key();
const star = new Star();