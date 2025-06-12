import {
  fetchCustomPokemonRequest,
  fetchCustomPokemonSuccess,
  fetchCustomPokemonFail,
  addCustomPokemon,
  updateCustomPokemon,
  deleteCustomPokemon,
} from "./customPokemonActions";
import {
  fetchCustomPokemon,
  createCustomPokemonApi,
  updateCustomPokemonApi,
  deleteCustomPokemonApi,
} from "../../api/jsonServer";

// Fetching all custom Pokémon
export const loadCustomPokemon = () => async (dispatch) => {
  dispatch(fetchCustomPokemonRequest());
  try {
    const customPokemonList = await fetchCustomPokemon();
    dispatch(fetchCustomPokemonSuccess(customPokemonList));
  } catch (error) {
    dispatch(fetchCustomPokemonFail(error));
  }
};

// Add a new custom Pokémon
export const createCustomPokemonThunk = (customPokemon) => async (dispatch) => {
  try {
    const newCustomPokemon = await createCustomPokemonApi(customPokemon);
    dispatch(addCustomPokemon(newCustomPokemon));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Update a custom Pokemon
export const updateCustomPokemonThunk = (customPokemon) => async (dispatch) => {
  try {
    const updatedCustomPokemon = await updateCustomPokemonApi(customPokemon);
    dispatch(updateCustomPokemon(updatedCustomPokemon));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Delete a custom Pokémon
export const deleteCustomPokemonThunk = (id) => async (dispatch) => {
  try {
    const deletedCustomPokemon = await deleteCustomPokemonApi(id);
    dispatch(deleteCustomPokemon(deletedCustomPokemon));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
