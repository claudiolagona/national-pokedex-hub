const initialState = {
  pokemonList: [],
  authStatus: "idle",
  error: null,
  filters: {
    name: "",
    generation: "",
    type: "",
  },
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "pokemon/fetchAllPokemons":
      return { ...state, authStatus: "loading", error: null };
    case "pokemon/fetchPokemonSuccess":
      return { ...state, authStatus: "succeeded", pokemonList: action.payload };
    case "pokemon/fetchPokemonFail":
      return { ...state, authStatus: "failed", error: action.payload };
    case "pokemon/setFilters":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};
