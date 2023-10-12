console.log("main.js connected");

const searchTermsInput = document.querySelector("#search-terms");
const abilitiesContainer = document.querySelector("#abilities-container");

const displayAbilities = (abilities) => {
  const abilitiesHTML = abilities
    .map((ability) => `<p>${ability.name}</p>`)
    .join("");

  abilitiesContainer.innerHTML = abilitiesHTML;
};

const getPokeCategories = async () => {
  const PokeCategoriesApiURL = "https://pokeapi.co/api/v2/ability/150/";

  try {
    const response = await fetch(PokeCategoriesApiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayAbilities(data.abilities);
  } catch (error) {
    console.error(error); // It's a better practice to use console.error for errors
    alert("Something went wrong, try again later");
  }
};

const handleFormInputFocus = async () => {
  console.log("focus occurred");
  await getPokeCategories();
};

searchTermsInput.addEventListener("focus", handleFormInputFocus);
