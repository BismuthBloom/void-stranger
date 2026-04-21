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
	textbox.innerHtml = currText[0];
	localStorage.setItem("textIndex", "0");
}


/**
 *  progress text
 */
function clickTextBox(evnt) {
	//
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
	localStorage.setItem("textIndex", "0");
	textbox = document.querySelector("#textbox");
});