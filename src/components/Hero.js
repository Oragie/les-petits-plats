import { filterCommonRecipes, getOriginalRecipes } from "../modules/recipes.js";
import { updateRecipes } from "../components/Recipes.js";

export function Hero() {
  const heroSection = document.createElement("section");
  heroSection.classList.add("hero");
  heroSection.id = "hero";

  const heroText = document.createElement("h2");
  heroText.textContent =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  searchContainer.id = "search-container";

  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute(
    "placeholder",
    "Rechercher une recette, un ingrédient, ..."
  );
  searchBar.classList.add("search-bar");
  searchBar.id = "search-bar";

  // Bouton pour vider le champ de recherche
  const clearButton = document.createElement("button");
  clearButton.classList.add("clear-button");
  clearButton.id = "clear-button";
  clearButton.textContent = "✕"; // Icône de croix (✕)

  // Ajoute un écouteur pour vider le champ de recherche et réinitialiser l'affichage
  clearButton.addEventListener("click", () => {
    clearSearch(); // Appelle la fonction de réinitialisation complète
  });

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-button");
  searchButton.id = "search-button";

  const searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/icons/loupe_noire.svg";
  searchIcon.alt = "Search Icon";
  searchButton.appendChild(searchIcon);

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.id = "error-message";
  errorMessage.style.display = "none"; // Caché par défaut

  // Ajout des éléments à la section `hero`
  heroSection.appendChild(heroText);
  heroSection.appendChild(searchContainer);
  searchContainer.appendChild(searchBar);
  searchContainer.appendChild(clearButton);
  searchContainer.appendChild(errorMessage);
  searchContainer.appendChild(searchButton);

  // Event listener pour la recherche en temps réel
  function validateInput() {
    const inputText = searchBar.value.trim();
    const tagList = document.querySelector("#tag-list");
    const tags = Array.from(tagList.querySelectorAll(".tag")).map(
      (tag) => tag.firstChild.textContent
    );

    // Vérifie que l'input est valide (minimum 3 caractères)
    if (inputText.length >= 3 || tags.length > 0) {
      // Crée `inputSearchBar` en normalisant les mots de l'input
      const inputSearchBar = inputText
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .filter((word) => word.length >= 3);

      // Cache le message d'erreur
      errorMessage.style.display = "none";
      searchBar.classList.remove("error-border");

      // Filtre les recettes avec `inputSearchBar` et `tags` via `filterCommonRecipes`
      const filteredRecipes = filterCommonRecipes(inputSearchBar, tags);
      updateRecipes(filteredRecipes); // Met à jour l'affichage

      // Si aucune recette n'est trouvée, affiche un message
      if (filteredRecipes.length === 0) {
        errorMessage.style.display = "block";
        errorMessage.textContent = `Aucune recette ne contient ‘${inputText}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
      }
    } else {
      // Affiche un message d'erreur si moins de 3 caractères sans tags
      errorMessage.textContent = "Veuillez entrer au moins 3 caractères.";
      errorMessage.style.display = "block";
      searchBar.classList.add("error-border");
      const originalRecipes = getOriginalRecipes();
      updateRecipes(originalRecipes); // Réinitialise les recettes si pas de filtres valides
    }
  }

  // Fonction pour réinitialiser complètement la saisie
  function clearSearch() {
    searchBar.value = ""; // Vide le champ de recherche
    searchBar.classList.remove("error-border"); // Retire la bordure d'erreur
    errorMessage.style.display = "none"; // Cache le message d'erreur
    searchBar.focus(); // Remet le focus sur l'input
    const originalRecipes = getOriginalRecipes();
    updateRecipes(originalRecipes); // Réinitialise les recettes si pas de filtres valides
  }

  searchBar.addEventListener("input", validateInput);
  searchButton.addEventListener("click", validateInput);

  return heroSection;
}
