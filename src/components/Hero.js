export function Hero() {
  const heroSection = document.createElement("section");
  heroSection.classList.add("hero");

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
  searchBar.classList.add("search-bar");

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-button");

  // Ajout de l'icône de recherche ici
  const searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/icons/loupe_noire.svg"; // Chemin vers l'icône de recherche
  searchIcon.alt = "Search Icon";
  searchButton.appendChild(searchIcon);

  // Ajout des éléments à la section `hero`
  heroSection.appendChild(heroText);
  heroSection.appendChild(searchContainer);
  searchContainer.appendChild(searchBar);
  searchContainer.appendChild(searchButton);

  return heroSection;
}
