class Pokemon {
    constructor(data) {
      this.name = data.name;
      this.type = data.type.join(", ");
      this.weight = data.weight;
      this.moves = data.abilities;
      this.thumbnail = data.ThumbnailImage;
      this.height = data.height;
    }
  }
  
  function showPokemonDetails(pokemon) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
      <p><strong>Nombre:</strong> ${pokemon.name}</p>
      <p><strong>Tipo:</strong> ${pokemon.type}</p>
      <p><strong>Peso:</strong> ${pokemon.weight} kg</p>
      <p><strong>Altura:</strong> ${pokemon.height} cm</p>
      <p><strong>Movimientos:</strong> ${pokemon.moves.join(", ")}</p>
    `;
  
    const myModal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    myModal.show();
  }
  
  function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("col-sm-4", "mb-4");
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "shadow");
  
    const cardContent = `
      <img src="${pokemon.thumbnail}" class="card-img-top" alt="${pokemon.name}">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">Tipo: ${pokemon.type}</p>
        <a href="#" class="btn btn-primary" onclick='showPokemonDetails(${JSON.stringify(pokemon)})'>Ver detalles</a>
      </div>
    `;
  
    cardBody.innerHTML = cardContent;
    card.appendChild(cardBody);
  
    return card;
  }
  
  function filterPokemonByName(pokemons, searchTerm) {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  function loadPokedex() {
    try {
      // fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json')
      fetch('pokemons.json')
        .then(response => response.json())
        .then(pokemonsData => {
          const pokedexContainer = document.getElementById("pokedex");
          const searchInput = document.getElementById("searchInput");
  
          let pokemons = pokemonsData.map(pokemonData => new Pokemon(pokemonData));
  
          function updatePokedex() {
            const searchTerm = searchInput.value.trim();
            const filteredPokemons = filterPokemonByName(pokemons, searchTerm);
            pokedexContainer.innerHTML = "";
  
            filteredPokemons.forEach(pokemon => {
              const card = createPokemonCard(pokemon);
              pokedexContainer.appendChild(card);
            });
          }
  
          searchInput.addEventListener("input", updatePokedex);
          updatePokedex();
        });
    } catch (error) {
      console.error("Error al cargar el Pokédex:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadPokedex);
  