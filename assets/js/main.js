const more = document.querySelector('.more');
const limit = 10;
let offset = 0;
const max = 905;

function convertPokemon(pokemon) {
    
    return `
          <li class="pokemon ${pokemon.color}" onclick="main(${pokemon.number}); toggleModal('open')">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.color}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            </li>
          `

}

loadPokemons(offset, limit);

more.addEventListener('click', () => {
    offset += limit;

    const qtdRecord = offset + limit;

    if(qtdRecord >= max) {
        const newLimit = max - offset;

        loadPokemons(offset, newLimit);

        more.parentElement.removeChild(more);
    }else {
        loadPokemons(offset, limit);

    }

})

function loadPokemons(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        document.querySelector('.pokemons').innerHTML += pokemons.map(convertPokemon).join('');

    })
    .catch((error) => console.log(error))

}