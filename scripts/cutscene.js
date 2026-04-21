let data;
let currText;
let textbox;

// load the cutscene layout for the game. the transitions are handled by scenemanager
/**
 * set the first text
 */
window.loadRoomText = function loadRoomText() {
	let room = localStorage.getItem("room");
	currText = data[room]["Scene"];
	textbox.innerHtml = currText[parseInt(localStorage.getItem("textIndex"))];
}


/**
 *  progress text
 */
function clickTextBox(evnt) {
	let index = parseInt(localStorage.getItem("textIndex")) + 1;
	if (index == currText.length) {
		localStorage.setItem("textIndex", "0");
		window.mapGameState();
		return;
	}
	textbox.innerHtml = currText[index];
	localStorage.setItem("textIndex", (index + 1).toString());
}

/*
async function gatherJSON() {
	// get the script
	try {
		const response = await fetch("data/dreams.json");
		if (!response.ok) { throw new Error("can't find the dream sequence json"); }

		data = await response.json();
	}
	catch (error) {
		console.error("failed to fetch:", error);
	}
}
//*/

$(document).ready( function() {
	//gatherJSON();
	if (!localStorage.getItem("textIndex")) {
		localStorage.setItem("textIndex", "0");
	}
	textbox = document.querySelector("#textbox");
});