const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemons = document.getElementsByClassName("pokemons");

const limit = 10;
let offset = 0;

const maxRecords = 151;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        return `
      <li id="${pokemon.name}" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>
          <img
            src="${pokemon.photo}"
            alt="Sprite ${pokemon.name}"
          />
        </div>
      </li>
      `;
      })
      .join("");

    pokemonList.innerHTML += newHtml;

    pokemons.forEach((pokemon) => {
      const pokemonItem = document.getElementById(pokemon.name);
      pokemonItem.addEventListener("click", () => goToPokemonDetails(pokemon));
    });
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

function goToPokemonDetails(pokemon) {
  const params = new URLSearchParams();
  params.append('pokemon', pokemon.name);
  let host = location.origin;
  location.href = host.concat(`/pokedex/pokemon-details.html?${params.toString()}`);
}
