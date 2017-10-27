var changeTemp = document.getElementById("tempConvert");

(function getLocation() {
	if (navigator.geolocation) {
		console.log(navigator.geolocation.getCurrentPosition(showPosition,error));
		//console.log(d);
	}
	else {
		console.log("Geolocation is not supported by this browser.");
	}

})();


// Get the latitude and longitude
function showPosition(position) {
	//console.log(position);
    // console.log("Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    //console.log(lat + "    " + long);
    let api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
    showWeather(api);

}

function error(err) {
	console.warn("Error: "+ err.code + "  Error Message: " + err.message);
}

function showWeather(api) {
	let ourRequest = new XMLHttpRequest();
	ourRequest.open("GET",api);

	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	}

	ourRequest.send();
}

function renderHTML(data) {
	var city=document.getElementById("city");	//data.name
	var ctry=document.getElementById("ctry");	//data.sys.country;
	var temp=document.getElementById("temp");
	var weatherNow=document.getElementById("weatherNow");
	var icon=document.getElementById("icon");
	console.log(data);
	// console.log(data.name);

	city.innerHTML = data.name;
	ctry.innerHTML = data.sys.country;
	temp.innerHTML = data.main.temp;
	weatherNow.innerHTML = data.weather[0].main;
	icon.setAttribute("src",data.weather[0].icon);
	//console.log(data.main.temp);
	//console.log(data.weather[0].main);
	//console.log(data.weather[0].icon);
}

changeTemp.addEventListener("click",function() {
	let temp = document.getElementById("temp");
	let cOrF = document.getElementById("tempConvert");
	let valueTemp = cOrF.innerHTML;
	let celsius = 0;
	let fahrenheit = 0;
	//console.log(cOrF);

	if (valueTemp === "C")
	{
		//console.log("Celsius");
		celsius = temp.innerHTML;
		fahrenheit = (celsius * 9/5) +32;
		temp.innerHTML = fahrenheit.toFixed(2);
		cOrF.innerHTML = "F";
	}
	else
	{
		//console.log("Fahrenheit");
		fahrenheit = temp.innerHTML;
		celsius = (fahrenheit -32) * 5/9;
		temp.innerHTML = celsius.toFixed(2);
		cOrF.innerHTML = "C";
	}
	//let tempVal = temp.innerHTML;


	// let fahrenheit = (celsius * 9/5) +32;
	// temp.innerHTML = fahrenheit;
});











