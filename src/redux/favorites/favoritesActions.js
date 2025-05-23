// Action to add favourites
export const addFavorites = (pokemon) => ({
  type: "favorites/add",
  payload: pokemon,
});

// Action to remove favourites
export const removeFavorites = (pokemon) => ({
  type: "favorites/remove",
  payload: pokemon,
});
