import { recipes } from "../../data/recipes.js";

export const api = {
  getAllRecipes: (normalized = false) => {
    if (!normalized) {
      return recipes;
    }
    // normalized les recipes et les return
  },
};
