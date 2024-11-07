import { Header } from "../components/Header.js";
import { Hero } from "../components/Hero.js";
import { Filter } from "../components/Filter.js";
import { Recipes } from "../components/Recipes.js";
import { api } from "../api/api.js";

export function templateFactory() {
  function initApp() {
    const app = document.getElementById("app");
    const recipes = api.getAllRecipes(); // Appel unique à l'API
    // Crée une constante pour stocker la liste complète des recettes au démarrage
    const setRecipes = [...recipes]; // Copie de toutes les recettes sans filtre

    // Header section
    const header = Header();
    app.appendChild(header);

    // Hero section
    const heroSection = Hero(recipes, setRecipes);
    header.appendChild(heroSection);

    // Filters Section
    const filtersSection = Filter(recipes, setRecipes);
    app.appendChild(filtersSection);

    // Recipes section
    const recipesSection = Recipes(recipes);
    app.appendChild(recipesSection);
  }
  return { initApp };
}
