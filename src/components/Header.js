// Header section
export function Header() {
  const header = document.createElement("header");

  const imgHeader = document.createElement("img");
  imgHeader.src = "assets/templates/header.png";
  imgHeader.alt = "image d'un plat";
  imgHeader.classList.add("imgHeader");
  header.appendChild(imgHeader);

  const logo = document.createElement("img");
  logo.src = "assets/templates/logo.png";
  logo.alt = "homepage logo";
  logo.classList.add("logo");
  header.appendChild(logo);

  return header;
}
