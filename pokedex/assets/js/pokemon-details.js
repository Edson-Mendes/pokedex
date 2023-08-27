const favoriteButton = document.getElementById("favorite-button-js");

const key = "pokemon";
const pokemonName = new URLSearchParams(window.location.search).get(key);

favoriteButton.addEventListener("click", () => {
  console.log(`o pokemon ${pokemonName} foi favoritado!!!`);
});

pokeApi.getPokemonByName(pokemonName).then((pokemonDetails) => {
  console.log(pokemonDetails);
});
