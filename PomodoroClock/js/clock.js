/* Altering the break and session time */
var change = document.querySelectorAll(".change");

change.forEach(function(el){
	el.addEventListener("click",function(){
		if(el.classList[0] === "changeBreak")
			alter("break",el.value);
		else if (el.classList[0] === "changeSession")
			alter("session",el.value);
	});
});

function alter(classChange,operator) {
	var valChange = document.querySelector(`.${classChange}`);
	var valueChange = document.querySelector(`.${classChange}Time`);
	if(operator === "-")
		(valChange.innerHTML !== "1") ? valChange.innerHTML = Number(valChange.innerHTML) - 1 : valChange.innerHTML = valChange.innerHTML;
	else if(operator ==="+")
		valChange.innerHTML = Number(valChange.innerHTML) + 1;
	console.log(valueChange);
	var curSess = document.querySelector(".active");
	if(!curSess.classList.contains("start"))
		valueChange.innerHTML = `${valChange.innerHTML}:00`;
}

// New Code
var sessionDiv = document.querySelectorAll(".sessions");
var intervalID;

sessionDiv.forEach(function(el){
	el.addEventListener("click",function(){
		runIt(el);
	})
});

function resetIt(){
	var session = document.querySelector(".session").innerHTML;
	var breaks = document.querySelector(".break").innerHTML;
	document.querySelector(".sessionTime").innerHTML = `${session}:00`;
	document.querySelector(".breakTime").innerHTML = `${breaks}:00`;
}

function runIt(el){
		var getClass = el.lastElementChild.className;
		var getTime = el.lastElementChild.innerHTML;    //console.log(getClass, getTime);
		if(!el.classList.contains("start"))
		{
			el.classList.add("start");      //console.log("Started");
			changeTimer(Number((getTime.split(":")[0])),Number((getTime.split(":")[1])),getClass);
		}
		else
		{
			el.classList.remove("start");  //console.log("Removed It!");
			window.clearInterval(intervalID);
		}
}

function changeTimer(startTime,startTime2,getClass) {
	var time = new Date();
	//var minutes = time.getMinutes();
	//var seconds = time.getSeconds();
	var hours = 0;
	var startingSeconds = Number(time.getSeconds()) + Number(startTime2); 
	var startingMinutes = Number(time.getMinutes()) + Number(startTime);
	if(startingMinutes>60)
	{
		hours = startingMinutes/60;
		startingMinutes = startingMinutes%60;
	}
	var futureTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours()+hours, startingMinutes, startingSeconds, time.getMilliseconds());
	
	intervalID = window.setInterval(function(){
		renderIt(futureTime,getClass);	
	},1000);
}

 function renderIt(futureTime,getClass) {
	var sessionTimer = document.querySelector(`.${getClass}`);
	var time = new Date();
	var diff = Math.abs(futureTime - time);    //console.log(diff);
	if(diff > 900)
	{
		var seconds = Math.ceil(diff / 1000);
		var minutes = Math.floor(seconds / 60);
		seconds = seconds%60;
		if(minutes > 60)
		{
			hours = minutes/60;
			minutes = minutes%60;
		}        //console.log(minutes);       //console.log(seconds);
		if(seconds>9)
			sessionTimer.innerHTML = `${minutes}:${seconds}`;
		else
			sessionTimer.innerHTML = `${minutes}:0${seconds}`;
	}
	else
	{
		sessionTimer.innerHTML = `0:00`;
		window.clearInterval(intervalID);
		displayBreak();
	}
}

function displayBreak() {
	var sessionDiv = document.querySelectorAll(".sessions");
	sessionDiv.forEach(function(el){
		el.classList.toggle("active");
		el.classList.toggle("hidden");
		if(el.classList.contains("start"))
			el.classList.remove("start");
	});

	var activeSession = document.querySelector(".active");
	resetIt();
	runIt(activeSession);
}




