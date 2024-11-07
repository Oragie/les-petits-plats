import {
  filterList,
  filterRecipesByInput,
  createKeySearch,
} from "../modules/recipes.js";
import { updateRecipes } from "../components/Recipes.js";

export function Filter(recipes, setRecipes) {
  const filtersSection = document.createElement("div");
  filtersSection.classList.add("filters");

  const recipeControls = document.createElement("section");
  recipeControls.classList.add("recipes-controls");

  const filtersBox = document.createElement("div");
  filtersBox.classList.add("filters-box");

  // Passer `addTag` en tant que paramètre
  const ingredientsFilter = Dropdown(
    "Ingrédients",
    getUniqueTags("ingredients", recipes),
    addTag
  );
  const appliancesFilter = Dropdown(
    "Appareils",
    getUniqueTags("appliances", recipes),
    addTag
  );
  const utensilsFilter = Dropdown(
    "Ustensiles",
    getUniqueTags("ustensils", recipes),
    addTag
  );

  const recipeCount = document.createElement("span");
  recipeCount.classList.add("recipe-count");
  recipeCount.textContent = `${recipes.length} recettes`;

  const tagList = document.createElement("div");
  tagList.classList.add("tag-list");
  tagList.id = "tag-list";

  filtersSection.append(recipeControls, tagList);
  recipeControls.append(filtersBox, recipeCount);
  filtersBox.append(ingredientsFilter, appliancesFilter, utensilsFilter);

  function applyFilters(inputText = "") {
    const tags = Array.from(tagList.querySelectorAll(".tag")).map(
      (tag) => tag.firstChild.textContent
    );
    console.log("tags", tags);

    const keySearch = createKeySearch(inputText, tags);
    console.log("KeySearch:", keySearch);

    if (keySearch && keySearch.length > 0 && setRecipes) {
      const filteredRecipes = filterRecipesByInput(keySearch, setRecipes);
      updateRecipes(filteredRecipes); // Met à jour les recettes affichées
      updateRecipeCount(filteredRecipes); // Met à jour le compteur de recettes
    } else {
      updateRecipes(setRecipes); // Réinitialise l'affichage avec toutes les recettes
      updateRecipeCount(setRecipes); // Utilise `setRecipes` pour le compteur initial
    }
  }

  // Fonction pour mettre à jour le compteur de recettes
  function updateRecipeCount(filteredRecipes) {
    recipeCount.textContent = `${filteredRecipes.length} recettes`;
  }

  // Fonction pour ajouter un tag et appliquer les filtres
  function addTag(tagText) {
    if (
      !Array.from(tagList.children).some((tag) => tag.textContent === tagText)
    ) {
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.textContent = tagText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "x";
      removeButton.classList.add("remove-tag");
      removeButton.addEventListener("click", () => {
        tag.remove();
        applyFilters();
      });

      tag.appendChild(removeButton);
      tagList.appendChild(tag);
      applyFilters();
    }
  }

  return filtersSection;
}

// Fonction Dropdown avec `addTag` passé comme paramètre
function Dropdown(label, options, addTag) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("dropdown");

  const dropdownLabel = document.createElement("span");
  dropdownLabel.textContent = label;
  dropdownLabel.classList.add("dropdown-label");
  wrapper.appendChild(dropdownLabel);

  const list = document.createElement("ul");
  list.classList.add("dropdown-list");

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("dropdown-input-container");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add("dropdown-input");
  inputField.style.display = "none";
  inputContainer.appendChild(inputField);
  list.appendChild(inputContainer);

  const eraseSearchButton = document.createElement("button");
  eraseSearchButton.classList.add("reset-button");
  eraseSearchButton.textContent = "✕";
  eraseSearchButton.style.display = "none";
  inputField.parentNode.insertBefore(eraseSearchButton, inputField.nextSibling);

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
      addTag(option);
      closeDropdown(); // Ferme le dropdown après sélection
    });
    list.appendChild(li);
  });

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(eraseSearchButton);
  inputContainer.appendChild(triggerSearchButton);
  wrapper.appendChild(list);

  function toggleDropdown() {
    const isVisible = list.style.display === "block";
    list.style.display = isVisible ? "none" : "block";
    inputField.style.display = isVisible ? "none" : "block";
    eraseSearchButton.style.display = isVisible ? "none" : "inline";

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
    eraseSearchButton.style.display = "none";
    wrapper.classList.remove("active");
    inputField.value = ""; // Reset du champ input
  }

  wrapper.addEventListener("click", toggleDropdown);

  inputField.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterList(list, searchTerm);
  });

  eraseSearchButton.addEventListener("click", () => {
    inputField.value = "";
    filterList(list, "");
    inputField.focus();
  });

  return wrapper;
}

// Fonction pour extraire les tags uniques
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
