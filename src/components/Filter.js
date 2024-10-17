// Filters Section
export function Filter() {
  const filtersSection = document.createElement("div");
  filtersSection.classList.add("filters");

  const ingredientsFilter = createDropdown("Ingrédients");
  const devicesFilter = createDropdown("Appareils");
  const utensilsFilter = createDropdown("Ustensiles");
  const tag = createTag("Crème de coco");

  filtersSection.append(ingredientsFilter, devicesFilter, utensilsFilter, tag);

  return filtersSection;
}

function createDropdown(label) {
  const wrapper = document.createElement("div");
  const dropdown = document.createElement("select");
  const option = document.createElement("option");
  option.textContent = label;
  dropdown.appendChild(option);
  wrapper.appendChild(dropdown);
  return wrapper;
}

function createTag(text) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = text;
  return tag;
}
