let searchBar = document.querySelector('.navbar_form-input')

//faire du HTML dynamique depuis le JSON
const element = document.querySelector(".recettes_container");


let createCard = (recipe) => {
	//image
	let image = create("div", {class: "recettes_pages-images", alt: "card-image"});
	//title
	let title = create("div", {class: "recettes_pages-description-title"});
	title.textContent = recipe[1].name;

	let timeParent = create("div", {class: "recettes_pages-description-time"});
	timeParent.innerHTML =  "<div>" + recipe[1].time + " min</div>"

	//grouping the header elements
	let headerParent = create("div", {class: "recettes_pages-description-1"});
	headerParent.appendChild(title);
	headerParent.appendChild(timeParent);

	//ingredients list
	let ingredients = create("ul", {class: "recettes_pages-description-ingredients"});
	let eachIngredient = recipe[1].ingredients.map(function(ingredients) {
		if (Object.prototype.hasOwnProperty.call(ingredients, "quantity") && Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
			return "<li><span class='recettes_pages-description-ingredients-bold'>" + ingredients.ingredient + "</span>: "+ ingredients.quantity + ingredients.unit + "</li>";
		} else if (Object.prototype.hasOwnProperty.call(ingredients, "quantity") && !Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
			return "<li ><span class='recettes_pages-description-ingredients-bold'>" + ingredients.ingredient + "</span>: "+ ingredients.quantity + "</li>";
		} else if (!Object.prototype.hasOwnProperty.call(ingredients, "quantity") && !Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
			return "<li ><span class='recettes_pages-description-ingredients-bold'>" + ingredients.ingredient + "</span></li>";
		}
	}).join("");

	ingredients.innerHTML = eachIngredient;

	//cook method
	let method = create("div", {class: "recettes_pages-description-method text-truncate"});
	method.textContent = recipe[1].description;
	//appliance section
	let appliances = create("div", {class: "display-none"});
	appliances.textContent = recipe[1].appliance;
	//utensils section
	let utensils = create("div", {class: "display-none"});
	let eachUtensils = recipe[1].ustensils.map(function(utensil) {
		return "<p class='utensil'>" + utensil + "</p>";
	}).join("");
	utensils.innerHTML = eachUtensils;
	
	

	//card body
	let cardBody = create("div", {class: "recettes_pages-description-2"});
	//combine in card body
	cardBody.appendChild(ingredients);
	cardBody.appendChild(method);
	cardBody.appendChild(appliances);
	cardBody.appendChild(utensils);
	//
	let cardDesription = create ("div",{class:"recettes_pages-description"})
	cardDesription.appendChild(headerParent)
	cardDesription.appendChild(cardBody)
	//card container
	let cardContainer = create("article", {class: "recettes_pages"});
	//combine to DOM
	cardContainer.appendChild(image);
	cardContainer.appendChild(cardDesription);
	

	let mainSection = document.getElementById("recettes_container");
	//put into DOM
	mainSection.appendChild(cardContainer);
}




