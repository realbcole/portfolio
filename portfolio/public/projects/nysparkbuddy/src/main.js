import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js";
import { MyInfo } from "./myInfo.js";
import { MyHeader } from "./myHeader.js";
import { MyFooter } from "./myFooter.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = storage.getFavorites();

// II. Functions

// Add element to favorites list
const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a;
}

// Update favorites list
const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	if (favoriteIds.length < 1) return;
	for (const id of favoriteIds) {
		favoritesContainer.appendChild(createFavoriteElement(id));
	};
	storage.setFavorites(favoriteIds);
};

// Find feature in features array
const getFeatureById = (id) => {
	return geojson.features.find(feature => feature.id == id);
}

// Create info element to display in details panel
const createInfoElement = (feature) => {
	const info = document.createElement("my-info");
	info.dataset.address = feature.properties.address;
	info.dataset.phone = feature.properties.phone;
	info.dataset.website = feature.properties.url;
	info.dataset.id = feature.id;
	return info;
}

// Show park details
const showFeatureDetails = (id) => {
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	let infoPanel = document.querySelector("#details-2");
	infoPanel.removeChild(infoPanel.firstChild);
	infoPanel.appendChild(createInfoElement(feature));
	document.querySelector("#details-3").innerHTML = `${feature.properties.description}`;
};

// Load favorites from local storage
const loadFavoritesFromStorage = () => {
	favoriteIds = storage.getFavorites();
	if (favoriteIds.length < 1) return;
	refreshFavorites();
}

// Add custom header to page
const addHeader = () => {
	const header = document.createElement(`my-header`);
	header.dataset.subtitle = `Your one-stop resource for NYS parks!`;
	header.dataset.title = `NY State Park Buddy!`;
	document.querySelector(`#header`).appendChild(header);
}

// Add custom footer to page
const addFooter = () => {
	const footer = document.createElement(`my-footer`);
	footer.dataset.year = `2023`;
	footer.dataset.name = `Brandon Cole`;
	document.querySelector(`#footer`).appendChild(footer);
}

// Set up buttons and refresh favorites list
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};

	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	};

	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatUSA);
	};

	refreshFavorites();
}

// Initialize page
const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
		addHeader();
		addFooter();
		// If local storage is empty, clear it so the key is set
		if (storage.getFavorites() == undefined) storage.clearLocalStorage();
		loadFavoritesFromStorage();
	});
};

init();

export { refreshFavorites, favoriteIds };