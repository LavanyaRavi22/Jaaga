function myFunction() {
	var x = document.getElementById("contain");
	// console.log(x);
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}