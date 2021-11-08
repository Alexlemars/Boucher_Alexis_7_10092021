let searchBar = document.querySelector('.navbar_form-input')

//faire du HTML dynamique depuis le JSON
const element = document.querySelector(".recettes_container");

const createCard = async (recipes) => {
	const element = document.querySelector(".recettes_container");

	element.innerHTML = ""
	recipes.forEach((recette) => {
		element.innerHTML += `
        <article class="recettes_pages">
        <div class="recettes_pages-images"></div>
        <div class="recettes_pages-description">
        <div class="recettes_pages-description-1" >   
        <div class="recettes_pages-description-title"> ${recette.name}<span class="display-none">${recette.appliance}${recette.ustensils}<span></div>
        <div class="recettes_pages-description-time"> <i class="far fa-clock"></i> ${recette.time} min</div>
        </div>
        <div class="recettes_pages-description-2">
        
            <ul class="recettes_pages-description-ingredients">
            ${recette.ingredients.map(ing => `<li>
            <span class="recettes_pages-description-ingredients-bold">${ing.ingredient}
               :</span> ${(ing.quantity|| "Pm")} ${(ing.unit||"")}
               </li>`).join('')}
            </ul>
        
        <div class="recettes_pages-description-method text-truncate">${recette.description}</div>
        </div> 
        </div>
    </article>`
	});
    
};




