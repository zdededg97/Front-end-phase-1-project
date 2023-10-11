console.log("main.js connected");

const searchTermsInput = document.body.querySelector("#search-terms");

const getPokeCategories = async () => {
  const PokeCatergoriesApiURL = "https://pokeapi.co/api/v2/ability/150/";

  try {
    const response = await fetch(PokeCatergoriesApiURL);
    const data = response.json();
    console.log("data: ", data);
  } catch (error) {
    console.log(error);
    alert("Something went wrong, try again later");
  }
};

const handleFormInputFocus = async () => {
  console.log("focus occurred");

  await getPokeCategories();
};

searchTermsInput.addEventListener("focus", handleFormInputFocus);
