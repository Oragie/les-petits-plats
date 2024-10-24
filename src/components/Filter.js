import { api } from "../api/api.js";
import { addLabel } from "./LabelSearch.js";

// Filters Section
export function Filter() {
  const filtersSection = document.createElement("div");
  filtersSection.classList.add("filters");

  const recipes = api.getAllRecipes();

  // Create Dropdowns
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

  const selectedTags = document.createElement("div");
  selectedTags.classList.add("selected-tags");

  filtersSection.append(
    ingredientsFilter,
    appliancesFilter,
    utensilsFilter,
    selectedTags
  );

  // Add Recipe Count
  const recipeCount = document.createElement("span");
  recipeCount.classList.add("recipe-count");
  recipeCount.textContent = `${api.getAllRecipes().length} recettes`;
  filtersSection.appendChild(recipeCount);

  return filtersSection;
}

function Dropdown(label, options) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("dropdown");

  const dropdownLabel = document.createElement("span");
  dropdownLabel.textContent = label;
  dropdownLabel.classList.add("dropdown-label"); // Ajoutez une classe pour le style
  wrapper.appendChild(dropdownLabel);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Rechercher ${label.toLowerCase()}`;
  input.classList.add("dropdown-input"); // Ajoutez une classe pour styliser le champ de recherche
  input.style.display = "none"; // Cachez le champ de recherche initialement
  wrapper.appendChild(input);

  const list = document.createElement("ul");
  list.classList.add("dropdown-list");
  list.style.display = "none"; // Cachez la liste initialement

  // Populate dropdown options
  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      selectOption(label, option);
      // Fermer le dropdown après sélection
      list.style.display = "none";
      input.style.display = "none";
    });
    list.appendChild(li);
  });

  wrapper.appendChild(list);

  // Toggle dropdown when clicking the label
  dropdownLabel.addEventListener("click", () => {
    const isVisible = list.style.display === "block";
    list.style.display = isVisible ? "none" : "block";
    input.style.display = isVisible ? "none" : "block"; // Affiche ou cache le champ de recherche
    input.focus(); // Mets le focus sur l'input lors de l'ouverture
  });

  // Handle search/filtering
  input.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterList(list, searchTerm);
  });

  return wrapper;
}

function Tag(text) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => tag.remove());

  tag.appendChild(removeBtn);
  return tag;
}

// Exemples de modification de la fonction selectOption pour appeler addLabel
function selectOption(type, option) {
  addLabel(option, type);

  const tag = Tag(option);
  const selectedTags = document.querySelector(".selected-tags");
  selectedTags.appendChild(tag);
}

function filterList(list, searchTerm) {
  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchTerm)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Utility functions to get unique ingredients, appliances, and utensils

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
        recipes.forEach((recipe) => {
          tags.add(recipe.appliance);
        });
        break;

      case "ustensils":
        recipe.ustensils.forEach((ustensil) => {
          tags.add(ustensil);
        });
        break;

      default:
        throw new Error("please provide type");
    }
  });
  return Array.from(tags);
}
