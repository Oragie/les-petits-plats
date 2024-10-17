// Hero section

export function Hero() {
  const heroSection = document.createElement("section");
  heroSection.classList.add("hero");

  const textContainer = document.createElement("div");
  textContainer.classList.add("hero-text");

  const heroText = document.createElement("h2");
  heroText.textContent =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute(
    "placeholder",
    "Rechercher une recette, un ingrédient, ..."
  );

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-button");
  const searchIcon = document.createElement("img");
  searchIcon.src = ""; // Icone de recherche

  heroSection.appendChild(textContainer);
  textContainer.appendChild(heroText);
  heroSection.appendChild(searchContainer);
  searchContainer.appendChild(searchBar);
  searchContainer.appendChild(searchButton);
  searchButton.appendChild(searchIcon);

  return heroSection;
}
