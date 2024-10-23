import { recipes } from "../../data/recipes.js";

export const api = {
  getAllRecipes: () => {
    return recipes;
  },
};
