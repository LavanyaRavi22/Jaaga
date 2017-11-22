var patternGenerate = (function(){
	
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
			let audio=document.querySelector(`audio[data-key="${getColor.id}"]`);
			if(!audio) { return; }
			audio.currentTime=0;
			audio.play();
			res(true);
		},1000));

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

		var opacityBack = (getColor) => new Promise((res,rej)=>setTimeout(() => {
			getColor.style.opacity = 1;
			let audio=document.querySelector(`audio[data-key="${getColor.id}"]`);
			if(!audio) { return; }
			audio.currentTime=0;
			audio.play();
			res(true);
		},300));

		(async ()=>{
			console.log(pattern);
			getColor = document.getElementById(`color${id}`);
			  getColor.style.opacity=0.2;
		      await opacityBack(getColor);
		})();

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
				// console.log("won");
				count = 0;
				beginGame();
			}
			else
			{
				console.log("continue");
			}
		}
		else
		{
			var input = document.querySelector(".input");
			input.innerHTML = "!!";
			if(strict === 0)
			{
				count = 0;
				playPattern();
			}
			else
			{
				pattern=[];
				beginGame();
			}
		}
	}

	function checkIfRight(color,id) {
		if(pattern[id-1] === Number(color))
			return true;
		return false;
	}

	function beginGame() {
		if(pattern.length < 20)
		{
			var colorNum = generateRandomNumber();
			var input = document.querySelector(".input");
			pattern.push(colorNum);
			input.innerHTML = pattern.length;
			playPattern();
		}
		else
		{
			alert("You've won!");
			resetIt();
		}
	}

	function resetIt() {
		pattern=[];
		count=0;
		var input = document.querySelector(".input");
		input.innerHTML = "--";
		var isStrict = document.getElementById("center");
		strict=0;
		isStrict.classList.remove("isStrict");
		var strictButton = document.querySelector(".strict");
		strictButton.style.backgroundColor = "white";
	}

	return {
		continueGame : continueGame
	}

})();

startGame();
let strict = 0;
let pattern = [];

function startGame() {

	var strictButton = document.querySelector(".strict");
	strictButton.addEventListener("click",function(){
		var isStrict = document.getElementById("center");
		console.log(isStrict);
		isStrict.classList.toggle("isStrict");
		console.log(isStrict);
		if(isStrict.classList.contains("isStrict"))
		{
			strictButton.style.backgroundColor = "black";
			strict = 1;
		}
		else
		{
			strictButton.style.backgroundColor = "white";
			strict = 0;
		}
		//patternGenerate.continueGame();
	});

	var startButton = document.querySelector(".start");
	startButton.addEventListener("click",function(){
		pattern = [];
		patternGenerate.continueGame();
	});

}