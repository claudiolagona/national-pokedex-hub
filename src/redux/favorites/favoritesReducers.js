const initialState = {
  list: [],
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "favorites/add":
      return { ...state, list: [...state.list, action.payload] };
    case "favorites/remove":
      return {
        ...state,
        list: state.list.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};
