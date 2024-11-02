const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeclosebtn = document.querySelector('.recipe-close-btn');
const recipedetailscontent = document.querySelector('.recipe-details-content');

const fetchrecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
`);
    const response = await data.json();
    recipecontainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p><span>${meal.strCategory}</span> Catagory</p>
    
    `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipediv.appendChild(button);

        button.addEventListener('click', () => {
            openrecipePopup(meal);
        })
        recipecontainer.appendChild(recipediv);
    });
} catch (error) {
    recipecontainer.innerHTML = "<h2>Error In Fetching Recipes...</h2>"  
}
}

const fetchingredients = (meal) => {
    let ingredientslist = ""
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const Measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${Measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
}


const openrecipePopup = (meal) =>{
    recipedetailscontent.innerHTML =`
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3 class ="ind">Ingredients :</h3>
    <ul class="ingredientlist">${fetchingredients(meal)}</ul>
    <div class="recipeinstructions">
    <h3>Instructions :</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipedetailscontent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener(`click`,()=>{
    recipedetailscontent.parentElement.style.display = "none";
})
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
        recipecontainer.innerHTML = `<h2> Type the meal in the search box.</h2>`
        return;
    }

    fetchrecipes(searchinput);
})