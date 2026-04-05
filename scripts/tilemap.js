// tldr if local data, render. need to import tiles first to make the associations 
// otherwise spin up local data and render b001
// 14 w, 9 height
// either do on click querying for tiles here or just something else idk. id can be used like int-int for the x-y coord

let data;
let voidrod;


/**
 */
function addTiles(data) {
	let map = document.getElementById("map");

	let room = localStorage.getItem("room");
	if (!room) {
		localStorage.setItem("room", "B028");
		room = "B028";
	}

	for (let i = 0; i < 126; ++i) {
		let id = i.toString();
		let newTile = document.createElement("div");
		newTile.setAttribute("id", id);
		newTile.addEventListener("click", clickTile);
		newTile.addEventListener("contextmenu", rightClickTile);
		map.appendChild(newTile);
		loadTile(id, room, data);
	}

	tileSize();
}


/**
 */
function loadRoom(roomname, data) {
	localStorage.setItem("heldTile", "empty");
	
	for (let i = 0; i < 126; ++i) {
		loadTile(i.toString(), roomname, data, true);
	}
	localStorage.setItem("room", roomname);
}


/**
 */
function loadTile(tileid, roomname, data, force = false) {
	let tiledata = localStorage.getItem(tileid);

	if (!tiledata || force) {
		tiledata = data[roomname][tileid];
		localStorage.setItem(tileid, tiledata);
	}
	let tile = document.getElementById(tileid);
	tile.className = "";
	tile.classList.add("tile");

	tiledata.toString().split(" ").forEach( function(class_name) {
		tile.classList.add(class_name);
	});

	if (tileid == "118") {
		voidrod = tile;
	}
}


/**
 */
function changeRodIcon(prevTile, heldTile) {
	let prefix = "void-rod-";
	if (prevTile.substr(0, 1) == "n" || prevTile == "huh") { prevTile = "ui"; }
	if (heldTile.substr(0, 1) == "n" || heldTile == "huh") { heldTile = "ui"; }
	voidrod.classList.replace(prefix.concat(prevTile), prefix.concat(heldTile));
}


/**
 */
function getAboveTile(id) {
	if (id < 14) {
		return null;
	}
	return document.getElementById((id-14).toString());
}


/**
 */
function getBelowTile(id) {
	if (id > 111) {
		return null;
	}
	return document.getElementById((id+14).toString());
}

/**
 */
function isEmptyTile(tile) {
	return tile.classList.contains("empty");
}


/**
 */
function isEmptyEdge(tile) {
	return tile.classList.contains("empty-edge");
}


/**
 */
function isNoninteractable(tile) {
	return tile.classList.contains("no-interact");
}

/**
 */
function isTreeTile(tile) {
	const regex = /^tree-/;
	return Array.from(tile.classList).some(cn => 
		regex.test(cn)
	);
}

/**
 */
function isNumTile(tile) {
	const regex = /^n/;
	return Array.from(tile.classList).some(cn => 
		regex.test(cn)
	);
}


/**
 */
function clickTile(evnt) {
	let tile = evnt.currentTarget;
	let id = parseInt(tile.id);
	let aboveTile = getAboveTile(id);
	let belowTile = getBelowTile(id);

	if (isNoninteractable(tile)) { return; }

	let heldTile = localStorage.getItem("heldTile");
	if (!heldTile) { heldTile = "empty"; }
	
	tile.classList.forEach(function (class_name) {
		switch (class_name) {
			case "ui":
			case "n28":
			case "n56":
			case "n84":
			case "n12":
			case "n40":
			case "n68":
			case "n96":
			case "n24":
			case "n54":
			case "huh":
			case "stairs":
			case "copy":
			case "floor":
				if (heldTile !== "empty") { break; }

				if (belowTile && isEmptyEdge(belowTile)) {
					belowTile.classList.replace("empty-edge", "empty");
					localStorage.setItem(belowTile.id, "empty");
				}
				else {}

				if (aboveTile && !isTreeTile(aboveTile) && !(isEmptyTile(aboveTile) || isEmptyEdge(aboveTile))) {
					tile.classList.replace(class_name, "empty-edge");
					localStorage.setItem(tile.id, "empty-edge");
				}
				else {
					tile.classList.replace(class_name, "empty");
					localStorage.setItem(tile.id, "empty");
				}

				localStorage.setItem("heldTile", class_name);
				changeRodIcon("empty", class_name);
				break;
			case "empty-edge":
			case "empty":
				if (heldTile == "empty") { break; }

				if (belowTile && isEmptyTile(belowTile)) {
					belowTile.classList.replace("empty", "empty-edge");
					localStorage.setItem(belowTile.id, "empty-edge");
				}

				tile.classList.replace(class_name, heldTile);
				localStorage.setItem(tile.id, heldTile);
				localStorage.setItem("heldTile", "empty");
				changeRodIcon(heldTile, "empty");
				break;
		}
	});
}


/**
 */
function rightClickTile(evnt) {
	evnt.preventDefault();
	let tile = evnt.currentTarget;
	let id = parseInt(tile.id);

	if (isTreeTile(tile)) {
		loadRoom(localStorage.getItem("room") + "-used", data);
		return;
	}
	
	tile.classList.forEach(function (class_name) {
		switch (class_name) {
			case "stairs":
				// go to the next room!!
				let currRoom = localStorage.getItem("room");
				let nextRoom = data[currRoom]["Stairs Exit"];
				console.log(nextRoom);
				if (nextRoom == "") { return; }
				loadRoom(nextRoom, data);
				break;
			case "copy":
				tile.classList.replace(class_name, "shade");
					localStorage.setItem(tile.id, "shade");
				break;
			case "closed-chest":
				break;
		}
	});
}


/**
 */
function tileSize() {
	// resize the tiles to fit perfectly in place
	let currw = window.innerWidth-16;
	let currh = window.innerHeight-16; 
	let propw = currh*(14.0/10.0);

	let tiles = document.querySelectorAll("div.tile");
	let size = 0.0;
	let tbmargin = 0.0;
	let scale = "px";

	if (propw > currw) {
		size = (currw/14.0);
		tbmargin = (currh-(size*10))/2.0;
	}
	else {
		size = (currh/10.0);
		tbmargin = size/2.0;
		let map = document.querySelector("#map");
		let margin = (currw-(size*14))/2.0;
		map.style.margin = "8px " + margin.toString() + scale;
	}

	size = size.toString() + scale;

	tiles.forEach(tile => {
		tile.style.height = size;
		tile.style.width = size;
	});

	let topbot = document.querySelectorAll("div.topbot");
	topbot.forEach(hf => {
		hf.style.height = tbmargin.toString() + scale;
	});
}


async function gatherJSON() {
	// make the tiles, then call rendertiles
	try {
		const response = await fetch("data/birch.json");
		if (!response.ok) { throw new Error("can't find the json"); }

		data = await response.json();
		addTiles(data);
	}
	catch (error) {
		console.error("failed to fetch:", error);
	}
}

$(document).ready( function() {
	gatherJSON();
});

window.onresize = tileSize;