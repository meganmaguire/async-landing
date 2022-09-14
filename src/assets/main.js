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

(async () => {
    try{
        const nroPokemon = [245, 59, 181, 655, 384];
        const listPokemon = [];
        for(let nro of nroPokemon) {
            const pokemon = await fetchPokemon(POKEAPI, nro);
            listPokemon.push(pokemon);
        }
        let view = `
        ${listPokemon.map(pokemon => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Pokémon ${pokemon.species.name}, PokéDex number #${pokemon.id}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${pokemon.species.name.toUpperCase()}
                </h3>
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