const pokemonList = [
  "https://pokeapi.co/api/v2/pokemon/1",
  "https://pokeapi.co/api/v2/pokemon/10",
  "https://pokeapi.co/api/v2/pokemon/12",
  "https://pokeapi.co/api/v2/pokemon/45",
  "https://pokeapi.co/api/v2/pokemon/64",
  "https://pokeapi.co/api/v2/pokemon/78",
  "https://pokeapi.co/api/v2/pokemon/3",
  "https://pokeapi.co/api/v2/pokemon/21",
  "https://pokeapi.co/api/v2/pokemon/26",
  "https://pokeapi.co/api/v2/pokemon/39",
  "https://pokeapi.co/api/v2/pokemon/44",
  "https://pokeapi.co/api/v2/pokemon/9",
  "https://pokeapi.co/api/v2/pokemon/38",
  "https://pokeapi.co/api/v2/pokemon/55",
];

// let pokemonList = `https://pokeapi.co/api/v2/pokemon/{id}`;

const showPokemonAsync = (pokemon) =>
  new Promise((resolve) => {
    if (!pokemon) return;

    const body = document.querySelector("body");
    const image = document.createElement("img");

    image.src = pokemon.sprites.front_default;
    image.addEventListener("load", () => {
      console.log("Pokemon was rendered!");
      resolve();
    });

    body.appendChild(image);
  });

const requestsList = pokemonList.map((url) => () => fetch(url));

const requestPokemon = async (reqList) => {
  if (!reqList.length) {
    console.log("All done");
    return;
  }

  const [req1, req2, req3, ...restReq] = reqList;

  const requestToSend = [req1, req2, req3].map(async (sendRequest) => {
    if (!sendRequest) return;

    const responseData = await sendRequest();
    console.log("Pokemon data was received!");

    const pokemonData = await responseData.json();

    return showPokemonAsync(pokemonData);
  });

  const pokemonList = await Promise.all(requestToSend);

  console.log("Pokemon list fetched!");

  requestPokemon(restReq);
};

(async () => {
  requestPokemon(requestsList);
})();
