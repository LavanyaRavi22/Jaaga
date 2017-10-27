window.addEventListener("keydown",playMusic);

function playMusic(e) {
	//console.log(e);

	const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`);
	if(!audio) { return; }
	audio.currentTime=0;
	audio.play();
	changeTransition(e);
	//console.log(audio);
}

function changeTransition(e) {
	const div=document.querySelector(`div[data-key="${e.keyCode}"]`);
	div.classList.add("playing");
	//console.log(div);
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend",removeTransition));

function removeTransition(e) {
	if(e.propertyName !== "transform") { return; }
	this.classList.remove("playing");
	//console.log(this);
}