import { addLabel } from "./LabelSearch.js";
import { filterList, filterRecipesByInput } from "../modules/recipes.js"; // Importe la logique de filtrage
import { updateRecipes } from "../components/Recipes.js";

export function Filter(recipes, setRecipes) {
  const filtersSection = document.createElement("div");
  filtersSection.classList.add("filters");

  const recipeControls = document.createElement("section");
  recipeControls.classList.add("recipes-controls");

  const filtersBox = document.createElement("div");
  filtersBox.classList.add("filters-box");

  const ingredientsFilter = Dropdown(
    "Ingrédients",
    getUniqueTags("ingredients", recipes)
  );
  const appliancesFilter = Dropdown(
    "Appareils",
    getUniqueTags("appliances", recipes)
  );
  const utensilsFilter = Dropdown(
    "Ustensiles",
    getUniqueTags("ustensils", recipes)
  );

  // Crée un élément pour afficher le nombre de recettes
  const recipeCount = document.createElement("span");
  recipeCount.classList.add("recipe-count");
  recipeCount.textContent = `${recipes.length} recettes`; // Initialiser le compteur

  const tagList = document.createElement("div");
  tagList.classList.add("tag-list");

  filtersSection.append(recipeControls, tagList);
  recipeControls.append(filtersBox, recipeCount);
  filtersBox.append(ingredientsFilter, appliancesFilter, utensilsFilter);

  // Fonction pour mettre à jour le compteur de recettes directement dans le DOM
  function updateRecipeCount(filteredRecipes) {
    recipeCount.textContent = `${filteredRecipes.length} recettes`; // Met à jour le compteur
  }

  // Utilisez `updateRecipeCount` chaque fois que les recettes sont filtrées
  function applyFilters(keySearch) {
    const filteredRecipes = filterRecipesByInput(keySearch, setRecipes);
    updateRecipes(filteredRecipes);
    updateRecipeCount(filteredRecipes);
  }

  function resetFilters() {
    // Code pour effacer tous les filtres...
    updateRecipes(setRecipes); // Réinitialise l'affichage avec `setRecipes`
    updateRecipeCount(setRecipes); // Met à jour le compteur avec le total
  }

  return filtersSection;
}

function Dropdown(label, options) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("dropdown");

  const dropdownLabel = document.createElement("span");
  dropdownLabel.textContent = label;
  dropdownLabel.classList.add("dropdown-label");
  wrapper.appendChild(dropdownLabel);

  // Conteneur de la liste déroulante
  const list = document.createElement("ul");
  list.classList.add("dropdown-list");

  // Crée l'input de recherche, caché par défaut
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("dropdown-input-container");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add("dropdown-input");
  inputField.style.display = "none"; // Masqué par défaut
  inputContainer.appendChild(inputField);
  list.appendChild(inputContainer);

  // Crée un bouton de nettoyage pour l'input de recherche
  const clearSearchButton = document.createElement("button");
  clearSearchButton.classList.add("clear-button");
  clearSearchButton.textContent = "✕"; // Bouton pour vider la recherche

  // Masquer le bouton de nettoyage tant que le menu n'est pas ouvert
  clearSearchButton.style.display = "none";
  inputField.parentNode.insertBefore(clearSearchButton, inputField.nextSibling);

  const triggerSearchButton = document.createElement("button");
  triggerSearchButton.classList.add("trigger-search-button");

  const triggerSearchIcon = document.createElement("img");
  triggerSearchIcon.src = "../../assets/icons/loupe_mini.svg";
  triggerSearchIcon.alt = "Search Icon";
  triggerSearchButton.appendChild(triggerSearchIcon);

  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      addTag(option); // Appel à la fonction pour ajouter un tag
      closeDropdown(); // Ferme le dropdown après sélection
    });
    list.appendChild(li);
  });

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(clearSearchButton);
  inputContainer.appendChild(triggerSearchButton);
  wrapper.appendChild(list);

  // Fonction pour ouvrir/fermer le dropdown
  function toggleDropdown() {
    const isVisible = list.style.display === "block";
    list.style.display = isVisible ? "none" : "block";
    inputField.style.display = isVisible ? "none" : "block"; // Affiche ou masque l'input de recherche
    clearSearchButton.style.display = isVisible ? "none" : "inline"; // Affiche ou masque le bouton de nettoyage
    inputField.focus(); // Ajouter ou retirer la classe active pour la flèche et le radius
    if (isVisible) {
      wrapper.classList.remove("active");
    } else {
      wrapper.classList.add("active");
    }

    inputField.focus();
  }

  function closeDropdown() {
    list.style.display = "none";
    inputField.style.display = "none";
    clearSearchButton.style.display = "none";
    wrapper.classList.remove("active"); // Retire la classe active lors de la fermeture
    inputField.value = "";
  }

  wrapper.addEventListener("click", toggleDropdown); // Rend tout le dropdown cliquable

  inputField.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterList(list, searchTerm); // Utilise le filtre importé
  });

  clearSearchButton.addEventListener("click", () => {
    inputField.value = "";
    filterList(list, "");
    inputField.focus();
  });

  return wrapper;
}

// Fonction pour ajouter un tag dans tagList
function addTag(tagText) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = tagText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-tag");
  removeButton.addEventListener("click", () => {
    tag.remove(); // Supprime le tag du DOM
  });

  tag.appendChild(removeButton);
  document.querySelector(".tag-list").appendChild(tag); // Ajoute le tag dans tagList
}

function getUniqueTags(type, recipes) {
  const tags = new Set();
  recipes.forEach((recipe) => {
    switch (type) {
      case "ingredients":
        recipe.ingredients.forEach((ingredient) => {
          tags.add(ingredient.ingredient);
        });
        break;
      case "appliances":
        tags.add(recipe.appliance);
        break;
      case "ustensils":
        recipe.ustensils.forEach((ustensil) => {
          tags.add(ustensil);
        });
        break;
    }
  });
  return Array.from(tags);
}
