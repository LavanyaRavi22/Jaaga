var btn = document.getElementById('next');
var twitter = document.getElementById('twitter');
var currentQuote = document.getElementById('quote').innerHTML;
var currentAuthor = document.getElementById('author').innerHTML;
var prevLen = 0;
var quotes = document.getElementById('quote');
var authors = document.getElementById('author');

/* Next Quote */
btn.addEventListener("click",function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open("GET","https://api.myjson.com/bins/qrddr");

	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var ourData = JSON.parse(ourRequest.responseText);		//converts data in url to JSON
			var len = findLength(ourData);
			var randomNumber = findNumber(len);
			//console.log(randomNumber);
			renderHTML(ourData,randomNumber);

		}
		else {
			console.log("We connected to the server,but it returned an error");
		}
	};

	ourRequest.send();

});

function findLength (data) {
	return data.length;
};

function findNumber (len) {
	var num = (Math.floor(Math.random() * (len)));
	//console.log(num);
	if(num!=prevLen)
	{
		prevLen = num;
		return num;
	}
	else
	{
		var num2 =findNumber(len);
		return num2;
	}
}

function renderHTML(data,number) {
	//console.log(number);
	quotes.innerHTML = data[number].quote;
	authors.innerHTML = data[number].author;
}


/* Twitter */
twitter.addEventListener("click",function() {

	var quot = "https://twitter.com/intent/tweet?text=" + currentQuote + "- " + currentAuthor + " @lavanyaravi";
	console.log(quot);
	twitter.setAttribute("href",quot);
	twitter.setAttribute("target","_blank");
});



