const searchFilterBlue = document.querySelector(".btn_search-blue");
const searchFilterGreen = document.querySelector(".btn_search-green");
const searchFilterOrange = document.querySelector(".btn_search-orange");

const initdropdown = async () => {
  const { recipes } = await getData();

  function searchFilter(dropdown,e) {
    for (let i = 0; i < dropdown.childNodes.length; i++) {
    if (
      !dropdown.childNodes[i].textContent
        .toLowerCase()
        .includes(e)
    ) {
      dropdown.childNodes[i].style.display = "none";
    } else {
      dropdown.childNodes[i].removeAttribute("style");
    }
  }
  }
  searchFilterBlue.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    searchFilter(dropdownBlue , searchString)
    
  });
  searchFilterGreen.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    searchFilter(dropdownGreen , searchString)
  });

  searchFilterOrange.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    searchFilter(dropdownOrange , searchString)
  });
};
initdropdown();
