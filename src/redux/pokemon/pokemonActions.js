// Action to start fetching all Pokémons
export const fetchPokemonsStart = () => ({
  type: "pokemon/fetchAllPokemons",
});

// Action to a success while searching Pokémons
export const fetchPokemonSuccess = (pokemon) => ({
  type: "pokemon/fetchPokemonSuccess",
  payload: pokemon,
});

// Action to a failure while searching Pokémons
export const fetchPokemonFail = (error) => ({
  type: "pokemon/fetchPokemonFail",
  payload: error,
});

// Action to set filters while searching Pokémons
export const setFilters = (filters) => ({
  type: "pokemon/setFilters",
  payload: filters,
});
