const POKEAPI = 'https://pokeapi.co/api/v2';
const content = null || document.getElementById('content');

async function fetchPokemon(urlApi, number){
    const response = await fetch(`${urlApi}/pokemon/${number}`, {
        method: 'GET',
        mode: 'cors'
    });
    const data = await response.json();
    return data;
}

async function fetchPokemonSpecies(urlApi, number){
    const response = await fetch(`${urlApi}/pokemon-species/${number}`, {
        method: 'GET',
        mode: 'cors'
    });
    const data = await response.json();
    return data;
}

(async () => {
    try{
        const nroPokemon = [245, 59, 181, 655, 384, 194, 43, 471];
        const listPokemon = [];
        const species = [];
        for(let nro of nroPokemon) {
            const pokemon = await fetchPokemon(POKEAPI, nro);
            listPokemon.push(pokemon);
            const specie = await fetchPokemonSpecies(POKEAPI, nro);
            species.push(specie);
        }
        let view = `
        ${listPokemon.map(pokemon => `
            <div class="group relative">
                <div
                class="transition-all ease-in rounded-[50%] group-hover:opacity-100 opacity-80 group-hover:rounded-lg duration-200 w-full bg-gray-200 aspect-w-1 aspect-h-1  lg:aspect-none">
                <img class="transition-all ease-in group-hover:scale-105 duration-200" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Pokémon ${pokemon.species.name}, PokéDex number #${pokemon.id}" class="w-full">
                </div>
                <div class="mt-6 flex gap-3 items-center">
                    <span class="w-5"><img src="./imgs/poke_ball.png"></span>
                    <h3 class="text-lg font-bold text-gray-900 grow">
                        ${pokemon.species.name.toUpperCase()}
                    </h3>
                    <h3 class="text-lg text-gray-400">
                        #${pokemon.id}
                    </h3>
                </div>
                <div class="opacity-75 transition-opacity ease-in duration-200 group-hover:opacity-100">
                    <div class="mt-4 flex gap-3 items-center">
                        <p class="text-md text-gray-700">
                            ${species.find(specie => specie.name === pokemon.species.name)
                                .flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text}
                        </p>
                    </div>
                    <div class="mt-4 flex gap-3 items-center">
                        <div class="flex gap-1">
                            <p class="text-md font-semibold text-gray-600">
                                Altura:
                            </p>
                            <p class="text-md text-gray-600">
                                ${pokemon.height/10} m.
                            </p>
                        </div>
                        <div class="flex gap-1">
                            <p class="text-md font-semibold text-gray-600">
                                Peso:
                            </p>
                            <p class="text-md text-gray-600">
                                ${pokemon.weight/10} kg.
                            </p>
                        </div>
                    </div>
                    <div class="mt-2 flex gap-3 items-center">
                        <p class="text-md text-gray-500">
                            Más info: 
                            <a class="text-indigo-500 hover:text-indigo-800" href="https://www.wikidex.net/wiki/${pokemon.species.name}">WikiDex</a>
                        </p>
                    </div>
                </div>
            </div>`).join()}
        `;
        view = view.replaceAll(',','');
        content.innerHTML = view;
    } catch(e){
        console.error("Hubo un error: ");
        console.error(e);
    }
})();