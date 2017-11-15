//Get the Sign
var playerSign;
var sign = document.querySelectorAll(".sign");

sign.forEach(function(s){
	s.addEventListener("click",function(){
		playerSign = getTheSign(s);
		console.log(playerSign);
		playModule.displaySign(playerSign);
	})
});

function getTheSign(s){
	var playSign=s.id;
	var getSignDiv = document.getElementById("playAs");
	getSignDiv.style.display = "none";
	var getPlayDiv = document.getElementById("playDiv");
	playDiv.style.display = "inline-block";
	return playSign;
}

//The Game - Player
var playModule=(function(){
    var arr= [[ , , ],[ , , ],[ , , ]];
    var flagArr= [[0,0,0],[0,0,0],[0,0,0]];

	function displaySign(playerSign){
		var tiles = document.querySelectorAll("td");
		//console.log(tiles);

		tiles.forEach(function(tile){
			tile.addEventListener("click",function(){
				var id = tile.id;
				arr[id.split('')[0]][id.split('')[1]] = playerSign;
				flagArr[id.split('')[0]][id.split('')[1]] = 1;
				tile.innerHTML = playerSign;
				console.log(arr,flagArr);
				computerModule.changeSign(playerSign);
			});
		});
	}

	return {
		displaySign : displaySign
	}

})();


//The Game - Computer
var computerModule = (function(){

	var computerSign;
	function changeSign(sign) {
		(sign === "X") ? computerSign = "O" : computerSign = "X";
		console.log(computerSign);
	}

	return {
		changeSign : changeSign

	}

})();




