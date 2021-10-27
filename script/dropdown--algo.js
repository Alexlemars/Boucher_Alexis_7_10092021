
const displayAlgoBlue = async (tag) => {
    const {recipes} = await getData()
        const searchIngredient = tag.textContent.toLowerCase()

        const filterItemIng = recipes.filter((ing)=>{
            const ingredients = []
            ing.ingredients.forEach((ings)=>{
                ingredients.push(ings.ingredient)
            })
            var srcKeys = JSON.stringify(ingredients).toLowerCase()
            let ingredient = srcKeys.includes(searchIngredient)
            
            return ingredient
        })  


            displayItemGreen(filterItemIng);
            displayItemOrange(filterItemIng);
}

const displayAlgoGreen = async (tag) => {
    const {recipes} = await getData()
    
            const searchApp = tag.textContent.toLowerCase()
                    
            const filterItemApp = recipes.filter((app)=>{
                var srcKeys = app.appliance.toLowerCase()

                return srcKeys.includes(searchApp)  
            })
                displayItemBlue(filterItemApp);
                displayItemOrange(filterItemApp);
            

    }
    const displayAlgoOrange = async (tag) => {
        const {recipes} = await getData();
            const searchUstensiles = tag.textContent.toLowerCase() 
            
    
            const filterItemUstensiles = recipes.filter((ust)=>{
                const ustensil = []
                ust.ustensils.forEach((usts)=>{
                    ustensil.push(usts)
                })
    
                var srcKeys = JSON.stringify(ustensil)
                return srcKeys.includes(searchUstensiles)

                
            })

            displayItemBlue(filterItemUstensiles);
            displayItemGreen(filterItemUstensiles);
} 


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


const evenement = async () => {
	const {recipes} = await getData();
    
}
evenement()



//filtre bar de recherches avec mot clef
const init = async () => {
	const {recipes} = await getData();

	let recipesArray = Object.entries(recipes);


	recipesArray.forEach(recipe => createCard(recipe));
	
	let quickSort = (array, left, right) => {
	let index;
	if (array.length > 1) {
		index = partition(array, left, right); //take index from partition
		if (left<index-1) { //more elements on the left
			quickSort(array, left, index-1);
		}
		if (index<right) { //more elements on the right
			quickSort(array, index, right);
		}
	}
	return array;
}
//partition code, to make a left and right elements list
let partition = (array, left, right) => {
	let pivot = array[Math.floor((right + left) / 2)]; //middle element

	while (left <= right) {
		while (array[left].localeCompare(pivot) < 0) {
			left++;
		}
		while (array[right].localeCompare(pivot) > 0) {
			right--;
		}
		if (left <= right) {
			swap(array, left, right);
			left++;
			right--;
		}
	}
	return left;
}
//function to swap position
let swap = (items, leftIndex, rightIndex) => {
	var temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}
//filter and extract only id, name, ingredients, and description
let createFilteredArr = (arr) => {
	let filteredArr = [];
	for (let i = 0; i<arr.length; i++) {
		let filtered = (({id, ingredients, name, description}) => ({id, ingredients, name, description}))(arr[i][1]);
		filteredArr.push(filtered);
	}
	return filteredArr;
}
let filteredArr = createFilteredArr(recipesArray);

function FilterKeyword(item) {
	this.id = item.id;
	let thisIngre = item.ingredients.map(b => b.ingredient.toLowerCase()).flat();
	let keywordString = item.name + " " + thisIngre + " " + item.description;
	let uniqueValue = [...new Set(keywordString.split(/[\s,().]+/))];
	this.keyword = quickSort(uniqueValue, 0, uniqueValue.length-1);
}

let extractKeyword = (arr) => {
	let newArr = [];
	for (let i=0; i<arr.length; i++) {
		let keyword = new FilterKeyword(arr[i]);
		newArr.push(keyword);
	}
	return newArr;
}
let filteredKeywordArr = extractKeyword(filteredArr);

//take only the keywords
let allKeywords = [];
filteredKeywordArr.forEach(item => {allKeywords.push(item.keyword)});
let flatKeyword = allKeywords.flat();
let allKeywordsLowerCase = [];
flatKeyword.forEach(word => {allKeywordsLowerCase.push(word.toLowerCase())});
let searchOptionsNotSorted = [...new Set(allKeywordsLowerCase.flat())];
//sort by alphabetical order
let searchOptions = quickSort(searchOptionsNotSorted, 0, searchOptionsNotSorted.length-1);

function KeywordObject(item) {
	this.keyword = item;
	let recipeIds = [];
	for (let i=0; i<filteredKeywordArr.length; i++) {
		if (filteredKeywordArr[i].keyword.indexOf(item) >= 0 ) {
			recipeIds.push(filteredKeywordArr[i].id);
		}
	}
	this.ids = recipeIds;
}

let keywordArray = (arr) => {
	let newArr = [];
	for (let i=0; i<arr.length; i++) {
		let keyword = new KeywordObject(arr[i]);
		newArr.push(keyword);
	}
	return newArr;
}

let keywordObjectArray = keywordArray(searchOptions);


//simple binary search, to give the first found result
let binarySearch = (array, target) => {
	let start = 0;
	let end = array.length-1;
	if (start > end) {
		return -1;
	}
	while(start <= end) {
		let middleIndex = Math.floor((start+end)/2);
		if (array[middleIndex].keyword.toLowerCase().includes(target.toLowerCase())) {
			return middleIndex;
		} else if (target.toLowerCase().localeCompare(array[middleIndex].keyword.toLowerCase()) < 0) {
			end = middleIndex - 1;
		} else if (target.toLowerCase().localeCompare(array[middleIndex].keyword.toLowerCase()) > 0) {
			start = middleIndex +1;
		} else {
			return -1;
		}
	}
}

//binary search to get the range of all fitting result
let binarySearchMultiple = (array, target) => {
	let firstMatch = binarySearch(array, target);
	let resultArr = [-1, -1];
	if (firstMatch == -1) {
		return resultArr;
	}

	let leftMost = firstMatch;
	let rightMost = firstMatch;

	if (firstMatch >= 0) {
		while (leftMost > 0 && array[leftMost-1].keyword.includes(target)) {
			leftMost--;
		}
		while (rightMost < array.length-1 && array[rightMost+1].keyword.includes(target)) {
			rightMost++;
		}
	}

	resultArr[0] = leftMost;
	resultArr[1] = rightMost;

	let allSelectedIndex = [];
	for (let i=resultArr[0]; i<=resultArr[1]; i++) {
		allSelectedIndex.push(i);
	}

	let selectedIds = [];
	allSelectedIndex.forEach(index => {
		selectedIds.push(array[index].ids);
	});

	return [...new Set(selectedIds.flat())].sort(function(a,b) {return a-b});	
}

//searching function
let launchSearch = (e) => {
	
	if (searchBar.value.length > 2) {
		element.innerHTML = "";
		let input = e.target.value.toLowerCase();
		let selectedArr = binarySearchMultiple(keywordObjectArray, input);
		
		if (selectedArr.length > 0) {
			selectedArr.forEach(recipeId => {
			createCard(recipesArray[recipeId-1]);
		});
		} else {
			element.innerHTML = "<p id='noresult-msg'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
		}
	} else {
		element.innerHTML = "";
        recipesArray.forEach(recipe => createCard(recipe));
	}
}

	searchBar.addEventListener('keyup' ,function(e) {launchSearch(e)})
    
    
    
    let deleteItem = (tag) => {
        tag.style.display = "none"
    }

    document.addEventListener("click",(e)=>{
    
        if (e.target.matches(".item-blue")){
            e.preventDefault()
            deleteItem(e.target)
            filterByTag(e.target)
            displayAlgoBlue(e.target)
            createTagBlue(e.target)
            dropDownContainerBlue.style.display = "none";
        }else if(e.target.matches(".item-green")){
            e.preventDefault()
            filterByTag(e.target)
            deleteItem(e.target)
            displayAlgoGreen(e.target)
            createTagGreen(e.target)
            searchFilterGreen.value=""
            dropDownContainerGreen.style.display = "none";
        }else if(e.target.matches(".item-orange")){
            e.preventDefault()
            filterByTag(e.target)
            deleteItem(e.target)
            displayAlgoOrange(e.target)
            createTagOrange(e.target)
            searchFilterOrange.value=""
            dropDownContainerOrange.style.display = "none";
        }else if(e.target.matches(".fa-times-circle")){
            document.querySelector(".filter").removeChild(e.target.parentElement)
			recipesArray.forEach(recipe => createCard(recipe))
            displayItemBlue(recipes)
            displayItemOrange(recipes)
            displayItemGreen(recipes)  
            
        }
    
    })
    
    displayItemBlue(recipes)
    displayItemGreen(recipes)
    displayItemOrange(recipes)
	

};


init();


