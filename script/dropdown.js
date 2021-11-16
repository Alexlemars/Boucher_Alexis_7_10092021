const dropdownBlue = document.querySelector(".dropdown-menu-blue");
const dropdownOrange = document.querySelector(".dropdown-menu-orange");
const dropdownGreen = document.querySelector(".dropdown-menu-green");
const filter = document.querySelector(".filter");

let tableaux = [];
//ajouter les ingredients,appareil,ustensiles
const displayItemBlue = async (recipes) => {
  dropdownBlue.innerHTML = "";
  const tableau = [];
  recipes.forEach((word) => {
    word.ingredients.forEach((ingredients) => {
      tableau.push(ingredients.ingredient);
    });
  });
  const tableauIngredient = tableau
    .sort()
    .filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    })
    .splice(0, 30);

  tableauIngredient.forEach((ingredient) => {
    dropdownBlue.innerHTML += `<li class="item item-blue">${ingredient}</li>`;
  });
};

const displayItemGreen = async (recipes) => {
  dropdownGreen.innerHTML = "";

  const tableauapp = [];
  recipes.forEach((word) => {
    tableauapp.push(word.appliance);
  });
  const tableauApp = tableauapp
    .sort()
    .filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    })
    .splice(0, 30);

  tableauApp.forEach((app) => {
    dropdownGreen.innerHTML += `<li class="item item-green">${app}</li>`;
  });
};
const displayItemOrange = async (recipes) => {
  dropdownOrange.innerHTML = "";
  const tableauust = [];
  recipes.forEach((word) => {
    word.ustensils.forEach((ustensil) => {
      tableauust.push(ustensil);
    });
  });
  const tableauUst = tableauust
    .sort()
    .filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    })
    .splice(0, 30);

  tableauUst.forEach((app) => {
    dropdownOrange.innerHTML += `<li class="item item-orange">${app}</li>`;
  });
};

const dropDownContainerBlue = document.querySelector(".btn_container-1");
const dropDownContainerGreen = document.querySelector(".btn_container-2");
const dropDownContainerOrange = document.querySelector(".btn_container-3");

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn_filter-blue")) {
    e.stopPropagation;
    e.preventDefault;
    dropDownContainerBlue.style.display = "block";
    dropDownContainerGreen.style.display = "none";
    dropDownContainerOrange.style.display = "none";
  } else if (e.target.matches(".btn_filter-green")) {
    e.stopPropagation;
    e.preventDefault;
    dropDownContainerGreen.style.display = "block";
    dropDownContainerBlue.style.display = "none";
    dropDownContainerOrange.style.display = "none";
  } else if (e.target.matches(".btn_filter-orange")) {
    e.preventDefault;
    e.stopPropagation;
    dropDownContainerOrange.style.display = "block";
    dropDownContainerBlue.style.display = "none";
    dropDownContainerGreen.style.display = "none";
  } else if (e.target.matches(".fa-chevron-up")) {
    e.preventDefault;
    e.stopPropagation;
    dropDownContainerOrange.style.display = "none";
    dropDownContainerBlue.style.display = "none";
    dropDownContainerGreen.style.display = "none";
  }
});
