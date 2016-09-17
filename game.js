//Require node package
var inquirer = require('inquirer');

// //Commandos
// var red = {
// 	name: 'Red',
// 	virusCode: null,
// 	hasGreen: true,
// 	hasRed: false,
// 	hasBlue: false,
// 	hasYellow: false,
// 	hasNegatron: false,
// 	hasDisruptor: false,
// 	hasDecoder: false,
// 	hasProbe: false,
// 	items: ['Green Access Card'],
// };
// var yellow = {
// 	name: 'Yellow',
// 	virusCode: null,
// 	hasGreen: true,
// 	hasRed: false,
// 	hasBlue: false,
// 	hasYellow: false,
// 	hasNegatron: false,
// 	hasDisruptor: false,
// 	hasDecoder: false,
// 	hasProbe: false,
// 	items: ['Green Access Card'],
// };
// var green = {
// 	name: 'Green',
// 	virusCode: null,
// 	hasGreen: true,
// 	hasRed: false,
// 	hasBlue: false,
// 	hasYellow: false,
// 	hasNegatron: false,
// 	hasDisruptor: false,
// 	hasDecoder: false,
// 	hasProbe: false,
// 	items: ['Green Access Card'],
// };
// var blue = {
// 	name: 'Blue',
// 	virusCode: null,
// 	hasGreen: true,
// 	hasRed: false,
// 	hasBlue: false,
// 	hasYellow: false,
// 	hasNegatron: false,
// 	hasDisruptor: false,
// 	hasDecoder: false,
// 	hasProbe: false,
// 	items: ['Green Access Card'],
// };

//Omega Virus
var game = {
	virusCode: 33, //How to set to player's secret code? if explored room == virusRoom, display this.player's viruscode
	virusRoom: '2.2.2',
	virusSector: 'purple',
	room: ['0.0.0','0.0.1','0.0.2','0.1.0','0.1.1','0.1.2',
			'0.2.0','0.2.1','0.2.2','1.0.0','1.0.1','1.0.2',
			'1.1.0','1.1.1','1.1.2','1.2.0','1.2.1','1.2.2',
			'2.0.0','2.0.1','2.0.2','2.1.0','2.1.1','2.1.2'],
	dockingBay: ['Red Docking Bay', 'Yellow Docking Bay', 'Green Docking Bay', 'Blue Docking Bay'],
	sectorName: ['Red Sector', 'Yellow Sector', 'Green Sector', 'Blue Sector'],
	redSector: ['0.0.0','0.0.1','0.0.2','0.1.0','0.1.1','0.1.2'],
	yellowSector: ['2.0.0','2.0.1','2.0.2','2.1.0','2.1.1','2.1.2'],
	greenSector: ['1.1.0','1.1.1','1.1.2','1.2.0','1.2.1','1.2.2'],
	blueSector: ['0.2.0','0.2.1','0.2.2','1.0.0','1.0.1','1.0.2'],
	items: ['Red Access Card', 'Yellow Access Card', 'Blue Access Card', 'Probe', 'Negatron', 'Decoder', 'Disruptor'],
	skill: 0,
	timer: 0,
	numPlayers: 0,
	playerNumber: -1,
	players: [],
	playerCodes: [],
	virusSpeak: ['You human scum!', 'Help me, help me! Ah-ha-ha-ha!', 'You fool!'],
	startGame: function(){
		//Starts the game
		
		//Pick random virus room
		game.setVirus();

		//Select skill level
		inquirer.prompt({
			name: "difficulty",
			type: "list",
			message: "Enter skill.",
			choices: ["0-Easy", "1-Medium", "2-Hard"]
		}).then(function(answer) {
			switch(answer.difficulty) {
				case '0-Easy':
					game.skill = 0;
				break;
				case '1-Medium':
					game.skill = 1;
				break;
				case '2-Hard':
					game.skill = 2;
				break;
			}

			//Move to setting players
			game.setPlayers();
		})
	},
	setPlayers: function(){
		//Players enter secret code

			//Ask players for secret code
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

			//Populate players if answer provided
				if (answer.red != ''){
					game.numPlayers++;
					game.players.push("Red");
					game.playerCodes.push(answer.red);
				}
				if (answer.yellow != ''){
					game.numPlayers++;
					game.players.push("Yellow");
					game.playerCodes.push(answer.yellow);
				}
				if (answer.green != ''){
					game.numPlayers++;
					game.players.push("Green");
					game.playerCodes.push(answer.green);
				}
				if (answer.blue != ''){
					game.numPlayers++;
					game.players.push("Blue");
					game.playerCodes.push(answer.blue);
				}
			
				//Create the players
				game.createPlayers();		
			})
			
			
	},
	//Player constructor
	Player: function(name, virusCode){
			this.name = name,
			this.virusCode = virusCode,
			this.hasGreen = true,
			this.hasRed = false,
			this.hasBlue = false,
			this.hasYellow = false,
			this.hasNegatron = false,
			this.hasDisruptor = false,
			this.hasDecoder = false,
			this.hasProbe = false,
			this.items = ['Green Access Card'];
	},
	createPlayers: function(){									
		//Loop through players and create them
		
		for (var i = 0; i < game.players.length; i++){

			//Send each player into Player constructor
			game.players[i] = new game.Player(game.players[i],game.playerCodes[i]);
		}

		//Randomize player order
		game.shufflePlayers();

		//Set timer with relevant # of players
		game.setTimer();
},	
	shufflePlayers: function(){
		//Randomize player order and keep synced wih playerCodes

			for (var i = game.players.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = game.players[i];
					var temp2 = game.playerCodes[i];
					game.players[i] = game.players[j];
					game.players[j] = temp;
					game.playerCodes[i] = game.playerCodes[j];
					game.playerCodes[j] = temp2;
			}	

//HOW YOU CALL A PLAYER COLOR
console.log(game.players[0].name);
		
	},
	setVirus: function(){
		//Set the room for virus

		//Pick random room
		game.virusRoom = game.room[Math.floor(Math.random() * game.room.length)];

		//Search eacter sector for virusRoom, and set virusSector to the respective sector
		for (var i = 0; i < game.redSector.length; i++){
				if (game.virusRoom == game.redSector[i]) {
					game.virusSector = game.sectorName[0];
			}
		}
		for (var i = 0; i < game.yellowSector.length; i++){
				if (game.virusRoom == game.yellowSector[i]) {
					game.virusSector = game.sectorName[1];
			}
		}
		for (var i = 0; i < game.greenSector.length; i++){
				if (game.virusRoom == game.greenSector[i]) {
					game.virusSector = game.sectorName[2];
			}
		}
		for (var i = 0; i < game.blueSector.length; i++){
				if (game.virusRoom == game.blueSector[i]) {
					game.virusSector = game.sectorName[3];
			}
		}
	},
	setTimer: function(){
		//Determine timer length

		//Shortcuts for game.numPlayers and game.skill
		var players = game.numPlayers;
		var level = game.skill;

		if (players == 1 && level == 2 || players == 2 && level == 2){
			console.log("Either 1 player on level 2, or 2 players on level 2: 10 mins");
			//10 minutes
			game.timer = 600;
		}
		else if (players == 3 && level == 2 || players == 4 && level ==2 || players == 1 && level == 1 || players == 2 && level == 1){
			console.log("Either 3-4 players on level 2, 1 player on level 1, or 2 players on level 1: 15 mins");
			//15 minutes
			game.timer = 900;
		}
		else if (players == 3 && level == 1 || players == 1 && level == 0){
			console.log("Either 3 players on level 1, or 1 player on level 0: 20 mins");
			//20 minutes
			game.timer = 1200;
		}
		else if (players == 4 && level == 1 || players == 2 && level == 0){
			console.log("Either 4 players on level 1, or 2 players on level 0: 25 mins");
			//25 minutes
			game.timer = 1500;
		}
		else if (players == 3 && level == 0){
			console.log("3 players on level 0: 30 mins");
			//30 minutes
			game.timer = 1800;
		}
		else if (players == 4 && level == 0){
			console.log("4 players on level 0: 35 mins");
			//35 minutes
			game.timer = 2100;
		}
		//Start count down
		//game.countDown();

		//Set the current player
		game.nextPlayer();
	},
	countDown: function(level, numPlayers){
		//Set clock and announce time every five minutes

		//Announce time every five minutes
		if (game.timer % 300 == 0){
			
			var timeCount = (game.timer / 60);

			console.log(timeCount + " minutes until I take over.");
		}
		console.log(game.timer);
		
		//Timer counts down
		var clock = setInterval(game.countDown, 1000);

		if(game.timer > 0){
			
			//Decrement time
			game.timer--;
		}
	},
	nextPlayer: function(){
		//Cycle through all players

			game.playerNumber++;

			if (game.playerNumber > game.players.length){
				//Reset back to index 0
				game.playerNumber = 0;
			}

		//Setup currentPlayer to the playerNumber index of players
		var currentPlayer = game.players[game.playerNumber].name;

		//Go to round
		game.round(currentPlayer);

	},
	round: function(currentPlayer){
		//Current player's turn
		
			console.log(currentPlayer + ", hurry! We are running out of time.");
			
			inquirer.prompt({
				name: "action",
				type: "list",
				message: "Choose action",
				choices: ["0-Pass", "1-Attack", "2-Explore"]
			}).then(function(answer){
				switch(answer.action) {
					case '0-Pass':
						console.log("Pass");
						// game.passTurn();
					break;
					case '1-Attack':
						console.log("Attack");
						// game.attack();
					break;
					case '2-Explore':
					console.log("Explore");
						// game.explore();
					break;
				}
			})
		
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
	passTurn: function(){
		console.log("Pass the turn");

	},
	attack: function(){
		console.log("Attacking");
	},
	explore: function(){
		//Can user enter room?
		console.log("Explore");
	},
	// roomCheck: function(){
	// 	//When user enters room #
	// },
	giveItem: function(){
		//Computer gives item
	},
	takeItem: function(){
		//When virus removes an item
	},
	sayCode: function(){
		//Announced after room explored
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

// //Player constructor
// function Player(name, virusCode){
// 	this.name = name,
// 	this.virusCode = virusCode,
// 	this.hasGreen = true,
// 	this.hasRed = false,
// 	this.hasBlue = false,
// 	this.hasYellow = false,
// 	this.hasNegatron = false,
// 	this.hasDisruptor = false,
// 	this.hasDecoder = false,
// 	this.hasProbe = false,
// 	this.items = ['Green Access Card'];
// }

//Start the game
game.startGame();

// game.round();