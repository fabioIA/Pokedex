function currentPokemon(pokemon, key) {
    let id = pokemon.number;

    if(pokemon.number < 10) id = '00'+pokemon.number;
    else if(pokemon.number < 100) id = '0'+pokemon.number;

    return `
            <div id="modal" class="${pokemon.color}">
                <div class="head">
                    <div class="top">
                        <div>
                            <i onclick="toggleModal('close')" class="fa-sharp fa-solid fa-arrow-left-long"></i>
                        </div>

                        <div>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                    <div class="identity">
                        <div>
                            <div>
                                <h1 class="name">${pokemon.name}</h1>
                            </div>
                            
                            <div class="lis">
                                <ol>
                                    ${pokemon.types.map((type) => `<li class="type ${pokemon.color}">${type}</li>`).join('')}
                                </ol>
                            </div>
                        </div>

                        <div class="id">
                            <span>#${id}</span>
                        </div>
                    
                    </div>
                    <div class="photo">
                        <img src="${pokemon.img}" alt="${pokemon.name}">
                    </div>
                </div>

                <div class="body">
                    <div>
                        <nav>
                            <button id="about" onclick="push(${pokemon.number}, 'about')">About</button>
                            <button id="stats" onclick="push(${pokemon.number}, 'stats')">Base Stats</button>
                            <button id="evolutions" onclick="push(${pokemon.number}, 'evolutions')">Evolution</button>
                            <button id="moves" onclick="push(${pokemon.number}, 'moves')">Moves</button>
                        </nav>
                    </div>

                    <div class="result">
                        <div class="reg1">
                            <ol>
                                <li>Height</li>
                                <li>Weight</li>
                                <li>Abilities</li>
                                <li>Gender</li>
                            </ol>
                        </div>
                    
                        <div>
                            <ol class="reg2">
                                <li><b>${pokemon.height/10} m</b></li>
                                <li><b>${pokemon.weight/10} kg</b></li>
                                <li><b>${pokemon.abilities.join(', ')}</b></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        `
}

function gender(pokemon) {
    const femeleUrl = 'https://pokeapi.co/api/v2/gender/1/';

    return fetch(femeleUrl)
        .then((response) => response.json())
        .then((responseBody) => responseBody)
        .then((rest) => searchPokemon(rest, pokemon))
        .catch((error) => console.log(error))

}

function searchPokemon(rate, pokemon) {
    rate.pokemon_species_details.forEach((e) => {
        if (e.pokemon_species.name == pokemon.name) {
            const rate = (e.rate/2)*25;

            document.querySelector('.reg2').innerHTML += `<li><b><i class="fa-sharp fa-solid fa-venus"></i> ${rate}% <i class="fa-sharp fa-solid fa-mars"></i> ${100 - rate}%</b></li>`;
        }
    });
}

function push(id, key) {
    switch (key) {
        case 'about':
            pokeApi.getPokemon(id-1, 1).then((pokemons = []) => document.querySelector('.result').innerHTML = pokemons.map(about).join(''))
            break;

        case 'stats':
            pokeApi.getPokemon(id-1, 1).then((pokemons = []) => document.querySelector('.result').innerHTML = pokemons.map(stats).join(''))
            break;

        case 'evolutions':
            pokeApi.getPokemon(id-1, 1).then((pokemons = []) => document.querySelector('.result').innerHTML = pokemons.map(evolutions).join(''))
            break;

        case 'moves':
            pokeApi.getPokemon(id-1, 1).then((pokemons = []) => document.querySelector('.result').innerHTML = pokemons.map(moves).join(''))
            break;
                            
        default:
            break;
    }
}

function about(pokemon) {
    document.getElementById('moves').style.borderBottom = '1px solid black';
    document.getElementById('evolutions').style.borderBottom = '1px solid black';
    document.getElementById('stats').style.borderBottom = '1px solid black';
    document.getElementById('about').style.borderBottom = '2px solid blue';
    
    gender(pokemon);

    return `
        <div class="reg1">
            <ol>
                <li>Height</li>
                <li>Weight</li>
                <li>Abilities</li>
                <li>Gender</li>
            </ol>
        </div>
        
        <div>
            <ol class="reg2">
                <li><b>${pokemon.height/10} m</b></li>
                <li><b>${pokemon.weight/10} kg</b></li>
                <li><b>${pokemon.abilities.join(', ')}</b></li>
            </ol>
        </div>
        `;
}

function stats(pokemon) {
    let total = 0;
    pokemon.stats.forEach(element => total += element);

    document.getElementById('about').style.borderBottom = '1px solid black';
    document.getElementById('moves').style.borderBottom = '1px solid black';
    document.getElementById('evolutions').style.borderBottom = '1px solid black';
    document.getElementById('stats').style.borderBottom = '2px solid blue';

    return `
        <ol class="allStats">
            <li>
                <div><span>HP:</span></div>
                <b>${pokemon.stats[0]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[0])/8}"'></div>
                    </div>
                </div>
            </li>
            <li>
                <div><span>Attack:</span></div> 
                <b>${pokemon.stats[1]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[1])/8}"'></div>
                    </div>
                </div>
            </li>
            <li>
                <div><span>Defense:</span></div> 
                <b>${pokemon.stats[2]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[2])/8}"'></div>
                    </div>
                </div>
            </li>
            <li>
                <div><span>Sp.Atk:</span></div> 
                <b>${pokemon.stats[3]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[3])/8}"'></div>
                    </div>
                </div>
                
            </li>
            <li>
                <div><span>Sp.Def:</span></div>
                <b>${pokemon.stats[4]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[4])/8}"'></div>
                    </div>
                </div>
            </li>
            <li>
                <div><span>Speed:</span></div>
                <b>${pokemon.stats[5]}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${(5*pokemon.stats[5])/8}"'></div>
                    </div>
                </div>
            </li>
            <li>
                <div><span>Total:</span></div>
                <b>${total}</b>

                <div class="lin">
                    <div class="progress">
                        <div class="stats" style="--progress: ${total/9.6}"'></div>
                    </div>
                </div>
            </li>
        </ol>
    `;
}

function evolutions(pokemon) {
    document.getElementById('stats').style.borderBottom = '1px solid black';
    document.getElementById('about').style.borderBottom = '1px solid black';
    document.getElementById('moves').style.borderBottom = '1px solid black';
    document.getElementById('evolutions').style.borderBottom = '2px solid blue';

    //evolutions(pokemon)

    return '<h1>Evolutions</h1>';
}

function moves(pokemon) {
    document.getElementById('evolutions').style.borderBottom = '1px solid black';
    document.getElementById('stats').style.borderBottom = '1px solid black';
    document.getElementById('about').style.borderBottom = '1px solid black';
    document.getElementById('moves').style.borderBottom = '2px solid blue';

    return `
        <ol class="moves">
            ${pokemon.moves.map((move) => `<li>${move}</li>`).join('')}
        </ol>
        `;
}