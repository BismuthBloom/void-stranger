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
	// set the image here .style.backgroundImage="url(images/img.jpg)";
	tile.style.backgroundImage="url(sprites/tiles/spr_floor_0.png)";
}


$(document).ready( function() {
	// make the tiles, then call rendertiles
	addTiles();
});
