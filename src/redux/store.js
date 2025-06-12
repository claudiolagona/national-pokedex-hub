import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemon/pokemonReducers";
import { favoritesReducer } from "./favorites/favoritesReducers";
import { userReducer } from "./user/userReducers";
import { customPokemonReducer } from "./customPokemon/customPokemonReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  user: userReducer,
  favorites: favoritesReducer,
  customPokemon: customPokemonReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
