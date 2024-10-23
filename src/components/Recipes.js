import { api } from "../api/api.js";

// Fonction qui génère la section des recettes
export function Recipes() {
  const recipes = api.getAllRecipes(); // Appelle l'API pour obtenir toutes les recettes
  const recipesSection = document.createElement("section");
  recipesSection.classList.add("recipes");

  // Pour chaque recette, créer une carte et l'ajouter à la section
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

  return recipesSection; // Retourne la section remplie avec les cartes de recettes
}

// Fonction pour créer une carte de recette
function createRecipeCard(image, name, time, ingredients, description) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  // Image container
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");

  const cardImg = document.createElement("img");
  cardImg.src = `../../assets/pictures/recipes/${image}`;
  cardImg.alt = name;
  imgContainer.appendChild(cardImg);

  // Temps de la recette en haut à droite
  const cardTime = document.createElement("span");
  cardTime.textContent = `${time} min`;
  cardTime.classList.add("recipe-time");
  imgContainer.appendChild(cardTime);

  // Titre de la recette
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = name;
  cardTitle.classList.add("recipe-title");

  // Section de la description de la recette
  const recipeDescTitle = document.createElement("h4");
  recipeDescTitle.textContent = "Recette";
  recipeDescTitle.classList.add("recipe-subtitle");

  const recipeDesc = document.createElement("p");
  recipeDesc.textContent = description;
  recipeDesc.classList.add("recipe-description");

  // Section des ingrédients
  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Ingrédients";
  ingredientsTitle.classList.add("recipe-subtitle");

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients-container");

  // Liste pour les ingrédients
  const leftColumn = document.createElement("ul");
  const rightColumn = document.createElement("ul");

  // Répartir les ingrédients dans deux colonnes
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    const quantity = ingredient.quantity
      ? `${ingredient.quantity} ${ingredient.unit || ""}`
      : "";
    li.textContent = `${ingredient.ingredient} ${quantity}`;

    if (index % 2 === 0) {
      leftColumn.appendChild(li);
    } else {
      rightColumn.appendChild(li);
    }
  });

  ingredientsContainer.append(leftColumn, rightColumn);

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
