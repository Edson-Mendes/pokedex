class PokemonSummary {
  number;
  name;
  type;
  types = [];
  photo;
}

class PokemonDetails {
  summary = new PokemonSummary();
  about = new About();
}

class About {
  species;
  height;
  weight;
  abilities = [];
}