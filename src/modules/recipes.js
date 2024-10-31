import { api } from "../api/api.js";

// Déclaration des données en dehors de la fonction
const recipes = api.getAllRecipes();

//* Fonction de recherche en utilisant les boucles natives
//* --------------------------------------------------

export function searchRecipesWithLoops(keySearch) {
  // Réinitialise les résultats pour chaque nouvelle recherche
  let results = [];

  // Boucle sur chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matchFound = true; // Considère d'abord que la recette correspond

    // Parcourt chaque mot-clé de `keySearch`
    for (let j = 0; j < keySearch.length; j++) {
      const keyword = keySearch[j].toLowerCase();

      // Vérifie si le mot-clé est dans le nom, la description ou les ingrédients
      const inName = recipe.name.toLowerCase().includes(keyword);
      const inDescription = recipe.description.toLowerCase().includes(keyword);
      const inIngredients = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(keyword)
      );

      // Si le mot-clé n'est trouvé nulle part, la recette ne correspond pas
      if (!inName && !inDescription && !inIngredients) {
        matchFound = false;
        break; // Arrête la vérification si un mot-clé manque
      }
    }

    // Si tous les mots-clés sont présents, ajoute la recette entière aux résultats
    if (matchFound) {
      results.push(recipe);
    }
  }

  // Retourne une nouvelle API avec les recettes filtrées
  return {
    getAllRecipes: () => results,
  };
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
//   return {
//     getAllRecipes: () => results,
//   };
// }
