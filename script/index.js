const searchBar = document.querySelector('.navbar_form-input')



//faire du HTML dynamique depuis le JSON


const displayData = async (recipes) => {
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







//filtre bar de recherches avec mot clef
const init = async () => {
	const {recipes} = await getData();
	
	
	searchBar.addEventListener('keyup' ,(e) =>{
		const searchString = e.target.value;


		
		const filteredWord = recipes.filter((word) =>{
			const ing = []
			word.ingredients.forEach(ings =>{
				ing.push(ings.ingredient)
				ing.push(ings.quantity || "")
				ing.push(ings.unit || "")
			})

			const ings = JSON.stringify(ing)
			const ustensils = JSON.stringify(word.ustensils)
		
			return (
			word.name.toLowerCase().includes(searchString) ||
		    word.appliance.toLowerCase().includes(searchString) ||
			word.description.toLowerCase().includes(searchString) ||
			ings.toLowerCase().includes(searchString) ||
			ustensils.toLowerCase().includes(searchString)

			)
			
		
		});
		displayData(filteredWord)
		})




	displayData(recipes);
	displayItem(recipes)
};


init();


