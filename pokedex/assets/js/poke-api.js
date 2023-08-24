const pokeApi = {};

function convertPokeApiDetailsToPokemon(pokemonDetails) {
  const pokemon = new Pokemon();
  pokemon.name = pokemonDetails.name;
  pokemon.number = pokemonDetails.id;

  const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((body) => body.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error));
};
