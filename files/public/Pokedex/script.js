// API URL for the first 151 Pokémon (Generation I)
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

// Function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to display Pokémon on the webpage
function displayPokemon(pokemonData) {
  const pokemonList = document.getElementById('pokemon-list');

  // Sort the Pokémon data by their ID
  pokemonData.sort((a, b) => a.id - b.id);

  pokemonData.forEach((pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    const pokemonType = document.createElement('h3');
    pokemonType.textContent = pokemon.types.map((type) => type.type.name).join(', ');

    // Fetch the species data to get the description
    fetchData(pokemon.species.url).then((speciesData) => {
      const pokemonDescription = document.createElement('p');
      pokemonDescription.textContent = speciesData.flavor_text_entries[0].flavor_text;

      const cardFront = document.createElement('div');
      cardFront.className = 'card-front';
      cardFront.appendChild(pokemonName);
      cardFront.appendChild(pokemonImage);

      const cardBack = document.createElement('div');
      cardBack.className = 'card-back';
      cardBack.appendChild(pokemonType);
      cardBack.appendChild(pokemonDescription);

      pokemonCard.appendChild(cardFront);
      pokemonCard.appendChild(cardBack);

      pokemonList.appendChild(pokemonCard);

      // Add event listener to flip the card
      pokemonCard.addEventListener('click', () => {
        pokemonCard.classList.toggle('flipped');
      });
    });
  });
}

// Function to search for a Pokémon
function searchPokemon(searchTerm) {
  const pokemonList = document.getElementById('pokemon-list');
  const pokemonCards = pokemonList.children;

  Array.from(pokemonCards).forEach((pokemonCard) => {
    const pokemonName = pokemonCard.querySelector('.card-front h2').textContent;
    if (pokemonName.toLowerCase().includes(searchTerm.toLowerCase())) {
      pokemonCard.style.display = 'block';
    } else {
      pokemonCard.style.display = 'none';
    }
  });
}

// Fetch data and display Pokémon
fetchData(apiUrl).then((data) => {
  // Make an additional API call to fetch the details of each Pokémon
  const promises = data.results.map((pokemon) => fetchData(pokemon.url));
  Promise.all(promises).then((pokemonDetails) => {
    displayPokemon(pokemonDetails);
  });
});

// Add event listener to search bar
document.getElementById('search-bar').addEventListener('input', (e) => {
  searchPokemon(e.target.value);
});