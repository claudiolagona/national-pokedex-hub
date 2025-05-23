// Action to fetch custom Pokémon
export const fetchCustomPokemonRequest = () => ({
  type: "customPokemon/fetchRequest",
});

// Action for a successful fetch request
export const fetchCustomPokemonSuccess = (list) => ({
  type: "customPokemon/fetchSuccess",
  payload: list,
});

// Action for a not successful fetch request
export const fetchCustomPokemonFail = (error) => ({
  type: "customPokemon/fetchFail",
  payload: error,
});

// Action to add custom Pokémon
export const addCustomPokemon = (customPokemon) => ({
  type: "customPokemon/add",
  payload: customPokemon,
});

// Action to delete custom Pokémon
export const deleteCustomPokemon = (id) => ({
  type: "customPokemon/delete",
  payload: id,
});

// Action to update custom Pokémon
export const updateCustomPokemon = (customPokemon) => ({
  type: "customPokemon/update",
  payload: customPokemon,
});
