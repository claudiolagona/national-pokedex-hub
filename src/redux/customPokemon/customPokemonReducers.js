const initialState = {
  list: [],
  authStatus: "idle",
  error: null,
};

export const customPokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "customPokemon/fetchRequest":
      return { ...state, authStatus: "loading", error: null };
    case "customPokemon/fetchSuccess":
      return { ...state, authStatus: "succeeded", list: action.payload };
    case "customPokemon/fetchFail":
      return { ...state, authStatus: "failed", error: action.payload };
    case "customPokemon/add":
      return { ...state, list: [...state.list, action.payload] };
    case "customPokemon/delete":
      return {
        ...state,
        list: state.list.filter(
          (customPokemon) => customPokemon.id !== action.payload
        ),
      };
    case "customPokemon/update":
      return {
        ...state,
        list: state.list.map((customPokemon) =>
          customPokemon.id === action.payload.id
            ? action.payload
            : customPokemon
        ),
      };
    default:
      return state;
  }
};
