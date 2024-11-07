//* Fonction de recherche en utilisant les boucles natives
//* --------------------------------------------------

export function filterRecipesByInput(keySearch, recipes) {
  if (!keySearch || !recipes || recipes.length === 0) {
    return []; // Si `keySearch` ou `recipes` est invalide, retourne un tableau vide
  }

  let filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matchFound = true;

    // Normalise les champs de la recette pour faciliter la comparaison
    const nameNormalized = normalizeText(recipe.name);
    const descriptionNormalized = normalizeText(recipe.description);

    const ingredientsNormalized = recipe.ingredients.map((ingredient) =>
      normalizeText(ingredient.ingredient)
    );

    for (let j = 0; j < keySearch.length; j++) {
      const keyword = keySearch[j];

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
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

export function createKeySearch(input, tags = []) {
  const inputText = normalizeText(input);
  if (inputText.length < 3 || /[^a-zA-Z0-9\s-]/.test(inputText)) {
    return null;
  } else {
    const keySearch = inputText
      .split(" ")
      .filter((word) => word.length >= 3)
      .map((word) => word); // Normalise chaque mot-clé pour ignorer accents et majuscules

    tags.forEach((tag) => {
      keySearch.push(tag);
    });

    return keySearch;
  }
}

export function filterList(list, searchTerm) {
  // Normalise le terme de recherche pour ignorer les accents et rendre la recherche insensible à la casse
  const normalizedSearchTerm = normalizeText(searchTerm);

  const items = list.querySelectorAll("li");

  // Boucle sur chaque élément de la liste pour appliquer le filtre
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Normalise le texte de l'élément pour ignorer les accents
    const itemText = normalizeText(item.textContent);

    // Affiche ou cache l'élément selon s'il contient le terme de recherche
    if (itemText.includes(normalizedSearchTerm)) {
      item.style.display = ""; // Affiche l'élément s'il correspond au terme de recherche
    } else {
      item.style.display = "none"; // Cache l'élément s'il ne correspond pas
    }
  }
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

//* Fonction de recherche en utilisant les méthodes de l'objet Array
//* ----------------------------------------------------

// export function searchRecipesWithLoops(keySearch) {
//   // Filtre les recettes pour ne garder que celles qui contiennent tous les mots-clés
//   const results = recipes.filter((recipe) => {
//     // Vérifie que chaque mot-clé est présent dans le nom, la description ou les ingrédients
//     return keySearch.every((keyword) => {
//       const lowerKeyword = keyword.toLowerCase();

//       // Vérifie si le mot-clé est dans le nom, la description, ou les ingrédients
//       const inName = recipe.name.toLowerCase().includes(lowerKeyword);
//       const inDescription = recipe.description
//         .toLowerCase()
//         .includes(lowerKeyword);
//       const inIngredients = recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(lowerKeyword)
//       );

//       // Retourne `true` si le mot-clé est trouvé dans au moins l'un de ces champs
//       return inName || inDescription || inIngredients;
//     });
//   });

//   // Retourne une nouvelle API avec les recettes filtrées
//   return results;
// }
