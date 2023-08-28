const favoriteButton = document.getElementById("favorite-button-js");
const pokemonInfo = document.getElementById("info-js");
const body = document.getElementById("body-js");

const key = "pokemon";
const pokemonName = new URLSearchParams(window.location.search).get(key);

favoriteButton.addEventListener("click", () => {
  console.log(`o pokemon ${pokemonName} foi favoritado!!!`);
});

pokeApi.getPokemonByName(pokemonName).then((pokemonDetails) => {
  generateHTML(pokemonDetails);
});

function generateHTML(pokemonDetails) {
  const basicInfo = generateBasicInfo(pokemonDetails.summary);

  pokemonInfo.innerHTML = basicInfo;
  body.className = `${pokemonDetails.summary.type}`;
}

function generateBasicInfo(summary) {
  return `
    <div class="info__basic">
      <div class="info__basic__name-type">
        <span class="info__basic__name">${summary.name}</span>
        <ol class="info__basic__type-list">
          ${summary.types
            .map(
              (type) =>
                `<li class="info__basic__type-list__item ${type}">${type}</li>`
            )
            .join("")}
        </ol>
      </div>

      <span class="info__basic__number">#${summary.number}</span>
    </div>

    <img
      class="info__img"
      src="${summary.photo}"
      alt="${summary.name} image"
    />
  `;
}
