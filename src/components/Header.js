// Header section
export function Header() {
  const header = document.createElement("header");
  header.id = "header-section"; // Ajout de l'id

  const imgHeader = document.createElement("img");
  imgHeader.src = "assets/templates/header.png";
  imgHeader.alt = "image d'un plat";
  imgHeader.classList.add("imgHeader");
  imgHeader.id = "img-header"; // Ajout de l'id
  header.appendChild(imgHeader);

  const logo = document.createElement("img");
  logo.src = "assets/templates/logo.png";
  logo.alt = "homepage logo";
  logo.classList.add("logo");
  logo.id = "logo"; // Ajout de l'id
  header.appendChild(logo);

  return header;
}
