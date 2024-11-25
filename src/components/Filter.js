import { filterCommonRecipes, getOriginalRecipes } from "../modules/recipes.js";
import { updateRecipes } from "../components/Recipes.js";

export function Filter() {
  const filtersSection = document.createElement("div");
  filtersSection.classList.add("filters");
  filtersSection.id = "filters-section";

  const recipeControls = document.createElement("section");
  recipeControls.classList.add("recipes-controls");
  recipeControls.id = "recipe-controls";

  const filtersBox = document.createElement("div");
  filtersBox.classList.add("filters-box");
  filtersBox.id = "filters-box";

  // Paramètres des dropdowns
  const ingredientsFilter = Dropdown(
    "Ingrédients",
    getUniqueTags("ingredients"),
    addTag
  );
  ingredientsFilter.classList.add("dropdown");
  ingredientsFilter.id = "dropdown-ingredients";

  const appliancesFilter = Dropdown(
    "Appareils",
    getUniqueTags("appliances"),
    addTag
  );
  appliancesFilter.classList.add("dropdown");
  appliancesFilter.id = "dropdown-appliances";

  const utensilsFilter = Dropdown(
    "Ustensiles",
    getUniqueTags("ustensils"),
    addTag
  );
  utensilsFilter.classList.add("dropdown");
  utensilsFilter.id = "dropdown-utensils";

  const recipesCount = document.createElement("span");
  recipesCount.classList.add("recipes-count");
  recipesCount.id = "recipes-count";
  recipesCount.textContent = `50 Recettes`;

  const tagList = document.createElement("div");
  tagList.classList.add("tag-list");
  tagList.id = "tag-list";

  filtersSection.append(recipeControls, tagList);
  recipeControls.append(filtersBox, recipesCount);
  filtersBox.append(ingredientsFilter, appliancesFilter, utensilsFilter);

  //* recuperation des tags */
  //** ============================================== */

  function validateTags() {
    // Récupère tous les tags sélectionnés dans le tableau `tags`
    const tags = Array.from(tagList.querySelectorAll("#tag")).map(
      (tag) => tag.firstChild.textContent
    );
    const inputSearchBar = document.querySelector("#search-bar");

    // Filtre les recettes avec `inputSearchBar` et `tags` via `filterCommonRecipes`
    const filteredRecipes = filterCommonRecipes(inputSearchBar, tags);

    updateRecipes(filteredRecipes); // Met à jour l'affichage
  }

  //* Fonction pour ajouter un tag et appliquer `validateTags`
  function addTag(tagText, dropdownId) {
    if (
      !Array.from(tagList.children).some((tag) => tag.textContent === tagText)
    ) {
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.id = "tag";
      tag.textContent = tagText;

      // Crée un nouvel élément "item-selected"
      const itemSelected = document.createElement("div");
      itemSelected.classList.add("item-selected");
      itemSelected.id = "item-selected";
      itemSelected.textContent = tagText;

      // Ajoute cet élément à #dropdown-input-container
      const dropdown = document.querySelector(`#${dropdownId}`);
      const activeDdownContainer = dropdown.querySelector(
        "#active-Dropdown-contener"
      );
      activeDdownContainer.appendChild(itemSelected);
      itemSelected.addEventListener("click", () => {
        tag.remove();
        itemSelected.remove();
        validateTags();
      });
      const removeButton = document.createElement("button");
      removeButton.textContent = "x";
      removeButton.classList.add("remove-tag");
      removeButton.id = "remove-tag";
      removeButton.addEventListener("click", () => {
        tag.remove();
        itemSelected.remove();
        validateTags(); // Ré-applique le filtre après suppression du tag
      });

      tag.appendChild(removeButton);
      tagList.appendChild(tag);
      validateTags(); // Applique le filtre avec le nouveau tag
    }
  }

  return filtersSection;
}

// Fonction Dropdown avec addTag passé comme paramètre
function Dropdown(label, options, addTag) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("dropdown");
  wrapper.id = "dropdown";

  const dropdownClosed = document.createElement("div");
  dropdownClosed.classList.add("dropdown-closed");
  dropdownClosed.id = "dropdown-closed";

  const dropdownLabel = document.createElement("span");
  dropdownLabel.textContent = label;
  dropdownLabel.classList.add("dropdown-label");
  dropdownLabel.id = "dropdown-label";

  const activeDdownContainer = document.createElement("div");
  activeDdownContainer.classList.add("active-Dropdown-contener");
  activeDdownContainer.id = "active-Dropdown-contener";

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("dropdown-input-container");
  inputContainer.id = "dropdown-input-container";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add("dropdown-input");
  inputField.id = "dropdown-input";
  inputField.style.display = "none";

  const eraseSearchButton = document.createElement("button");
  eraseSearchButton.classList.add("reset-button");
  eraseSearchButton.id = "reset-button";
  eraseSearchButton.textContent = "✕";
  eraseSearchButton.style.display = "none";

  const triggerSearchButton = document.createElement("button");
  triggerSearchButton.classList.add("trigger-search-button");
  triggerSearchButton.id = "trigger-search-button";
  const triggerSearchIcon = document.createElement("img");
  triggerSearchIcon.src = "../../assets/icons/loupe_mini.svg";
  triggerSearchIcon.alt = "Search Icon";

  const list = document.createElement("ul");
  list.classList.add("dropdown-list");
  list.id = "dropdown-list";

  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.id = option;
    li.addEventListener("click", () => {
      addTag(option, wrapper.id);
      closeDropdown(option); // Ferme le dropdown après sélection
    });
    list.appendChild(li);
  });

  wrapper.appendChild(dropdownClosed);
  dropdownClosed.appendChild(dropdownLabel);
  wrapper.appendChild(activeDdownContainer);
  activeDdownContainer.appendChild(inputContainer);
  inputContainer.appendChild(inputField);
  inputContainer.appendChild(eraseSearchButton);
  inputContainer.appendChild(triggerSearchButton);
  triggerSearchButton.appendChild(triggerSearchIcon);
  wrapper.appendChild(list);

  function toggleDropdown() {
    const isVisible = list.style.display === "block";
    list.style.display = isVisible ? "none" : "block";
    activeDdownContainer.style.display = isVisible ? "none" : "block";
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
    toggleDropdown();
  });

  return wrapper;
}

// Fonction pour extraire les tags uniques
function getUniqueTags(type) {
  const tags = new Set();
  const recipes = getOriginalRecipes();
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

// Fonction pour filtrer les éléments de liste en temps réel
export function filterList(list, searchTerm) {
  const items = list.querySelectorAll("li"); // Sélectionne tous les éléments <li> dans la liste

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemText = item.textContent.toLowerCase(); // Texte de l'élément en minuscules
    if (itemText.includes(searchTerm.toLowerCase())) {
      item.style.display = ""; // Affiche l'élément s'il correspond au terme de recherche
    } else {
      item.style.display = "none"; // Cache l'élément s'il ne correspond pas
    }
  }
}
