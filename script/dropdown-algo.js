

let filterByTag = (tag)=>{
    let recipeCards = Array.from(document.getElementsByClassName("recettes_pages"))
    let input = tag.textContent.toLowerCase()
    for (let i=0; i<recipeCards.length;i++){
        if(!recipeCards[i].hasAttribute("style")){
            if(!recipeCards[i].innerHTML.toLowerCase().includes(input)){
                recipeCards[i].style.display = "none";
            }else {
                recipeCards[i].removeAttribute("style")
            }
        }
    }
}
const create = (elm, attributes) => {
	const element = document.createElement(elm);
	for (let key in attributes) {
		element.setAttribute(key, attributes[key])
	}
	return element;
}



let createTagBlue = (target)=>{
    let selectedTag = create("li",{class:"filter-blue filter-all"});
    selectedTag.innerHTML = target.textContent +"<i class='far fa-times-circle'></i>"
    document.querySelector(".filter").appendChild(selectedTag)
}
let createTagGreen = (target)=>{
    let selectedTag = create("li",{class:"filter-green filter-all"});
    selectedTag.innerHTML = target.textContent +"<i class='far fa-times-circle'></i>"
    document.querySelector(".filter").appendChild(selectedTag)
}
let createTagOrange = (target)=>{
    let selectedTag = create("li",{class:"filter-orange filter-all"});
    selectedTag.innerHTML = target.textContent +"<i class='far fa-times-circle'></i>"
    document.querySelector(".filter").appendChild(selectedTag)
}

let unfilterTag = (tag)=>{
    let recipeCards = Array.from(document.getElementsByClassName('recettes_pages'))
    let input = tag.textContent.toLowerCase();
    for(let  i = 0;i<recipeCards.length;i++){
        if (recipeCards[i].hasAttribute("style") && !recipeCards[i].innerHTML.toLowerCase().includes(input)) {
            recipeCards[i].removeAttribute("style");
    }
    }

}




document.addEventListener("click",(e)=>{
    if (e.target.matches(".item-blue")){
        e.preventDefault()
        createTagBlue(e.target)
        filterByTag(e.target);
        dropDownContainerBlue.style.display = "none";
    }else if(e.target.matches(".item-green")){
        e.preventDefault()
        createTagGreen(e.target)
        filterByTag(e.target)
        searchFilterGreen.value=""
        dropDownContainerGreen.style.display = "none";
    }else if(e.target.matches(".item-orange")){
        e.preventDefault()
        createTagOrange(e.target)
        filterByTag(e.target)
        searchFilterOrange.value=""
        dropDownContainerOrange.style.display = "none";
    }else if(e.target.matches(".fa-times-circle")){
        document.querySelector(".filter").removeChild(e.target.parentElement)
        unfilterTag(e.target.parentElement)
    }

})




