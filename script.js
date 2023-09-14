const rangeInput = document.querySelector('#rangeInput');
const rangeDisplay = document.querySelector('#rangeDisplay');
const main = document.querySelector('main');
const searchInput = document.querySelector('#searchInput');
const sortBtn = document.querySelector('#sortBtn')
let sortMethod = true

rangeInput.addEventListener('input',(e) => {
  rangeDisplay.textContent = rangeInput.value
  displayMeals();
});


let meals = [];

async function fetchMeals(){
await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
.then((res) => res.json())
.then((data) => (meals = data.meals));

displayMeals();

console.log(meals);
}

const displayMeals = () => {
  // meals.length = 12;
  main.innerHTML = "";
  meals
  .sort((a, b) => {
    if (sortMethod){
      return a.strMeal.localeCompare(b.strMeal);
     }else{
       return b.strMeal.localeCompare(a.strMeal);
    }
   })
  .slice(0, rangeInput.value) 
  .map((meal) => {
    main.innerHTML += `
    <div class="card-container">
    <div class="card">
      <span class="name">${meal.strMeal}</span>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="recipe">
        ${meal.strInstructions}
      </div>
    </div>
  </div>`
  });
}


fetchMeals();

searchInput.addEventListener('input' ,(e) =>{
  fetchMeals();
});



 sortBtn.addEventListener('click', (e) => {
    sortMethod = !sortMethod;
    const textSortBtn = sortBtn.textContent;
    displayMeals();
    if (textSortBtn == 'Croissant') e.target.textContent = 'Decroissant';
     else  e.target.textContent = 'Croissant';
 
});

