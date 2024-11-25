//* Fonction de recherche en utilisant une programmation fonctionnelle
//* --------------------------------------------------
let originalRecipes = [];

export function setOriginalRecipes(recipes) {
  originalRecipes = recipes;
}

export function getOriginalRecipes() {
  return originalRecipes;
}

export function filterCommonRecipes(inputSearchBar, tags) {
  // Commence par toutes les recettes
  let filteredRecipes = originalRecipes;

  // Applique le filtre par input si nécessaire
  if (inputSearchBar.length > 0) {
    filteredRecipes = filterRecipesByInput(filteredRecipes, inputSearchBar);
  }

  // Applique le filtre par tags si nécessaire
  if (tags.length > 0) {
    filteredRecipes = filterRecipesByTags(filteredRecipes, tags);
  }

  // Retourne la liste finale des recettes filtrées
  return filteredRecipes;
}

// Fonction pour filtrer les recettes par input (barre de recherche)
export function filterRecipesByInput(recipes, inputSearchBar) {
  if (!inputSearchBar || !recipes.length) return [];

  return recipes.filter((recipe) => {
    const nameNormalized = normalizeText(recipe.name);
    const descriptionNormalized = normalizeText(recipe.description);
    const ingredientsNormalized = recipe.ingredients.map((ingredient) =>
      normalizeText(ingredient.ingredient)
    );

    // Vérifie si chaque mot-clé est présent dans au moins un des champs
    return inputSearchBar.every((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      return (
        nameNormalized.includes(normalizedKeyword) ||
        descriptionNormalized.includes(normalizedKeyword) ||
        ingredientsNormalized.some((ingredient) =>
          ingredient.includes(normalizedKeyword)
        )
      );
    });
  });
}

// Fonction pour filtrer les recettes par tags
export function filterRecipesByTags(recipes, tags) {
  if (!tags.length || !recipes.length) return [];

  return recipes.filter((recipe) => {
    const ingredients = recipe.ingredients.map(
      (ingredient) => ingredient.ingredient
    );
    const appliance = recipe.appliance;
    const utensils = recipe.ustensils;

    // Vérifie si chaque tag correspond à un des champs
    return tags.every((tag) => {
      return (
        ingredients.includes(tag) || appliance === tag || utensils.includes(tag)
      );
    });
  });
}

// Fonction pour normaliser le texte
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
