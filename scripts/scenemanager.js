let map;
let backdrop;
let text;
let textbox;
let textouter;
let textframe;
let intro;
let topbot;
let instruction;

let fontSize;

/**
 */
window.resetGame = function resetGame() {
	intro.style.display = "block";
	map.style.display = "none";
	textouter.style.display = "none";
	textframe.style.display = "none";
	topbot.forEach(hf => {
		hf.style.display = "none";
	});
	localStorage.setItem("gamestate", "false");
	intro.addEventListener("contextmenu", rightClickIntro);
}

/**
 */
window.mapGameState = function mapGameState() {
	intro.style.display = "none";
	map.style.display = "grid";
	textouter.style.display = "none";
	textframe.style.display = "none";
	topbot.forEach(hf => {
		hf.style.display = "block";
	});
	localStorage.setItem("gamestate", "map");
}


/**
 */
window.dreamGameState = function dreamGameState() {
	intro.style.display = "none";
	map.style.display = "none";
	textouter.style.display = "block";
	textframe.style.display = "block";
	topbot.forEach(hf => {
		hf.style.display = "block";
	});
	localStorage.setItem("gamestate", "dream");
	window.loadRoomText();
}


/**
 */
function rightClickIntro(evnt) {
	mapGameState();
	intro.removeEventListener("contextmenu", rightClickIntro);
}


/**
 */
window.customResize = function resize() {
	// resize the tiles and textboxes to fit perfectly in place
	let currw = window.innerWidth-16;
	let currh = window.innerHeight-16; 
	let propw = currh*(14.0/10.0);

	let tiles = document.querySelectorAll("div.tile");
	let size = 0.0;
	let tbmargin = 0.0;
	let sidemargin = 0.0;
	let scale = "px";

	if (propw > currw) {
		size = (currw/14.0);
		tbmargin = (currh-(size*10))/2.0;
	}
	else {
		size = (currh/10.0);
		tbmargin = size/2.0;
		sidemargin = (currw-(size*14))/2.0;
	}

	map.style.padding = "8px " + sidemargin.toString() + scale;
	backdrop.style.padding = "8px " + sidemargin.toString() + scale;

	tiles.forEach(tile => {
		tile.style.height = size.toString() + scale;
		tile.style.width = size.toString() + scale;
	});

	document.querySelector(".holder").style.height = (size*9).toString() + scale;

	topbot.forEach(hf => {
		hf.style.height = tbmargin.toString() + scale;
	});

	fontSize = size + "px";
	instruction.style.fontSize = fontSize;
	intro.style.fontSize = fontSize;
	textbox.style.fontSize = fontSize;

	textbox.style.height = (size*3).toString() + scale;
	textbox.style.width = (size*14).toString() + scale;
	
	textouter.style.padding = (size*6 + 8).toString() + scale + " " + sidemargin.toString() + scale + " 8px " + sidemargin.toString() + scale;
	textframe.style.padding = (size*6 + 8).toString() + scale + " " + sidemargin.toString() + scale + " 8px " + sidemargin.toString() + scale;

	text.style.padding = (size/2.0).toString() + scale;
}


function basicContextMenu(evnt) {
	evnt.preventDefault();
}


$(document).ready( function() {
	// TODO: finish setting up scene manager
	map = document.querySelector("#map");
	backdrop = document.querySelector("#backdrop_outside");
	text = document.querySelector(".text");
	textbox = document.querySelector("#textbox");
	textouter = document.querySelector("#textbox_outside");
	textframe = document.querySelector("#abovebox_outside");
	intro = document.querySelector("#intro");
	topbot = document.querySelectorAll("div.topbot");
	instruction = document.querySelector(".instruction");

	// set up listener for clicking on the displayed intro
	if (localStorage.getItem("gamestate") == "map") { mapGameState(); }
	else if (localStorage.getItem("gamestate") == "dream") {  }
	else { 
		localStorage.setItem("gamestate", "false");
		intro.addEventListener("contextmenu", rightClickIntro); 
		intro.style.display = "block";
	}

	// remove other contextmenus
	document.querySelectorAll("div").forEach(div => {
		div.addEventListener("contextmenu", basicContextMenu);
	});
	document.querySelector("body").addEventListener("contextmenu", basicContextMenu);
});

window.onresize = window.customResize;