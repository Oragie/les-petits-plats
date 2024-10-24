// Tableau dynamique pour stocker les éléments sélectionnés
let selectedLabels = [];

/**
 * Ajoute un élément au tableau des labels sélectionnés
 * @param {string} label - Le label à ajouter (nom de l'ingrédient, appareil ou ustensile)
 * @param {string} type - Le type de label (ingredient, appliance, utensil)
 */
export function addLabel(label, type) {
  const labelObject = { label, type };

  // Vérifie si le label n'existe pas déjà
  const labelExists = selectedLabels.some(
    (item) => item.label === label && item.type === type
  );

  if (!labelExists) {
    selectedLabels.push(labelObject);
    renderLabels();
  }
}

/**
 * Supprime un élément du tableau des labels sélectionnés
 * @param {string} label - Le label à supprimer
 * @param {string} type - Le type de label
 */
export function removeLabel(label, type) {
  selectedLabels = selectedLabels.filter(
    (item) => !(item.label === label && item.type === type)
  );
  renderLabels();
}

/**
 * Fonction pour afficher les labels sélectionnés sous les dropdowns
 */
function renderLabels() {
  const labelContainer = document.querySelector(".selected-tags");
  labelContainer.innerHTML = ""; // Efface le contenu actuel avant de le régénérer

  selectedLabels.forEach((item) => {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.textContent = `${item.label} (${item.type})`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", () => {
      removeLabel(item.label, item.type); // Supprime le label lorsqu'on clique sur le bouton
    });

    tag.appendChild(removeBtn);
    labelContainer.appendChild(tag);
  });
}

/**
 * Fonction pour récupérer tous les labels sélectionnés
 * @returns {Array} selectedLabels - Le tableau contenant les labels sélectionnés
 */
export function getSelectedLabels() {
  return selectedLabels;
}
