import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemon/pokemonReducers";
import { favoritesReducer } from "./favorites/favoritesReducers";
import { userReducer } from "./user/userReducers";
import { customPokemonReducer } from "./customPokemon/customPokemonReducers";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    user: userReducer,
    favorites: favoritesReducer,
    customPokemon: customPokemonReducer,
  },
});
