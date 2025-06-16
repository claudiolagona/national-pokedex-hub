import {
  fetchPokemonsStart,
  fetchPokemonSuccess,
  fetchPokemonFail,
} from "./pokemonActions";
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonSpecies,
} from "../../api/pokeapi";
import { throttlePromise } from "../../utils/throttlePromise";

export const fetchPokemonThunk =
  (offset = 0) =>
  async (dispatch) => {
    dispatch(fetchPokemonsStart());
    try {
      const listPokemons = await fetchPokemonList(offset);
      const results = listPokemons.results;

      const tasks = results.map((pokemon) => async () => {
        try {
          const pokemonRes = await fetchPokemonDetail(pokemon.name);
          const speciesRes = await fetchPokemonSpecies(pokemonRes.species.url);

          return {
            name: pokemonRes.name,
            types: pokemonRes.types.map((type) => type.type.name),
            image: pokemonRes.sprites.front_default,
            id: pokemonRes.id,
            generation: speciesRes.generation.name,
          };
        } catch (error) {
          console.error(`Error while fetching ${pokemon.name} - ${error}`);
          return null;
        }
      });

      const detailedPokemons = (await throttlePromise(tasks, 5)).filter(
        Boolean
      );

      dispatch(fetchPokemonSuccess(detailedPokemons));
    } catch (error) {
      dispatch(fetchPokemonFail(error.message));
    }
  };
