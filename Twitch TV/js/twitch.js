var listOfItems =[];
startIt();



function startIt(){
	let users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	//let users = ["ESL_SC2","freecodecamp"];
	for(let i=0;i<users.length;i++)
	{
		fetchIt(users[i],"channels",i);
		let obj={ display:"null",
				  logo:"null",
				  status:"null"
				};
		listOfItems.push(obj);
		//fetchIt(users[3],"channels");
	}
	renderHTML();
};



function fetchIt(string,getFrom,i) {
	let endpoint = `https://cors-anywhere.herokuapp.com/https://wind-bow.glitch.me/twitch-api/${getFrom}/${string}`;

	fetch(endpoint)
		.then(value => value.json())
		.then(data => {
			 (getFrom === "channels") ? getData(data,string,i) : getMoreData(data,i); 
		});
	//console.log(endpoint);
} 

function getData(data,string,i) {
	listOfItems[i].display  = data.display_name;
	listOfItems[i].logo = data.logo;
	//console.log(obj.display, obj.logo);
	fetchIt(string,"streams",i);
}

function getMoreData(data,i) {
	//console.log(data.stream);
	let status;
	(data.stream == null) ? status = "Offline"	: status = data.stream.channel.status;;
	listOfItems[i].status=status;
	console.log(listOfItems);
}

function renderHTML() {

}