let data;
let currText;
let textbox;

// load the cutscene layout for the game. the transitions are handled by scenemanager
/**
 * set the first text
 */
window.loadRoomText = function loadRoomText() {
	let room = localStorage.getItem("room");
	try {
		currText = data[room]["Scene"];
	}
	catch {
		currtext = [""];
	}
	console.log(currText.length);
	textbox.innerHTML = currText[parseInt(localStorage.getItem("textIndex"))];

	console.log(parseInt(localStorage.getItem("textIndex")));
}


/**
 *  progress text
 */
function rightClickTextbox(evnt) {
	evnt.preventDefault();
	
	let index = parseInt(localStorage.getItem("textIndex")) + 1;
	console.log(index, " ", currText.length);
	if (index == currText.length) {
		localStorage.setItem("textIndex", "0");
		window.mapGameState();
		return;
	}
	textbox.innerHTML = currText[index];
	localStorage.setItem("textIndex", index.toString());
}

//*
async function gatherJSON() {
	// get the script
	try {
		const response = await fetch("data/dreams.json");
		if (!response.ok) { throw new Error("can't find the dream sequence json"); }

		data = await response.json();
		if (localStorage.getItem("gamestate") == "dream") {
			window.dreamGameState();
		}
	}
	catch (error) {
		console.error("failed to fetch:", error);
	}
}
//*/

$(document).ready( function() {
	gatherJSON();
	if (!localStorage.getItem("textIndex")) {
		localStorage.setItem("textIndex", "0");
	}
	textbox = document.querySelector("#textbox");
	textbox.addEventListener("contextmenu", rightClickTextbox);
});