import { createKeySearch } from "../utils/createKeySearch.js";
import { filterRecipesByInput } from "../modules/recipes.js";
import { updateRecipes } from "../components/Recipes.js";

export function Hero(recipes, setRecipes) {
  const heroSection = document.createElement("section");
  heroSection.classList.add("hero");

  const heroText = document.createElement("h2");
  heroText.textContent =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute(
    "placeholder",
    "Rechercher une recette, un ingrédient, ..."
  );
  searchBar.classList.add("search-bar");

  // Bouton pour vider le champ de recherche
  const clearButton = document.createElement("button");
  clearButton.classList.add("clear-button");
  clearButton.textContent = "✕"; // Icône de croix (✕)

  // Ajoute un écouteur pour vider le champ de recherche et réinitialiser l'affichage
  clearButton.addEventListener("click", () => {
    clearSearch(); // Appelle la fonction de réinitialisation complète
  });

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-button");

  const searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/icons/loupe_noire.svg";
  searchIcon.alt = "Search Icon";
  searchButton.appendChild(searchIcon);

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.style.display = "none"; // Caché par défaut

  // Ajout des éléments à la section `hero`
  heroSection.appendChild(heroText);
  heroSection.appendChild(searchContainer);
  searchContainer.appendChild(searchBar);
  searchContainer.appendChild(clearButton);
  searchContainer.appendChild(errorMessage);
  searchContainer.appendChild(searchButton);

  // Event listener pour le bouton de recherche
  function validateInput() {
    const inputText = searchBar.value.trim();
    if (inputText.length >= 3) {
      const keySearch = createKeySearch(inputText); // Appel de la fonction dans utils
      if (keySearch) {
        console.log("Tableau keySearch :", keySearch); // Affiche `keySearch` si valide
        errorMessage.style.display = "none"; // Cache le message d'erreur
        searchBar.classList.remove("error-border"); // Retire la bordure rouge si pas d'erreur
        const filteredRecipes = filterRecipesByInput(keySearch, setRecipes); // Récupère les recettes filtrées
        updateRecipes(filteredRecipes); // Met à jour l'affichage des recettes avec les nouvelles recettes
      }
    } else {
      errorMessage.textContent = "Veuillez entrer au moins 3 caractères.";
      errorMessage.style.display = "block";
      searchBar.classList.add("error-border"); // Ajoute la bordure rouge en cas d'erreur
    }
  }

  // Fonction pour réinitialiser complètement la saisie
  function clearSearch() {
    searchBar.value = ""; // Vide le champ de recherche
    searchBar.classList.remove("error-border"); // Retire la bordure d'erreur
    errorMessage.style.display = "none"; // Cache le message d'erreur
    searchBar.focus(); // Remet le focus sur l'input
    updateRecipes(recipes); // Réinitialise l'affichage des recettes avec l'API complète
  }

  searchBar.addEventListener("input", validateInput);
  searchButton.addEventListener("click", validateInput);

  return heroSection;
}
