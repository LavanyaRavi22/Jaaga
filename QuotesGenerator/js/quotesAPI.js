var btn = document.getElementById('next');
var twitter = document.getElementById('twitter');
var quotes = document.getElementById('quote');
var authors = document.getElementById('author');

/* Next Quote */
btn.addEventListener("click",function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("GET","https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");

	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var ourData = JSON.parse(ourRequest.responseText);		//converts data in url to JSON
			//var len = findLength(ourData);
			//var randomNumber = findNumber(len);
			//console.log(ourData);
			renderHTML(ourData);//,randomNumber);

		}
		else {
			console.log("We connected to the server,but it returned an error");
		}
	};

	ourRequest.send();

});


/* Render the HTML */
function renderHTML(data) {
	//console.log(number);
	quotes.innerHTML = data.quoteText;
	authors.innerHTML = data.quoteAuthor;
}


/* Twitter */
twitter.addEventListener("click",function() {
	var currentQuote = document.getElementById('quote').innerHTML;
	var currentAuthor = document.getElementById('author').innerHTML;
	var quot = "https://twitter.com/intent/tweet?text=" + currentQuote + "- " + currentAuthor + " @lavanyaravi";
	console.log(quot);
	twitter.setAttribute("href",quot);
	twitter.setAttribute("target","_blank");
});


/* CORS function*/
// (function() {
//     var cors_api_host = 'cors-anywhere.herokuapp.com';
//     var cors_api_url = 'https://' + cors_api_host + '/';
//     var slice = [].slice;
//     var origin = window.location.protocol + '//' + window.location.host;
//     var open = XMLHttpRequest.prototype.open;
//     XMLHttpRequest.prototype.open = function() {
//         var args = slice.call(arguments);
//         var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//         if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//             targetOrigin[1] !== cors_api_host) {
//             args[1] = cors_api_url + args[1];
//         }
//         return open.apply(this, args);
//     };
// })();


