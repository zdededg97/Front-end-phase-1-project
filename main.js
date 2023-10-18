const searchTermsInput = document.querySelector("#search-terms");
const abilitiesContainer = document.querySelector("#abilities-container");
const categoryFilterDropdown = document.querySelector("#category-filter");
const searchForm = document.querySelector("#poke-search-form");

const displayPokemonDetails = async (pokemonList) => {
  const detailsPromises = pokemonList.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );

  const detailedPokemons = await Promise.all(detailsPromises);

  const pokemonHTML = detailedPokemons
    .map((pokemon) => {
      return `
      <div class="pokemon">
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${
        pokemon.name
      } image"/>
        <p>Type: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>Abilities: ${pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}</p>
      </div>
    `;
    })
    .join("");

  abilitiesContainer.innerHTML = pokemonHTML;
};

const getPokemonList = async () => {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.results && Array.isArray(data.results)) {
      await displayPokemonDetails(data.results);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong, try again later");
  }
};

const handleFormInputFocus = async () => {
  console.log("focus occurred");
  await getPokemonList();
};

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = searchTermsInput.value;
    const selectedCategory = categoryFilterDropdown.value;
    console.log(
      "Search term:",
      searchTerm,
      "Selected category:",
      selectedCategory
    );
  });
}

if (categoryFilterDropdown) {
  categoryFilterDropdown.addEventListener("change", function () {
    const selectedCategory = this.value;
    console.log("Selected Category:", selectedCategory);
  });
}

if (searchTermsInput) {
  searchTermsInput.addEventListener("focus", handleFormInputFocus);
}
