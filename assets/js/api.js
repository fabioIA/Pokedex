const pokeApi = {};

function convertModel(pokemonDetail) {

    const pokemon = new Pokemon;

    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    pokemon.img = pokemonDetail.sprites.other.dream_world.front_default;
    pokemon.weight = pokemonDetail.weight;
    pokemon.height = pokemonDetail.height;
    pokemon.stats = pokemonDetail.stats.map((stat) => stat.base_stat);
    pokemon.abilities = pokemonDetail.abilities.map((abilit) => abilit.ability.name);
    pokemon.moves = pokemonDetail.moves.map((mo) => mo.move.name);
    
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [color] = types;

    pokemon.types = types;
    pokemon.color = color;

    return pokemon;

}

pokeApi.getDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertModel)

}

pokeApi.getPokemon = (offset = 0, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getDetail))
        .then((detais) => Promise.all(detais))
        .catch((error) => console.error(error))

}