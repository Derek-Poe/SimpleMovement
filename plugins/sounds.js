function sound(src) {

	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);

	this.play = function(){

		this.sound.play();

	}

	this.stop = function(){

		this.sound.pause();
		this.sound.currentTime = 0;

	}

	this.pause = function(){

		this.sound.pause();

	}

}

game1BGM = new sound("sounds/Game1BGM.mp3");
game1BGM.sound.loop = true;

gameStartSound = new sound("sounds/GameStart.mp3");
pointSound = new sound("sounds/Point.mp3");
lossSound = new sound("sounds/Lose.mp3");
enemySpawnSound = new sound("sounds/EnemySpawn.mp3");
pewSound = new sound("sounds/Pew.mp3");
largeLaunchSound = new sound("sounds/LaunchLarge.mp3");
largeDetonateSound = new sound("sounds/BigPew.mp3");

