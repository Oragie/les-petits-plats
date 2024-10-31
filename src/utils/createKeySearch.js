export function createKeySearch(inputText) {
  // Vérifie si la saisie est valide
  if (inputText.length < 3 || /[^a-zA-Z0-9\s-]/.test(inputText)) {
    return null; // Retourne `null` si la saisie est invalide
  } else {
    // Crée le tableau `keySearch` à partir de l'input, en filtrant les mots de moins de 3 lettres
    const keySearch = inputText.split(" ").filter((word) => word.length >= 3); // Ne garde que les mots de 3 lettres ou plus

    return keySearch;
  }
}
