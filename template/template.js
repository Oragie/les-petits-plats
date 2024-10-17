import { Header } from "../src/components/Header.js";
import { Hero } from "../src/components/Hero.js";
import { Filter } from "../src/components/Filter.js";
import { Recipes } from "../src/components/Recipes.js";

export function templateFactory() {
  const app = document.getElementById("app");

  // Header section
  const header = Header();
  app.appendChild(header);

  // Hero section
  const heroSection = Hero();
  app.appendChild(heroSection);

  // Filters Section
  const filtersSection = Filter();
  app.appendChild(filtersSection);

  // Recipes section
  const recipesSection = Recipes();
  app.appendChild(recipesSection);

  return app;
}
