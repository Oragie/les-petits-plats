// Hero section

export function Hero() {
  const heroSection = document.createElement("section");
  heroSection.classList.add("hero");
  const heroText = document.createElement("h2");
  heroText.textContent =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES";
  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute(
    "placeholder",
    "Rechercher une recette, un ingrédient, ..."
  );
  const searchButton = document.createElement("button");
  searchButton.innerHTML = '<i class="fa fa-search"></i>'; // Icone de recherche

  heroSection.appendChild(heroText);
  heroSection.appendChild(searchBar);
  heroSection.appendChild(searchButton);

  return heroSection;
}
