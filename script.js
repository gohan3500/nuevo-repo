//Buscar datos del pokemon dependiendo de su numero o nombre
function buscarPokemon(contenedorNumero){
    let inputId = `pokemonInput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`


    fetch(urlApi)
    .then(Response => Response.json())
    .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
    .catch(()=> mostrarError(contenedorNumero))
}

//Definir tipos y colores de los pokemon
const tiposTraducidos = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada'
};

const coloresTipos = {
    normal: '#A8A77A',
    fighting: '#C22E28',
    flying: '#A98FF3',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B7CE',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD'
};

//Mostrar informacion del pokemon
function mostrarPokemon(datosPokemon, contenedorNumero){
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);

    // Crear un elemento div para contener los tipos
    let tiposDiv = document.createElement('div');
    tiposDiv.classList.add('tipos');

    // Recorrer cada tipo del Pokémon y agregarlo al div
    datosPokemon.types.forEach((tipo) => {
        let tipoSpan = document.createElement('span');
        tipoSpan.classList.add('type');
        tipoSpan.textContent = tiposTraducidos[tipo.type.name]; // Utilizar el nombre en español
        tipoSpan.style.backgroundColor = coloresTipos[tipo.type.name]; // Asignar el color correspondiente
        tiposDiv.appendChild(tipoSpan);
    });

    // Mostrar los datos del Pokémon y los tipos
    infoDiv.innerHTML = `
    <h2 class="pk-name">${datosPokemon.name.toUpperCase()}</h2>
    <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
    <p><strong>Número:</strong> ${datosPokemon.id}</p>
    <p><strong>Peso:</strong> ${datosPokemon.weight/10}Kg</p>
    <p><strong>Altura:</strong> ${datosPokemon.height/10}m</p>
    `;
    infoDiv.appendChild(tiposDiv); // Agregar el contenedor de tipos al div de información del Pokémon
}

//error en busqueda pokemon

function mostrarError(contenedorNumero){
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
    infoDiv.innerHTML = `
    <p class="pk-ms">Pokemon no encontrado. <br> Intenta con otro nombre o numero</p>
    `
}

// mostrar pokemon inicial  

window.onload = function(){
    document.getElementById("pokemonInput1").value = "25";
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = "134";
    buscarPokemon(2);
}