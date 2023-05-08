    // 1
    window.onload = (e) => {

		// Save search term
		saveSearch();

		let searchButton = document.querySelector("#search");

		// Search if enter is pressed
		document.querySelector("#searchTerm").addEventListener("keyup", function(event) {
			if (event.keyCode == 13){
				event.preventDefault();
				searchButton.click();
			}
		})

		// Search if button is clicked
		searchButton.onclick = searchButtonClicked
	};

	// 2
	let displayTerm = "";

	// 3
	function searchButtonClicked(){
		//console.log("searchButtonClicked() called");

		
		document.querySelector("#content").innerHTML = "";

		// Giphy search endpoint
		const MEALDB_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

		// Build URL string
		let url = MEALDB_URL;
		
		// Parse user entered term to search
		let term = document.querySelector("#searchTerm").value;
		displayTerm = term;

		// Remove extra spaces
		term = term.trim();

		// Encode spaces and special characters
		term = encodeURIComponent(term);

		// If theres no term to search, break
		if (term.length < 1) return;

		// Append the search term to the url
		url += term;

		// Update UI
		let status = document.querySelector("#status");
        status.innerHTML = "Searching for '" + displayTerm + "'";

		// See URL in console
		//console.log(url);

		// Request data
		getData(url);
	}

	function getData(url){
		// Create new XHR object
		let xhr = new XMLHttpRequest();

		// Set the onload handler
		xhr.onload = dataLoaded;

		// Set the onerror handler
		xhr.onerror = dataError;

		// Open connection and send request
		xhr.open("GET", url);
		xhr.send();
	}

	function getMealData(url){
		// Create new XHR object
		let xhr = new XMLHttpRequest();

		// Set the onload handler
		xhr.onload = mealDataLoaded;

		// Set the onerror handler
		xhr.onerror = dataError;

		// Open connection and send request
		xhr.open("GET", url);
		xhr.send();
	}

	function dataLoaded(e){
		// e.target is the xhr object
		let xhr = e.target

		// xhr.responseText is the JSON file we downloaded
		//console.log(xhr.responseText);

		// Turn text into a parsable JavaScript object
		let obj = JSON.parse(xhr.responseText);

		// If there are no results, print a message and return
		if (!obj.meals || obj.meals.length == 0){
			document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
			return;
		}

		// Limit results
		let limit = document.querySelector("#limit").value;

		let tempResults = obj.meals;
		let results = [];
		if (tempResults.length > limit){
			for(let i=0; i < limit; i++){
				results.push(tempResults[i]);
			}
		}
		else{
			results = tempResults;
		}
		
		//console.log("results.length = " + results.length);

		const MEALDB_MEAL_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
		
		// Loop through the array of results
		for (let i = 0; i < results.length; i++)
		{
			let result = results[i];


			let mealID = result.idMeal;
			let url = MEALDB_MEAL_URL + mealID;
			//console.log(url);
			getMealData(url);
		}
		
		// Update status
		document.querySelector("#status").innerHTML = "<p><i>There are " + results.length + " results for '" + displayTerm + "'</i></p>"
	}

	function mealDataLoaded(e){
		// e.target is the xhr object
		let xhr = e.target

		// Turn text into a parsable JavaScript object
		let obj = JSON.parse(xhr.responseText);

		// If there are no results, print a message and return
		if (!obj.meals || obj.meals.length == 0){
			document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
			return;
		}
		
		let results = obj.meals;

		// Start building an HTML string to display to the user
		let bigString = "";

		// Loop through the array of results
		for (let i = 0; i < results.length; i++)
		{
			let result = results[i];

			// Get the image
			let thumbnail = result.strMealThumb;
			if (!thumbnail) thumbnail = "images/no-image-found.png";			
			
			// Get title
            let title = result.strMeal;
            if (title == "") title = "No title"; 

			// Get source
			let source = result.strSource;

			// Get ingredients and measurements data
			let ingredients = [];
			let measurements = [];
			let ctr = 0;
			for (let i =1; i <= 20; i++){
				let key = "strIngredient" + i.toString();
				let key2 = "strMeasure" + i.toString();
				let ingredient = result[key];
				let measurement = result[key2]
				if (ingredient == "" || !ingredient){
					break;
				}
				else{
					ingredients.push(ingredient);
					measurements.push(measurement);
					ctr++;
				}
			}

			// Make string with ingredients and measurements
			let ingredientsString = ingredientsToHTML(ingredients, measurements, ctr);

            // Get recipe
            let instructions = result.strInstructions;
            if (instructions == "") instructions = "No instructions"; 

			// Build a <div> to hold each result
			let line = `<div class='result'>`;
			if (source){
				line += `<a href='${source}' target='blank'>`;
			}
			line += `<img src='${thumbnail}' title='${title}' />`;
			if (source){
				line += `</a>`;
			}
			line += `<h3><i><b>${title}</i></b></h3><div><p>`;

			let ingredientCheck = document.querySelector("#ingredients");
			let recipeCheck = document.querySelector("#recipe");

			if (ingredientCheck.checked == true)
			{
				line+= `${ingredientsString}`
			}
			if (recipeCheck.checked == true)
			{
				line += `<br>Recipe<br><br>${instructions}`
			}
			
			line += `</div></p></div>`;

			// Add the div to bigstring and loop
			bigString += line;
		}
		
		// Show it to user
		document.querySelector("#content").innerHTML += bigString;
		
		// If not showing ingredients or recipe, make box smaller
		let ingredientCheck = document.querySelector("#ingredients");
		let recipeCheck = document.querySelector("#recipe");
		if (ingredientCheck.checked == false && recipeCheck.checked == false)
		{
			let results2 = document.querySelectorAll(".result");
			for(let i = 0; i < results2.length; i++){
				results2[i].style.height = "fit-content";
			}
		}
		document.querySelector("footer").style.top = "0px";
	}

	function ingredientsToHTML(ingredients, measurements, ctr)
	{
		// Start building string
		let string = `<p>Ingredients<br></p><ol>`;

		// For however many ingredients there are
		for (let i = 0; i < ctr; i++)
		{
			string += `<li>`
			string += ingredients[i] + " - " + measurements[i]; // ingredient - measurement
			string += `</li>`
		}

		string += `</ol>`

		// Return string with ingredients and measurements
		return string;
	}

	function dataError(e){
		console.log("An error occured");
	}
	
	function saveSearch(){
		// Search box
		const ingredientField = document.querySelector("#searchTerm");

		const prefix = "bec8980-";
		const ingredientKey = prefix + "ingredient";
	
		// Get stored search term
		const storedIngredient = localStorage.getItem(ingredientKey);
	
		if (storedIngredient){
			// Put saved term in search box, if there is one
			ingredientField.value = storedIngredient;
		}
		else{
			// default value is ingredient
			ingredientField.value = "ingredient";
		}	

		// Save search term
		ingredientField.onchange = e=>{localStorage.setItem(ingredientKey, e.target.value);};

	}