import { Header } from "../components/Header.js";
import { Hero } from "../components/Hero.js";
import { Filter } from "../components/Filter.js";
import { Recipes } from "../components/Recipes.js";
import { api } from "../api/api.js";
import { setOriginalRecipes } from "../modules/recipes.js";

export function templateFactory() {
  function initApp() {
    const app = document.getElementById("app");
    const recipes = api.getAllRecipes(); // Appel unique à l'API
    // Crée une constante pour stocker la liste complète des recettes au démarrage
    setOriginalRecipes(recipes);

    // Header section
    const header = Header();
    app.appendChild(header);

    // Hero section
    const heroSection = Hero();
    header.appendChild(heroSection);

    // Filters Section
    const filtersSection = Filter();
    app.appendChild(filtersSection);

    // Recipes section
    const recipesSection = Recipes();
    app.appendChild(recipesSection);
  }
  return { initApp };
}
