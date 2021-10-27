const getData = () => fetch("./recipes.json", )
  .then(res => res.json())
  .catch(err => console.log("", err))

  
