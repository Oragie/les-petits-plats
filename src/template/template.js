import { Header } from "../components/Header.js";
import { Hero } from "../components/Hero.js";
import { Filter } from "../components/Filter.js";
import { Recipes } from "../components/Recipes.js";

export function templateFactory() {
  const app = document.getElementById("app");

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

  return app;
}
