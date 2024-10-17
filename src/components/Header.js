// Header section
export function Header() {
  const header = document.createElement("header");

  const imgHeader = document.createElement("img");
  (imgHeader.src = "assets/image/header.jpg"),
    (imgHeader.alt = "image d'un plat");
  header.appendChild(imgHeader);

  const title = document.createElement("h1");
  title.textContent = "Les Petits Plats";
  header.appendChild(title);

  return header;
}
