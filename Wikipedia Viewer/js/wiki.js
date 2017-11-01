//Figuring out the URL
function getURL(searchString) {

	let endpoint = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=10&format=json&srsearch=";
	searchString=searchString.replace(' ','%20');
	endpoint += searchString;
	fetchIt(endpoint);
	
}

//Fetching the URL
function fetchIt(endpoint) {

	fetch(endpoint)
		.then(value => value.json())
		.then(data => getPages(data))

}

function getPages(data) {
	//console.log("I am here!");
	let section = document.querySelector(".getPages");	
	while(section.firstChild)
	{
		section.removeChild(section.firstChild);
	}

	for(let i = 0;i<data.query.search.length;i++)
	{
		// console.log(data);
		let title = data.query.search[i].title;
		let snippet = data.query.search[i].snippet;
		let pageID = data.query.search[i].pageid;
		// console.log(title);
		// console.log(snippet);
		// console.log(data);
		// let pageURL = `https://en.wikipedia.org/?curid=${pageID}`;
		// let a = document.createElement("a");
		// a.setAttribute("href",pageURL);
		// a.setAttribute("target","_blank");
		//a.className=pageRedirect;
		let div = document.createElement("div");
		let head = document.createElement("h2");  
		var content = document.createElement("p");                // Create a <li> node
		var textnode = document.createTextNode(`${title}`);         // Create a text node
		//var textnode2 = document.createTextNode(snippet);
		content.innerHTML = snippet;
		//console.log(content);
		head.appendChild(textnode);
		div.appendChild(head);
		div.appendChild(content);
		div.className = "content";
		// a.appendChild(div);
		console.log(div);
		section.append(div);
	}
	//node.appendChild(textnode);                              // Append the text to <li>
	//document.getElementById("myList").appendChild(node); 
}

function callForPages(e) 
{
	//console.log(e);
	if(e.keyCode == 13)
	{
		var valueFromInput = document.querySelector("input").value;
		document.querySelector("#container").style.marginTop = "5%";
		document.querySelector("#container").style.marginBottom = "5%";
		getURL(valueFromInput);
	}
}

	let input = document.querySelector("input");
	input.addEventListener("keyup",callForPages);


//console.log("I am here!");