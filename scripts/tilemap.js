// tldr if local data, render. need to import tiles first to make the associations 
// otherwise spin up local data and render b001
// 14 w, 9 height
// either do on click querying for tiles here or just something else idk. id can be used like int-int for the x-y coord

/**
 *
export function editTile(int tile, int action) {
	let tile = document.getElementById(tile.toString());
	// TODO: implement this
}*/


/**
 */
function addTiles() {
	let map = document.getElementById("map");
	for (let i = 0; i < 126; ++i) {
		let id = i.toString();
		let newTile = document.createElement("div");
		newTile.classList.add("tile");
		newTile.setAttribute("id", id);
		newTile.addEventListener("click", clickTile);
		map.appendChild(newTile);
		loadTile(id);
	}
}

/**
 */
function loadTile(tileid) {
	let tiledata = localStorage.getItem(tileid);
	if (tiledata == null) {
		// b001 + set localStorage
	}
	let tile = document.getElementById(tileid);
	tile.classList.add("interactable");
	// big switch statement here for tile type
	tile.classList.add("floor");
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
	
	tile.classList.forEach(function (class_name, _key, _listObj) {
		switch (class_name) {
			case "floor":
				if (belowTile && isEmptyEdge(belowTile)) {
					belowTile.classList.replace("empty-edge", "empty");
				}
				else {}

				if (aboveTile && !(isEmptyTile(aboveTile) || isEmptyEdge(aboveTile))) {
					tile.classList.replace(class_name, "empty-edge");
				}
				else {
					tile.classList.replace(class_name, "empty");
				}
				break;
			case "empty-edge":
			case "empty":
				if (belowTile && isEmptyTile(belowTile)) {
					belowTile.classList.replace("empty", "empty-edge");
				}

				tile.classList.replace(class_name, "floor");
				break;
		}
	});
}


$(document).ready( function() {
	// make the tiles, then call rendertiles
	addTiles();
});
