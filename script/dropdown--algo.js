//permet de  trier les ingredients
const displayBlue = async (tag) => {
  const { recipes } = await getData();
  const searchIngredient = tag.textContent.toLowerCase();

  const filterItemIng = recipes.filter((ing) => {
    const ingredients = [];
    ing.ingredients.forEach((ings) => {
      ingredients.push(ings.ingredient);
    });
    var srcKeys = JSON.stringify(ingredients).toLowerCase();
    let ingredient = srcKeys.includes(searchIngredient);

    return ingredient;
  });
  displayItemGreen(filterItemIng);
  displayItemOrange(filterItemIng);
};
//permet de trier les appareils
const displayGreen = async (tag) => {
  const { recipes } = await getData();

  const searchApp = tag.textContent.toLowerCase();

  const filterItemApp = recipes.filter((app) => {
    var srcKeys = app.appliance.toLowerCase();

    return srcKeys.includes(searchApp);
  });
  displayItemBlue(filterItemApp);
  displayItemOrange(filterItemApp);
};
//permet de trier les ustensiles
const displayOrange = async (tag) => {
  const { recipes } = await getData();
  const searchUstensiles = tag.textContent.toLowerCase();

  const filterItemUstensiles = recipes.filter((ust) => {
    const ustensil = [];
    ust.ustensils.forEach((usts) => {
      ustensil.push(usts);
    });

    var srcKeys = JSON.stringify(ustensil);
    return srcKeys.includes(searchUstensiles);
  });

  displayItemBlue(filterItemUstensiles);
  displayItemGreen(filterItemUstensiles);
};
let deleteItem = (tag) => {
  tag.style.display = "none";
};

//Permet de filtrer avec les Tag
let filterByTag = (tag) => {
  let recipeCards = Array.from(
    document.getElementsByClassName("recettes_pages")
  );
  let input = tag.textContent.toLowerCase();
  for (let i = 0; i < recipeCards.length; i++) {
    if (!recipeCards[i].hasAttribute("style")) {
      if (!recipeCards[i].innerHTML.toLowerCase().includes(input)) {
        recipeCards[i].style.display = "none";
      } else {
        recipeCards[i].removeAttribute("style");
      }
    }
  }
};

const create = (elm, attributes) => {
  const element = document.createElement(elm);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
};

//Permet d'afficher les filtres
let createTagBlue = (target) => {
  let selectedTag = create("li", { class: "filter-blue filter-all" });
  selectedTag.innerHTML =
    target.textContent + "<i class='far fa-times-circle'></i>";
  document.querySelector(".filter").appendChild(selectedTag);
};
let createTagGreen = (target) => {
  let selectedTag = create("li", { class: "filter-green filter-all" });
  selectedTag.innerHTML =
    target.textContent + "<i class='far fa-times-circle'></i>";
  document.querySelector(".filter").appendChild(selectedTag);
};
let createTagOrange = (target) => {
  let selectedTag = create("li", { class: "filter-orange filter-all" });
  selectedTag.innerHTML =
    target.textContent + "<i class='far fa-times-circle'></i>";
  document.querySelector(".filter").appendChild(selectedTag);
};





//filtre bar de recherches avec mot clef 
const searchBars = async () => {
  const { recipes } = await getData();


/**
 * 
 * @description / Fonction pour ignorer les accent lors de la recherche
 */
  String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    
    return str;
    
}
/**
 * 
 * @param {string} critere
 * @param {Array} recipes
 * @param {Object} recipe
 * @param {string} recipe.name
 * @param {string} recipes.description
 * @param {string} ing.ingredient
 * @return {promise}
 * @description /Fonction de recherche avec une boucle for qui renvoie un tableau de recette.
 */
  function search(critere) {
    const recette = [];
    for (let recipe of recipes) {
      
      if (
        recipe.name.toLowerCase().sansAccent().indexOf(critere) > -1 ||
        recipe.description.toLowerCase().sansAccent().indexOf(critere) > -1 //    
      ) {
        recette.push(recipe); //Push les resultats dans la tableau recette
        continue;
      }
      for (let ing of recipe.ingredients) {
        if (ing.ingredient.toLowerCase().sansAccent().indexOf(critere) > -1) {
          recette.push(recipe); //Push les resultats dans la tableau recette
          break;
        }
      }
    }
    
	 return createCard(recette)
   
  }
  
/**
 * @description / Ecouteur d'evenement au clavier
 */

  searchBar.addEventListener("keyup", function (e) {
    e.preventDefault;
    if (searchBar.value.length > 2) { // minimun de 3 caracteres
	  element.innerHTML = ""
      search(e.target.value.toLowerCase());
	  if(element.innerHTML === ""){
		element.innerHTML = "<p id='noresult-msg'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
	  } // Message d'erreur si aucun resultat
    }
	else {
		element.innerHTML = ""
		createCard(recipes)
	}
  });
};
searchBars();




const init = async () => {
  const { recipes } = await getData();
  createCard(recipes);
/**
 * @description / ecouteur d'evenement au click 
 */
  document.addEventListener("click", (e) => {
    if (e.target.matches(".item-blue")) {
      e.preventDefault();
      deleteItem(e.target);
      filterByTag(e.target);
      displayBlue(e.target);
      createTagBlue(e.target);
      dropDownContainerBlue.style.display = "none";
    } else if (e.target.matches(".item-green")) {
      e.preventDefault();
      filterByTag(e.target);
      deleteItem(e.target);
      displayGreen(e.target);
      createTagGreen(e.target);
      searchFilterGreen.value = "";
      dropDownContainerGreen.style.display = "none";
    } else if (e.target.matches(".item-orange")) {
      e.preventDefault();
      filterByTag(e.target);
      deleteItem(e.target);
      displayOrange(e.target);
      createTagOrange(e.target);
      searchFilterOrange.value = "";
      dropDownContainerOrange.style.display = "none";
    } else if (e.target.matches(".fa-times-circle")) {
      document.querySelector(".filter").removeChild(e.target.parentElement);
      createCard(recipes)
      displayItemBlue(recipes);
      displayItemOrange(recipes);
      displayItemGreen(recipes);
    }
  });

  displayItemBlue(recipes);
  displayItemGreen(recipes);
  displayItemOrange(recipes);
};

init();
