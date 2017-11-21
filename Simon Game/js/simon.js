var patternGenerate = (function(){

	var pattern = [];
	
	function generateRandomNumber() {
		return Math.floor((Math.random() * 4));
	}

	function continueGame() {
		beginGame();
	}

	async function playPattern() {
		count=0;
		console.log(count);
		var getColor,colorFrom;
		
		var opacityChange = (getColor) => new Promise((res,rej)=>setTimeout(() => {
			getColor.style.opacity=0.2;
			res(true);
		},500));

		var opacityBack = (getColor) => new Promise((res,rej)=>setTimeout(() => {
			getColor.style.opacity = 1
			res(true);
		},1000));

		(async ()=>{
			console.log(pattern);
			for(i=0;i<pattern.length;i++)
			{
			  getColor = document.getElementById(`color${pattern[i]}`);
		      await opacityChange(getColor);
		      await opacityBack(getColor);
		    };
		})();	
		clickEvent(0);	
	}

	let count = 0;

	function clickEvent(count) {
		var colorDiv = document.querySelectorAll(".colors");
		colorDiv.forEach(function(div){
			div.addEventListener("click",once);
		});
	}

	function once(event){
				console.log(count);
				count++;
				id=event.target.id.charAt(event.target.id.length-1);
				userPress(id,count);
			};
	

	function userPress(id,count) {
		var result=checkIfRight(id,count);
		console.log(result);

		console.log(id,count);
		if(result)
		{
			if(count === pattern.length)
			{
				console.log("won");
				console.log(count);
				count = 0;
				console.log(count);
				beginGame();
			}
			else
			{
				console.log("continue");
				console.log(count);
			}
		}
		else
		{
			console.log("in here");
			console.log(count);
			count = 0;
			console.log(count);
			playPattern();
			//beginGame();
		}
	}

	function checkIfRight(color,id) {
		if(pattern[id-1] === Number(color))
			return true;
		return false;
	}

	function beginGame() {
		var colorNum = generateRandomNumber();
		pattern.push(colorNum);
		playPattern();
	}

	return {
		continueGame : continueGame
	}

})();

startGame();

function startGame() {

	var startButton = document.querySelector(".start");
	startButton.addEventListener("click",function(){
		patternGenerate.continueGame();
	});

}

