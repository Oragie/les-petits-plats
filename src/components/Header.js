// Header section
export function Header() {
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Les Petits Plats";
  header.appendChild(title);

  return header;
}
