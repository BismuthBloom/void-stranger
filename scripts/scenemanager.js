let map;
let textbox;
let textframe;
let intro;
let topbot;
let instruction;

let fontSize;

/**
 */
window.mapGameState = function mapGameState() {
	intro.style.display = "none";
	map.style.display = "grid";
	textbox.style.display = "none";
	textframe.style.display = "none";
	topbot.forEach(hf => {
		hf.style.display = "block";
	});
	localStorage.setItem("gamestate", "map");

	// instruction.innerHtml = "Left click to pick up tiles. Right click to \"use\" things like the tree or stairs.";
}


/**
 */
window.dreamGameState = function dreamGameState() {
	intro.style.display = "none";
	map.style.display = "none";
	textbox.style.display = "block";
	textframe.style.display = "block";
	topbot.forEach(hf => {
		hf.style.display = "block";
	});
	localStorage.setItem("gamestate", "dream");
	window.loadRoomText();

	// instruction.innerHtml = "Click on the text box to progress the dialogue.";
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
		map.style.padding = "8px " + sidemargin.toString() + scale;
	}

	tiles.forEach(tile => {
		tile.style.height = size.toString() + scale;
		tile.style.width = size.toString() + scale;
	});

	topbot.forEach(hf => {
		hf.style.height = tbmargin.toString() + scale;
		//hf.style.margin = "8px " + sidemargin.toString() + scale;
	});

	fontSize = Math.floor(size) + "px";
	instruction.style.fontSize = fontSize;
	intro.style.fontSize = fontSize;
	textbox.style.fontSize = fontSize;

	textbox.style.height = (size*3).toString() + scale;
	textbox.style.width = (size*14).toString() + scale;
	textbox.style.marginTop = (size*6).toString() + scale;
	textbox.style.padding = (size/2.0).toString() + scale;

	textframe.style.height = (size*3).toString() + scale;
	textframe.style.width = (size*14).toString() + scale;
	textframe.style.marginTop = (size*6).toString() + scale;
	textframe.style.padding = (size/2.0).toString() + scale;
}


$(document).ready( function() {
	// TODO: finish setting up scene manager
	map = document.querySelector("#map");
	textbox = document.querySelector("#textbox");
	textframe = document.querySelector("#abovebox");
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
});

window.onresize = window.customResize;