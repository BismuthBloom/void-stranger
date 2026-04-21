let map;
let textbox;
let intro;
let topbot;
let instruction;

let fontSize;

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
		map.style.margin = "8px " + sidemargin.toString() + scale;
	}

	tiles.forEach(tile => {
		tile.style.height = size.toString() + scale;
		tile.style.width = size.toString() + scale;
	});

	topbot.forEach(hf => {
		hf.style.height = tbmargin.toString() + scale;
		hf.style.margin = "8px " + sidemargin.toString() + scale;
	});

	fontSize = Math.floor(size) + "px";
	instruction.style.fontSize = fontSize;

	textbox.style.height = (size*3).toString() + scale;
	textbox.style.width = (size*14).toString() + scale;
	textbox.style.marginTop = (size*6).toString() + scale;
}

$(document).ready( function() {
	// TODO: finish setting up scene manager
	map = document.querySelector("#map");
	textbox = document.querySelector("#textbox");
	intro = document.querySelector("#intro");
	topbot = document.querySelectorAll("div.topbot");
	instruction = document.querySelector(".instruction");

	textbox.style.display = "none";
	/*
	map.style.display = "none";
	topbot.forEach(hf => {
		hf.style.display = "none";
	});
	*/

	// set up listener for clicking on the displayed intro
});

window.onresize = window.customResize;