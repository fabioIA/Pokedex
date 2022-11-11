function main(id) {

    pokeApi.getPokemon(id-1, 1).then((pokemons = []) => {
        document.getElementById('mod').innerHTML = pokemons.map(currentPokemon).join('');
        pokemons.map(gender);

        document.getElementById('about').style.borderBottom = '2px solid blue';

    })
    .catch((error) => console.log(error))
    
}

// function evolutions(pokemon) {
//     const evo = `https://pokeapi.co/api/v2/evolution-chain/${pokemon.number}`;

//     return fetch(evo)
//         .then((response) => response.json())
//         .then((responseBody) => responseBody)
//         .then((take) => console.log(take))
//         .catch((error) => console.log(error))
// }

// function takeEvolution(pokemon) {
//     console.log(pokemon);
// }

const fade = document.getElementById('fade');
const modal = document.getElementById('mod')

function toggleModal(command) {
    if (command == 'open') {
        fade.classList.remove('hide');
        modal.classList.remove('hide');
    }else {
        fade.classList.add('hide');
        modal.classList.add('hide');
    }
};