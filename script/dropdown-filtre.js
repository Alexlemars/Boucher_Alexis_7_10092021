const searchFilterBlue = document.querySelector(".btn_search-blue")
const searchFilterGreen = document.querySelector(".btn_search-green")
const searchFilterOrange = document.querySelector(".btn_search-orange")




const initdropdown = async () => {
  const { recipes } = await getData();


  searchFilterBlue.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    
      for (let i=0; i<dropdownBlue.childNodes.length; i++) {
        ;
        if (!dropdownBlue.childNodes[i].textContent.toLowerCase().includes(searchString)) {
          dropdownBlue.childNodes[i].style.display = "none";
          
        }else{
          dropdownBlue.childNodes[i].removeAttribute("style");
        }
      }
  });
  
  searchFilterGreen.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    
      for (let i=0; i<dropdownGreen.childNodes.length; i++) {
        ;
        if (!dropdownGreen.childNodes[i].textContent.toLowerCase().includes(searchString)) {
          dropdownGreen.childNodes[i].style.display = "none";
        } else {
          dropdownGreen.childNodes[i].removeAttribute("style");
        }
      }
    });
    
  
  searchFilterOrange.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    
      for (let i=0; i<dropdownOrange.childNodes.length; i++) {
        ;
        if (!dropdownOrange.childNodes[i].textContent.toLowerCase().includes(searchString)) {
          dropdownOrange.childNodes[i].style.display = "none";
        } else {
          dropdownOrange.childNodes[i].removeAttribute("style");
        }
      }
  });
};
initdropdown();