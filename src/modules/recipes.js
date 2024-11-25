//* Fonction de recherche en utilisant les boucles natives
//* --------------------------------------------------
let originalRecipes = [];

export function setOriginalRecipes(recipes) {
  originalRecipes = recipes;
}

export function getOriginalRecipes() {
  return originalRecipes;
}
export function filterCommonRecipes(inputSearchBar, tags) {
  let filteredByInput = [];
  let filteredByTags = [];

  // Cas 1 : Filtrage par input uniquement (tags est vide ou non défini)
  if (inputSearchBar.length > 0) {
    filteredByInput = filterRecipesByInput(inputSearchBar);
  } else {
    // Si aucun input, on prend toutes les recettes
    filteredByInput = originalRecipes;
  }

  // Cas 2 : Filtrage par tags uniquement (input est vide ou non défini)
  if (tags.length > 0) {
    filteredByTags = filterRecipesByTags(tags);
  } else {
    // Si aucun tag, on prend toutes les recettes
    filteredByTags = originalRecipes;
  }

  // Si on a seulement l'un des deux filtres, retourne celui qui a été filtré
  if (inputSearchBar.length === 0) return filteredByTags;
  if (tags.length === 0) return filteredByInput;

  // Cas 3 : Si input et tags sont tous les deux présents, on renvoie l'intersection
  if (inputSearchBar && tags.length > 0) {
    let commonRecipes = [];
    for (let i = 0; i < filteredByInput.length; i++) {
      const recipeInput = filteredByInput[i];
      for (let j = 0; j < filteredByTags.length; j++) {
        if (recipeInput === filteredByTags[j]) {
          commonRecipes.push(recipeInput);
          break;
        }
      }
    }
    return commonRecipes;
  }

  // Cas 4 : Si aucun tag et aucun input, renvoie toutes les recettes
  if (
    (!inputSearchBar || inputSearchBar.length === 0) &&
    (!tags || tags.length === 0)
  ) {
    return originalRecipes;
  }
}

// Fonction pour normaliser le texte en supprimant les accents et en convertissant en minuscules
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Fonction pour filtrer les recettes par input (barre de recherche)
export function filterRecipesByInput(inputSearchBar) {
  if (!inputSearchBar || !originalRecipes || originalRecipes.length === 0) {
    return [];
  }

  let filteredRecipesByInput = [];

  for (let i = 0; i < originalRecipes.length; i++) {
    const recipe = originalRecipes[i];
    let matchFound = true;

    const nameNormalized = normalizeText(recipe.name);
    const descriptionNormalized = normalizeText(recipe.description);
    const ingredientsNormalized = recipe.ingredients.map((ingredient) =>
      normalizeText(ingredient.ingredient)
    );

    for (let j = 0; j < inputSearchBar.length; j++) {
      const keyword = inputSearchBar[j];

      const inName = nameNormalized.includes(keyword);
      const inDescription = descriptionNormalized.includes(keyword);
      const inIngredients = ingredientsNormalized.some((ingredient) =>
        ingredient.includes(keyword)
      );

      if (!inName && !inDescription && !inIngredients) {
        matchFound = false;
        break;
      }
    }

    if (matchFound) {
      filteredRecipesByInput.push(recipe);
    }
  }
  return filteredRecipesByInput;
}

// Fonction pour filtrer les recettes par tags
// Fonction pour filtrer les recettes par tags
export function filterRecipesByTags(tags) {
  if (
    !tags ||
    tags.length === 0 ||
    !originalRecipes ||
    originalRecipes.length === 0
  ) {
    return [];
  }

  let filteredRecipesByTags = [];

  // Parcours des recettes
  for (let i = 0; i < originalRecipes.length; i++) {
    const recipe = originalRecipes[i];
    let matchFound = true;

    // Préparation des listes de comparaison pour la recette
    const ingredients = recipe.ingredients.map(
      (ingredient) => ingredient.ingredient
    ); // Liste des ingrédients
    const appliance = recipe.appliance; // Appareil
    const utensils = recipe.ustensils; // Liste des ustensiles

    // Vérification pour chaque tag
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];

      // Vérifie si le tag correspond à un ingrédient, un appareil ou un ustensile
      const inIngredients = ingredients.includes(tag);
      const inAppliance = appliance === tag;
      const inUtensils = utensils.includes(tag);

      // Si aucun match trouvé, la recette n'est pas valide pour ce tag
      if (!inIngredients && !inAppliance && !inUtensils) {
        matchFound = false;
        break;
      }
    }

    // Si tous les tags correspondent, ajoute la recette à la liste filtrée
    if (matchFound) {
      filteredRecipesByTags.push(recipe);
    }
  }

  return filteredRecipesByTags;
}
