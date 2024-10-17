// Recipes section
export function Recipes() {
  const recipesSection = document.createElement("section");
  recipesSection.classList.add("recipes");

  //temporaire pour tester :
  const recipeData = [
    {
      title: "Limonade de coco",
      time: "10min",
      ingredients: [
        "Lait de coco",
        "Crème de coco",
        "Jus de citron",
        "Sucre",
        "Glacons",
      ],
      recipe: "Mettre les glaçons à votre goût dans le blender...",
    },
    {
      title: "Poisson cru à la tahitienne",
      time: "60min",
      ingredients: [
        "Thon Rouge",
        "Citron vert",
        "Lait de coco",
        "Concombre",
        "Tomate",
        "Carotte",
      ],
      recipe: "Découper le thon en dés, mettre dans un plat...",
    },
    {
      title: "Poulet coco réunionnais",
      time: "80min",
      ingredients: [
        "Poulet",
        "Lait de coco",
        "Coulis de tomate",
        "Oignon",
        "Poivron rouge",
        "Huile d'olive",
      ],
      recipe: "Découper le poulet en morceaux, les faire dorer...",
    },
  ];

  recipeData.forEach((data) => {
    const recipeCard = createRecipeCard(
      data.title,
      data.time,
      data.ingredients,
      data.recipe
    );
    recipesSection.appendChild(recipeCard);
  });

  return recipesSection;
}

function createRecipeCard(title, time, ingredients, recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;

  const cardTime = document.createElement("span");
  cardTime.textContent = time;
  cardTime.classList.add("recipe-time");

  const ingredientList = document.createElement("ul");
  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientList.appendChild(li);
  });

  const recipeDesc = document.createElement("p");
  recipeDesc.textContent = recipe;

  card.append(cardTitle, cardTime, ingredientList, recipeDesc);
  return card;
}
