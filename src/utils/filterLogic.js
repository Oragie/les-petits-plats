// // programmation fonctionnelle
export function filterList(list, searchTerm) {
  // Normalise le terme de recherche pour ignorer les accents
  const normalizedSearchTerm = searchTerm
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    // Normalise le texte de l'élément pour ignorer les accents
    const itemText = item.textContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    // Vérifie si le texte de l'élément contient le terme de recherche sans accents
    if (itemText.includes(normalizedSearchTerm)) {
      item.style.display = ""; // Affiche l'élément s'il correspond au terme de recherche
    } else {
      item.style.display = "none"; // Cache l'élément s'il ne correspond pas
    }
  });
}

// boucle native
// export function filterList(list, searchTerm) {
//   // Normalise le terme de recherche pour ignorer les accents
//   const normalizedSearchTerm = searchTerm
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase();

//   const items = list.querySelectorAll("li");
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     // Normalise le texte de l'élément pour ignorer les accents
//     const itemText = item.textContent
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .toLowerCase();

//     // Vérifie si le texte de l'élément contient le terme de recherche sans accents
//     if (itemText.includes(normalizedSearchTerm)) {
//       item.style.display = ""; // Affiche l'élément s'il correspond au terme de recherche
//     } else {
//       item.style.display = "none"; // Cache l'élément s'il ne correspond pas
//     }
//   }
// }
