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
	
	let section = document.querySelector(".getPages");				//section to print out the pages
	while(section.firstChild)
	{
		section.removeChild(section.firstChild);					// remove previously added pages
	}

	for(let i = 0;i<data.query.search.length;i++)					// Loop through for 10 pages
	{
		// console.log(data);
		let title = data.query.search[i].title;						// title of the page
		let snippet = data.query.search[i].snippet;					// content of the page
		let pageID = data.query.search[i].pageid;					// pageId - to redirect to the corresponding page
		let page = `https://en.wikipedia.org/?curid=${pageID}`;		// Redirects to the corresponding page
		let ref = document.createElement("a");						// Create <a> tag
		 	ref.setAttribute("href",page);							// Append attributes to the <a> tag
		 	ref.setAttribute("target","_blank");
		ref.className="pageRedirect";
		let div = document.createElement("div");					// Create <div> tag
		let head = document.createElement("h2");  					// Create <h2> tag
		var content = document.createElement("p");                  // Create <p> tag
		var textnode = document.createTextNode(`${title}`);         // Create a text node with title
		content.innerHTML = snippet;								// Append corresponding tags and text nodes
		head.appendChild(textnode);
		div.appendChild(head);
		div.appendChild(content);
		div.className = "content";
		ref.appendChild(div);
		console.log(ref);
		section.append(ref);
	}
}

function callForPages(e) 
{
	//Work only if Enter key is pressed
	if(e.keyCode == 13)
	{
		var valueFromInput = document.querySelector("input").value;
		document.querySelector("#container").style.marginTop = "5%";
		document.querySelector("#container").style.marginBottom = "5%";
		getURL(valueFromInput);
	}
}

//Adding Event Listener
let input = document.querySelector("input");
input.addEventListener("keyup",callForPages);
