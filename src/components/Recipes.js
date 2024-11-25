import { getOriginalRecipes } from "../modules/recipes.js";

// Fonction qui génère la section des recettes
export function Recipes() {
  const recipes = getOriginalRecipes();
  const recipesSection = document.createElement("section");
  recipesSection.classList.add("recipes");
  recipesSection.id = "recipes-section";
  recipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(
      recipe.image,
      recipe.name,
      recipe.time,
      recipe.ingredients,
      recipe.description
    );
    recipesSection.appendChild(recipeCard);
  });

  return recipesSection;
}

// Fonction pour mettre à jour l'affichage des recettes
export function updateRecipes(filteredRecipes) {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = ""; // Vide la section actuelle
  filteredRecipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(
      recipe.image,
      recipe.name,
      recipe.time,
      recipe.ingredients,
      recipe.description
    );
    recipesSection.appendChild(recipeCard);
  });
  const recipesCount = document.querySelector("#recipes-count");
  recipesCount.textContent = `${filteredRecipes.length} Recettes`;
}

// Fonction pour créer une carte de recette
function createRecipeCard(image, name, time, ingredients, description) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");
  card.id = "recipe-card"; // Ajout de l'id

  // Image container
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  imgContainer.id = "image-container"; // Ajout de l'id

  const cardImg = document.createElement("img");
  cardImg.src = `../../assets/pictures/recipes/${image}`;
  cardImg.alt = name;
  imgContainer.appendChild(cardImg);

  // Temps de la recette en haut à droite
  const cardTime = document.createElement("span");
  cardTime.textContent = `${time} min`;
  cardTime.classList.add("recipe-time");
  cardTime.id = "recipe-time"; // Ajout de l'id
  imgContainer.appendChild(cardTime);

  // Titre de la recette
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = name;
  cardTitle.classList.add("recipe-title");
  cardTitle.id = "recipe-title"; // Ajout de l'id

  // Section de la description de la recette
  const recipeDescTitle = document.createElement("h4");
  recipeDescTitle.textContent = "Recette";
  recipeDescTitle.classList.add("recipe-subtitle");
  recipeDescTitle.id = "recipe-desc-title"; // Ajout de l'id

  const recipeDesc = document.createElement("p");
  recipeDesc.title = description;
  recipeDesc.textContent = description;
  recipeDesc.classList.add("recipe-description");
  recipeDesc.id = "recipe-description"; // Ajout de l'id

  // Section des ingrédients
  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Ingrédients";
  ingredientsTitle.classList.add("recipe-subtitle");
  ingredientsTitle.id = "ingredients-title"; // Ajout de l'id

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients-container");
  ingredientsContainer.id = "ingredients-container"; // Ajout de l'id

  // Liste des ingrédients
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("ingredients-list");
  ingredientsList.id = "ingredients-list"; // Ajout de l'id

  // Parcourir les ingrédients
  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");

    // Élément pour l'ingrédient
    const ingredientName = document.createElement("span");
    ingredientName.textContent = ingredient.ingredient;
    ingredientName.classList.add("ingredient-name");
    ingredientName.id = "ingredient-name"; // Ajout de l'id

    // Élément pour la quantité
    const quantity = document.createElement("span");
    quantity.textContent = ingredient.quantity
      ? `${ingredient.quantity} ${ingredient.unit || ""}`
      : "-";
    quantity.classList.add("ingredient-quantity");
    quantity.id = "ingredient-quantity"; // Ajout de l'id

    // Ajouter l'ingrédient et la quantité sous l'ingrédient dans la même colonne
    li.appendChild(ingredientName);
    li.appendChild(quantity);

    // Ajouter chaque ingrédient à la liste
    ingredientsList.appendChild(li);
  });

  // Ajouter la liste au container
  ingredientsContainer.appendChild(ingredientsList);

  // Ajouter tous les éléments à la carte
  card.append(
    imgContainer,
    cardTitle,
    recipeDescTitle,
    recipeDesc,
    ingredientsTitle,
    ingredientsContainer
  );

  return card;
}
