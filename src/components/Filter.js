import { filterCommonRecipes, getOriginalRecipes } from '../modules/recipes.js'
import { updateRecipes } from './Recipes.js'

// Export validateTags function at the top level
export function validateTags() {
  // Get current tags
  const tagList = document.querySelector('#tag-list')
  if (!tagList) return

  const currentTags = Array.from(tagList.querySelectorAll('#tag')).map(
    (tag) => tag.firstChild.textContent
  )
  const inputSearchBar = document.querySelector('#search-bar')
  if (!inputSearchBar) return

  const searchValue = inputSearchBar.value.trim()

  // Normalize search input if it exists
  const normalizedSearchInput =
    searchValue.length >= 3
      ? searchValue
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .split(' ')
          .filter((word) => word.length >= 3)
      : []

  // Filtre les recettes avec `inputSearchBar` et `tags` via `filterCommonRecipes`
  const filteredRecipes = filterCommonRecipes(normalizedSearchInput, currentTags)

  // Get or create the no results message element
  let noResultsMessage = document.querySelector('#no-results-message')
  if (!noResultsMessage) {
    noResultsMessage = document.createElement('p')
    noResultsMessage.id = 'no-results-message'
    noResultsMessage.classList.add('no-results-message')
    noResultsMessage.style.fontSize = '2rem'
    noResultsMessage.style.color = 'black'
    noResultsMessage.style.textAlign = 'center'
    noResultsMessage.style.margin = '2rem 0'
    noResultsMessage.style.fontWeight = 'bold'
    const recipesSection = document.querySelector('#recipes-section')
    recipesSection.parentNode.insertBefore(noResultsMessage, recipesSection)
  }

  // Show/hide no results message
  if (
    filteredRecipes.length === 0 &&
    (normalizedSearchInput.length > 0 || currentTags.length > 0)
  ) {
    let message = 'Aucune recette ne correspond '
    if (normalizedSearchInput.length > 0) {
      message += `à votre recherche "${searchValue}"`
      if (currentTags.length > 0) {
        message += ' et '
      }
    }
    if (currentTags.length > 0) {
      message += `au(x) filtre(s) : ${currentTags.join(', ')}`
    }
    noResultsMessage.textContent = message
    noResultsMessage.style.display = 'block'
  } else {
    noResultsMessage.style.display = 'none'
  }

  updateRecipes(filteredRecipes)

  // Update dropdowns with filtered options
  const ingredientsDropdown = document.querySelector('#dropdown-ingredients .dropdown-list')
  const appliancesDropdown = document.querySelector('#dropdown-appliances .dropdown-list')
  const utensilsDropdown = document.querySelector('#dropdown-utensils .dropdown-list')

  if (!ingredientsDropdown || !appliancesDropdown || !utensilsDropdown) return

  // Clear existing options
  ingredientsDropdown.innerHTML = ''
  appliancesDropdown.innerHTML = ''
  utensilsDropdown.innerHTML = ''

  // Extract unique tags from filtered recipes
  const uniqueIngredients = new Set()
  const uniqueAppliances = new Set()
  const uniqueUtensils = new Set()

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      uniqueIngredients.add(ing.ingredient)
    })
    uniqueAppliances.add(recipe.appliance)
    recipe.ustensils.forEach((utensil) => {
      uniqueUtensils.add(utensil)
    })
  })

  // Function to create list item with active state
  const createListItem = (text, dropdownId) => {
    const li = document.createElement('li')
    li.textContent = text
    li.id = text

    // Check if this item is active (already selected as a tag)
    const isActive = currentTags.includes(text)

    // Apply styles for active items
    if (isActive) {
      li.style.backgroundColor = '#FFD15B'
      li.style.color = 'black'
      li.style.fontWeight = 'bold'
    }

    li.addEventListener('click', () => {
      if (isActive) {
        // If tag is active, remove it
        const tagToRemove = Array.from(tagList.querySelectorAll('#tag')).find(
          (tag) => tag.firstChild.textContent === text
        )
        if (tagToRemove) {
          tagToRemove.remove()
        }
      } else {
        // If tag is not active, add it
        addTag(text, dropdownId)
      }
      // Close dropdown and update everything
      const wrapper = document.querySelector(`#${dropdownId}`)
      if (wrapper) {
        wrapper.click()
      }
      validateTags()
    })
    return li
  }

  // Add filtered ingredients to dropdown
  Array.from(uniqueIngredients)
    .sort((a, b) => {
      // If both items are active or both inactive, sort alphabetically
      const aActive = currentTags.includes(a)
      const bActive = currentTags.includes(b)
      if (aActive === bActive) {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' })
      }
      // If only one is active, put the active one first
      return aActive ? -1 : 1
    })
    .forEach((ingredient) => {
      const li = createListItem(ingredient, 'dropdown-ingredients')
      ingredientsDropdown.appendChild(li)
    })

  // Add filtered appliances to dropdown
  Array.from(uniqueAppliances)
    .sort((a, b) => {
      // If both items are active or both inactive, sort alphabetically
      const aActive = currentTags.includes(a)
      const bActive = currentTags.includes(b)
      if (aActive === bActive) {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' })
      }
      // If only one is active, put the active one first
      return aActive ? -1 : 1
    })
    .forEach((appliance) => {
      const li = createListItem(appliance, 'dropdown-appliances')
      appliancesDropdown.appendChild(li)
    })

  // Add filtered utensils to dropdown
  Array.from(uniqueUtensils)
    .sort((a, b) => {
      // If both items are active or both inactive, sort alphabetically
      const aActive = currentTags.includes(a)
      const bActive = currentTags.includes(b)
      if (aActive === bActive) {
        return a.localeCompare(b, 'fr', { sensitivity: 'base' })
      }
      // If only one is active, put the active one first
      return aActive ? -1 : 1
    })
    .forEach((utensil) => {
      const li = createListItem(utensil, 'dropdown-utensils')
      utensilsDropdown.appendChild(li)
    })
}

// Export addTag function
export function addTag(tagText, dropdownId) {
  const tagList = document.querySelector('#tag-list')
  if (!tagList) return

  const existingTags = Array.from(tagList.querySelectorAll('#tag')).map(
    (tag) => tag.firstChild.textContent
  )

  // Vérifie si le tag existe déjà
  if (!existingTags.includes(tagText)) {
    // Create tag container
    const tag = document.createElement('div')
    tag.classList.add('tag')
    tag.id = 'tag'
    tag.dataset.source = dropdownId

    // Create tag text
    const tagContent = document.createElement('span')
    tagContent.textContent = tagText

    // Create close button
    const closeButton = document.createElement('button')
    closeButton.classList.add('close-tag-button')
    closeButton.textContent = '✕'

    // Add click handler to close button
    closeButton.addEventListener('click', () => {
      tag.remove()
      validateTags()
    })

    // Assemble and add tag to the list
    tag.appendChild(tagContent)
    tag.appendChild(closeButton)
    tagList.appendChild(tag)

    // Close the dropdown
    const dropdown = document.querySelector(`#${dropdownId}`)
    if (dropdown) {
      const list = dropdown.querySelector('.dropdown-list')
      const inputField = dropdown.querySelector('input')
      const eraseSearchButton = dropdown.querySelector('.erase-search-button')

      if (list) list.style.display = 'none'
      if (inputField) {
        inputField.style.display = 'none'
        inputField.value = '' // Reset input value
      }
      if (eraseSearchButton) eraseSearchButton.style.display = 'none'
      dropdown.classList.remove('active')
    }

    // Update everything
    validateTags()
  }
}

// Export the Filter component
export function Filter() {
  const filtersSection = document.createElement('div')
  filtersSection.classList.add('filters')
  filtersSection.id = 'filters-section'

  const recipeControls = document.createElement('section')
  recipeControls.classList.add('recipes-controls')
  recipeControls.id = 'recipe-controls'

  const filtersBox = document.createElement('div')
  filtersBox.classList.add('filters-box')
  filtersBox.id = 'filters-box'

  // Function to filter list items
  function filterList(list, searchTerm) {
    const items = list.querySelectorAll('li')
    items.forEach((item) => {
      const itemText = item.textContent.toLowerCase()
      if (itemText.includes(searchTerm.toLowerCase())) {
        item.style.display = ''
      } else {
        item.style.display = 'none'
      }
    })
  }

  // Paramètres des dropdowns
  function Dropdown(label, options, addTagCallback) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('dropdown')
    wrapper.id = 'dropdown'

    const dropdownClosed = document.createElement('div')
    dropdownClosed.classList.add('dropdown-closed')
    dropdownClosed.id = 'dropdown-closed'

    const dropdownLabel = document.createElement('span')
    dropdownLabel.textContent = label
    dropdownLabel.classList.add('dropdown-label')
    dropdownLabel.id = 'dropdown-label'

    const activeDdownContainer = document.createElement('div')
    activeDdownContainer.classList.add('active-Dropdown-contener')
    activeDdownContainer.id = 'active-Dropdown-contener'

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('dropdown-input-container')
    inputContainer.id = 'dropdown-input-container'

    const inputField = document.createElement('input')
    inputField.type = 'text'
    inputField.classList.add('dropdown-input')
    inputField.id = 'dropdown-input'
    inputField.style.display = 'none'

    const eraseSearchButton = document.createElement('button')
    eraseSearchButton.classList.add('reset-button')
    eraseSearchButton.id = 'reset-button'
    eraseSearchButton.textContent = '✕'
    eraseSearchButton.style.display = 'none'

    const triggerSearchButton = document.createElement('button')
    triggerSearchButton.classList.add('trigger-search-button')
    triggerSearchButton.id = 'trigger-search-button'
    const triggerSearchIcon = document.createElement('img')
    triggerSearchIcon.src = '../../assets/icons/loupe_mini.svg'
    triggerSearchIcon.alt = 'Search Icon'

    const list = document.createElement('ul')
    list.classList.add('dropdown-list')
    list.id = 'dropdown-list'

    options.forEach((option) => {
      const li = document.createElement('li')
      li.textContent = option
      li.id = option
      li.addEventListener('click', () => {
        addTagCallback(option, wrapper.id)
        closeDropdown(option) // Ferme le dropdown après sélection
      })
      list.appendChild(li)
    })

    wrapper.appendChild(dropdownClosed)
    dropdownClosed.appendChild(dropdownLabel)
    wrapper.appendChild(activeDdownContainer)
    activeDdownContainer.appendChild(inputContainer)
    inputContainer.appendChild(inputField)
    inputContainer.appendChild(eraseSearchButton)
    inputContainer.appendChild(triggerSearchButton)
    triggerSearchButton.appendChild(triggerSearchIcon)
    wrapper.appendChild(list)

    function toggleDropdown() {
      const isVisible = list.style.display === 'block'
      list.style.display = isVisible ? 'none' : 'block'
      activeDdownContainer.style.display = isVisible ? 'none' : 'block'
      inputField.style.display = isVisible ? 'none' : 'block'
      eraseSearchButton.style.display = isVisible ? 'none' : 'inline'

      if (isVisible) {
        wrapper.classList.remove('active')
      } else {
        wrapper.classList.add('active')
      }
      inputField.focus()
    }

    function closeDropdown() {
      list.style.display = 'none'
      inputField.style.display = 'none'
      eraseSearchButton.style.display = 'none'
      wrapper.classList.remove('active')
      inputField.value = '' // Reset du champ input
    }

    wrapper.addEventListener('click', toggleDropdown)

    inputField.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase()
      filterList(list, searchTerm)
    })

    eraseSearchButton.addEventListener('click', () => {
      inputField.value = ''
      filterList(list, '')
      inputField.focus()
      toggleDropdown()
    })

    return wrapper
  }

  const ingredientsFilter = Dropdown('Ingrédients', [], addTag)
  ingredientsFilter.classList.add('dropdown')
  ingredientsFilter.id = 'dropdown-ingredients'

  const appliancesFilter = Dropdown('Appareils', [], addTag)
  appliancesFilter.classList.add('dropdown')
  appliancesFilter.id = 'dropdown-appliances'

  const utensilsFilter = Dropdown('Ustensiles', [], addTag)
  utensilsFilter.classList.add('dropdown')
  utensilsFilter.id = 'dropdown-utensils'

  const recipesCount = document.createElement('span')
  recipesCount.classList.add('recipes-count')
  recipesCount.id = 'recipes-count'
  recipesCount.textContent = '50 Recettes'

  const tagList = document.createElement('div')
  tagList.classList.add('tag-list')
  tagList.id = 'tag-list'

  filtersSection.append(recipeControls, tagList)
  recipeControls.append(filtersBox, recipesCount)
  filtersBox.append(ingredientsFilter, appliancesFilter, utensilsFilter)

  // Wait for next tick to ensure elements are in the DOM
  setTimeout(() => {
    validateTags()
  }, 0)

  return filtersSection
}

// Fonction pour extraire les tags uniques
export function getUniqueTags(type) {
  const tags = new Set()
  // Get filtered recipes if there are tags selected, otherwise get all recipes
  const tagList = document.querySelector('#tag-list')
  const selectedTags = tagList
    ? Array.from(tagList.querySelectorAll('#tag')).map((tag) => tag.firstChild.textContent)
    : []
  const inputSearchBar = document.querySelector('#search-bar')
  const searchValue = inputSearchBar ? inputSearchBar.value : ''
  const recipes =
    selectedTags.length > 0 || searchValue.length > 0
      ? filterCommonRecipes(searchValue, selectedTags)
      : getOriginalRecipes()

  recipes.forEach((recipe) => {
    switch (type) {
      case 'ingredients':
        recipe.ingredients.forEach((ingredient) => {
          tags.add(ingredient.ingredient)
        })
        break
      case 'appliances':
        tags.add(recipe.appliance)
        break
      case 'ustensils':
        recipe.ustensils.forEach((ustensil) => {
          tags.add(ustensil)
        })
        break
    }
  })
  return Array.from(tags)
}
