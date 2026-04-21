let data;
let currText;
let text;

// load the cutscene layout for the game. the transitions are handled by scenemanager
/**
 * set the first text
 */
window.loadRoomText = function loadRoomText() {
	// clean up room name if needed
	let room = localStorage.getItem("room").replace("-used", "");

	currText = data[room]["Scene"];
	document.querySelector("#backdrop").style.backgroundImage = "url('sprites/dreams/"+ data[room]["Background"] +"')";
	
	text.innerHTML = currText[parseInt(localStorage.getItem("textIndex"))];
}


/**
 *  progress text
 */
function rightClickTextbox(evnt) {
	evnt.preventDefault();
	
	let index = parseInt(localStorage.getItem("textIndex")) + 1;
	if (index == currText.length) {
		localStorage.setItem("textIndex", "0");
		document.querySelector("#backdrop").style.backgroundImage = "url('')";
		window.mapGameState();
		return;
	}
	text.innerHTML = currText[index];
	localStorage.setItem("textIndex", index.toString());
}

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

$(document).ready( function() {
	gatherJSON();
	if (!localStorage.getItem("textIndex")) {
		localStorage.setItem("textIndex", "0");
	}
	text = document.querySelector(".text");
	text.addEventListener("contextmenu", rightClickTextbox);
});