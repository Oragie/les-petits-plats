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

  const tagBox = document.createElement("section");
  tagBox.classList.add("tag-box");

  const selectedTags = document.createElement("section");
  selectedTags.classList.add("selected-tags");

  filtersSection.append(recipeControls, tagBox);
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

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("dropdown-input-container");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Rechercher ${label.toLowerCase()}`;
  input.classList.add("dropdown-input");

  const clearButton = document.createElement("button");
  clearButton.classList.add("clear-button");
  clearButton.textContent = "✕"; // Bouton pour vider la recherche

  inputContainer.appendChild(input);
  inputContainer.appendChild(clearButton);
  wrapper.appendChild(inputContainer);

  const list = document.createElement("ul");
  list.classList.add("dropdown-list");

  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      selectOption(label, option);
      closeDropdown(); // Ferme le dropdown après sélection
    });
    list.appendChild(li);
  });

  wrapper.appendChild(list);

  function toggleDropdown() {
    const isVisible = list.style.display === "block";
    list.style.display = isVisible ? "none" : "block";
    input.style.display = isVisible ? "none" : "block";
    input.focus();
  }

  function closeDropdown() {
    list.style.display = "none";
    input.style.display = "none";
    input.value = ""; // Réinitialise l'input
  }

  wrapper.addEventListener("click", toggleDropdown); // Rend tout le dropdown cliquable

  input.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterList(list, searchTerm); // Utilise le filtre importé
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    filterList(list, "");
    input.focus();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
    if (e.key === "Enter") {
      const firstVisibleItem = list.querySelector(
        "li:not([style*='display: none'])"
      );
      if (firstVisibleItem) {
        selectOption(label, firstVisibleItem.textContent);
        closeDropdown();
      }
    }
  });

  return wrapper;
}

// Fonction pour créer un élément de tag
function Tag(text) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.classList.add("remove-tag");
  removeBtn.addEventListener("click", () => {
    tag.remove(); // Supprime le tag du DOM
  });

  tag.appendChild(removeBtn);
  return tag;
}

function selectOption(type, option) {
  addLabel(option, type);
  const tag = Tag(option);
  const selectedTags = document.querySelector(".selected-tags");
  selectedTags.appendChild(tag);
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
