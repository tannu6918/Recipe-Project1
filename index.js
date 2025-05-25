const SearchBox = document.querySelector(".SearchBox")
const serchbtn = document.querySelector(".serchbtn")
const recipeconainer = document.querySelector(".recipe-conainer")
const recipecloseBtn = document.querySelector(".recipe-closeBtn")
const recipedetailscontent = document.querySelector(".recipe-details-content")

const fetchRecipe =  async (query)=>{
    recipeconainer.innerHTML = "Feching Recipe...."
    try{
   const data =  await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s= ${query}`)
   const response = await data.json();

    recipeconainer.innerHTML = ""
   response.meals.forEach ( meal =>{
    // console.log(meal);

    // recipeDiv is used for write html code in javascript
    const recipeDiv = document.createElement('div')
    recipeDiv.classList.add('recipe')
    recipeDiv.innerHTML = `
     <img src= " ${meal.strMealThumb}">
    <h3> ${ meal.strMeal}</h3>
     <p> <span> ${ meal.strArea} </span> Dish </p>
     <p>  Belongs To  <span>${ meal.strCategory} </span>  Ctegory </p>
    `
    const button = document.createElement('button')
    button.textContent = "View Recipe"
    recipeDiv.appendChild(button)

 //  adding eventlistener  to recipe  button 
  button.addEventListener('click',()=>{
     openRecipePopup(meal);
  });

    recipeconainer.appendChild(recipeDiv);
    });
  }
  catch(error){
recipeconainer.innerHTML = " Error In Feching Recipe...."
  }
  
}


const fetchIngrediens = (meal)=>{
  //  console.log(meal)
  let ingredientsList = "";
  for (let i=1;  i <=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal [`strMeasure${i}`];
      ingredientsList  +=  `<li> ${measure}  ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientsList;
}

const  openRecipePopup = (meal)=>{
   recipedetailscontent.innerHTML = `
   <h2 class="recipeName"> ${meal.strMeal}</h2>
   <h3 "> Ingredents:</h3>
   <ul class ="ingredentList"> ${fetchIngrediens(meal)}</ul>

   <div class = "recipeinstructions"> 
     <h1>Instructions:</h1>
     <p > ${ meal.strInstructions}</p>
   </div>
   `
    
   recipedetailscontent.parentElement.style.display = "block";
}


recipecloseBtn.addEventListener('click', ()=>{
 recipedetailscontent.parentElement.style.display = "none";
})

serchbtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    const serchinput = SearchBox.value.trim();
    if (serchinput){
      recipeconainer.innerHTML = `<h2> Type The Meal in Search Box</h2>`;
      return;
    }
    fetchRecipe(serchinput);
  //console.log("Btn cicked")
})