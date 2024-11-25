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
  // Cas 1 : Filtrage par input uniquement
  const filteredByInput =
    inputSearchBar.length > 0
      ? filterRecipesByInput(inputSearchBar)
      : originalRecipes;

  // Cas 2 : Filtrage par tags uniquement
  const filteredByTags =
    tags.length > 0 ? filterRecipesByTags(tags) : originalRecipes;

  // Cas 3 : Intersection si les deux filtres sont présents
  if (inputSearchBar.length > 0 && tags.length > 0) {
    return filteredByInput.filter((recipe) => filteredByTags.includes(recipe));
  }

  // Cas 4 : Retourne toutes les recettes si aucun filtre n'est présent
  return inputSearchBar.length === 0 && tags.length === 0
    ? originalRecipes
    : inputSearchBar.length > 0
    ? filteredByInput
    : filteredByTags;
}

// Fonction pour normaliser le texte
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Fonction pour filtrer les recettes par input (barre de recherche)
export function filterRecipesByInput(inputSearchBar) {
  if (!inputSearchBar || !originalRecipes.length) return [];

  return originalRecipes.filter((recipe) => {
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
export function filterRecipesByTags(tags) {
  if (!tags.length || !originalRecipes.length) return [];

  return originalRecipes.filter((recipe) => {
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
