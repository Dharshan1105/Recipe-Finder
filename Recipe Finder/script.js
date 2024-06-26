const input = document.querySelector('.search');
const button = document.querySelector('.button');
const resultContainer = document.querySelector('.result');

const appId = '3fda9d90';
const appKey = '2fad6bb68df0cfbac7de6a9637a61834';

button.addEventListener("click", () => {
    const query = input.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    

    let url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=10`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching the recipes:', error);
        resultContainer.innerHTML = `<p class="error">Unable to fetch recipes. Please try again later.</p>`;
    }
}

function displayRecipes(recipes) {
    resultContainer.innerHTML = '';
    if (recipes.length == 0) {
        resultContainer.innerHTML = '<p class="no-result">No Recipe is found</p>';
    }
    recipes.forEach(Recipe => {
        const recipe = Recipe.recipe;
        const recipeBox = document.createElement("div");
        recipeBox.classList.add("result-box");
        recipeBox.innerHTML = `
            <div class="imgContent">
                <img src="${recipe.image}" alt="${recipe.label}">
            </div>
            <div class="recipeContent">
                <h3>${recipe.label}</h3>
                <p>Calories: ${Math.round(recipe.calories)}</p>
                <p>Diet Labels: ${recipe.dietLabels.join(', ')}</p>
                <a href="${recipe.url}" target="_blank">View Recipe</a>
            </div>`;
        resultContainer.appendChild(recipeBox);
    });
}



