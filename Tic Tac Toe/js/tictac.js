//The Game - Player
// var playModule=(function(){
	

	

// 	return {
		
// 	}

// })();

//The Game - Computer
var computerModule = (function(){

	function changeSign(sign) {
		var compSign;
		(sign === "X") ? compSign = "O" : compSign = "X";
		return compSign;
	}

	function generateRandomPos(flag) {
		var count=0,countFlag=0;
		var randomNumber1,randomNumber2;
		flag.forEach(function(el){
			el.forEach(function(el2){
				if(el2===1)
					countFlag++;
			})
		});
		console.log(countFlag);
		if(countFlag < 9)
		{

			while(count === 0) {
				randomNumber1 = Math.floor((Math.random() * 3));
				randomNumber2 = Math.floor((Math.random() * 3));
				if(flag[randomNumber1][randomNumber2] === 0)
				{
					flag[randomNumber1][randomNumber2] = 1;
					count = 1;
				}
			}
			return `${randomNumber1}${randomNumber2}`;
		}
		else
			return null;
	}

	return {
		changeSign : changeSign,
		generateRandomPos : generateRandomPos
	}

})();

var startGame = function() {
	var playerSign;
	var sign = document.querySelectorAll(".sign");
	var arr= [[ , , ],[ , , ],[ , , ]];
    var flagArr= [[0,0,0],[0,0,0],[0,0,0]];

	function getTheSign(s){									// Getting the initial sign
		var playSign=s.id;
		var getSignDiv = document.getElementById("playAs");
		getSignDiv.style.display = "none";
		var getPlayDiv = document.getElementById("playDiv");
		playDiv.style.display = "inline-block";
		return playSign;
	}

	function updateSign(id,sign) {							//Updating the sign
		arr[id.split('')[0]][id.split('')[1]] = sign;
		flagArr[id.split('')[0]][id.split('')[1]] = 1;
		console.log(arr,flagArr);
	}


	sign.forEach(function(s){
		s.addEventListener("click",function(){
			playerSign = getTheSign(s);
			console.log(playerSign);
			//playModule.displaySign(playerSign);
		})
	});

	var tiles = document.querySelectorAll("td");

	tiles.forEach(function(tile){
		tile.addEventListener("click",function(){
			var id = tile.id;	
			if(flagArr[id.split('')[0]][id.split('')[1]] === 0)					// ID of the clicked tile
				proceedGame(id,tile);
		});
	});

	function proceedGame(id,tile) {
		updateSign(id,playerSign);
		tile.innerHTML = playerSign;

		//check if won

		//else
		playerSign = computerModule.changeSign(playerSign); 	//change Sign for computer
		console.log(playerSign);

		var pos = computerModule.generateRandomPos(flagArr);	//generate random position
		console.log(pos);

		if(pos)
		{
			var getTD = document.getElementById(pos);
			console.log(getTD);
			getTD.innerHTML = playerSign;							//update the document

			playerSign = computerModule.changeSign(playerSign); 	//change the sign again
		}
	} 	

};

startGame();