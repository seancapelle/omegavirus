var inquirer = require('inquirer');

var game = {
	virusCode: 33,
	virusRoom: 222,
	skill: 0,
	timer: 0,
	numPlayers: 0,
	virusSpeak: ['You human scum!', 'Help me, help me! Ah-ha-ha-ha!'],
	startGame: function(){
		//Starts the game
		inquirer.prompt({
			name: "action",
			type: "list",
			message: "Enter skill.",
			choices: ["0-Easy", "1-Medium", "2-Hard"]
		}).then(function(answer) {
			switch(answer.action) {
				case '0-Easy':
					game.setSkill(0);
				break;
				case '1-Medium':
					game.setSkill(1);
				break;
				case '2-Hard':
					game.setSkill(2);
				break;
			}
		})
	},
	setSkill: function(level){
		//Sets game skill level
		if (level == 0){
			console.log(0);
		}
		if (level == 1){
			console.log(1);
		}
		if (level == 2){
			console.log(2);
		}
		game.setPlayers();
	},
	setPlayers: function(){
		//Players enter secret code
			inquirer.prompt([{
				name: "red",
				type: "password",
				message: "Red, enter Secret Code: "
			}, {
				name: "yellow",
				type: "password",
				message: "Yellow, enter Secret Code: "
			}, {
				name: "green",
				type: "password",
				message: "Green, enter Secret Code: "
			}, {
				name: "blue",
				type: "password",
				message: "Blue, enter Secret Code: "
			}]).then(function(answer) {
				console.log(answer.action);

				var red = new Player(answer.red);
				console.log(red);

				var yellow = new Player(answer.yellow);
				console.log(yellow);

				var green = new Player(answer.green);
				console.log(green);

				var blue = new Player(answer.blue);
				console.log(blue);
			});
	},
	countDown: function(level, numPlayers){
		//Set clock and use reminders
	},
	speak: function(){
		//Narrate what happens
	},
	taunt: function(){
		//You human scum!
	},
	repeat: function(){
		//When repeat button used
	},
	accessCheck: function(){
		//Can user enter room
	},
	roomCheck: function(){
		//When user enters room #
	},
	giveItem: function(){
		//Computer gives item
	},
	takeItem: function(){
		//When virus removes an item
	},
	sayCode: function(){
		//Announced after roome explored
	},
	fireLaser: function(){
		//Shoot at commando, probe, or virus
	},
	teleport: function(){
		//Move commando to different docking bay
	},
	securityBreach: function(){
		//When room explored
	},
	closeSector: function(){
		//Close docking bays
	}
}

//Player constructor
function Player(virusCode){
	this.virusCode = virusCode,
	this.hasGreen = true,
	this.hasRed = false,
	this.hasBlue = false,
	this.hasYellow = false,
	this.hasNegatron = false,
	this.hasDisruptor = false,
	this.hasDecoder = false,
	this.hasProbe = false;
}

//Start the game
game.startGame();