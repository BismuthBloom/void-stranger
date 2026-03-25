// tldr if local data, render. need to import tiles first to make the associations 
// otherwise spin up local data and render b001
// 14 w, 9 height
// either do on click querying for tiles here or just something else idk. id can be used like int-int for the x-y coord

let data;


/**
 */
function addTiles(data) {
	let map = document.getElementById("map");
	for (let i = 0; i < 126; ++i) {
		let id = i.toString();
		let newTile = document.createElement("div");
		newTile.classList.add("tile");
		newTile.setAttribute("id", id);
		newTile.addEventListener("click", clickTile);
		map.appendChild(newTile);
		loadTile(id, data);
	}
}

/**
 */
function loadTile(tileid, data) {
	let tiledata = localStorage.getItem(tileid);
	if (tiledata == null) {
		// b001 + set localStorage
		tiledata = data["B001"][tileid]
		localStorage.setItem(tileid, tiledata);
	}
	let tile = document.getElementById(tileid);
	tiledata.toString().split(" ").forEach( function(class_name) {
		tile.classList.add(class_name);
	});
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
function clickTile(evnt) {
	let tile = evnt.currentTarget;
	let id = parseInt(tile.id);
	let aboveTile = getAboveTile(id);
	let belowTile = getBelowTile(id);

	let heldTile = localStorage.getItem("heldTile");
	if (!heldTile) { heldTile = "empty"; }
	
	tile.classList.forEach(function (class_name) {
		let kill = false;
		switch (class_name) {
			case "no-interact":
				kill = true;
				break;
			case "stairs":
			case "floor":
				if (heldTile !== "empty") { break; }

				if (belowTile && isEmptyEdge(belowTile)) {
					belowTile.classList.replace("empty-edge", "empty");
					localStorage.setItem(belowTile.id, "empty");
				}
				else {}

				if (aboveTile && !(isEmptyTile(aboveTile) || isEmptyEdge(aboveTile))) {
					tile.classList.replace(class_name, "empty-edge");
					localStorage.setItem(tile.id, "empty-edge");
				}
				else {
					tile.classList.replace(class_name, "empty");
					localStorage.setItem(tile.id, "empty");
				}

				localStorage.setItem("heldTile", class_name);
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
				break;
		}
		if (kill) { return; }
	});
}


async function gatherJSON() {
	// make the tiles, then call rendertiles
	try {
		const response = await fetch("data/b001.json");
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
