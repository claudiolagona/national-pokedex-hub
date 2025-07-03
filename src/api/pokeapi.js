/**
 * Reference: https://pokeapi.co/
 */

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async () => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon?limit=1025`);
    if (!res.ok) throw new Error("Error: Cannot reach PokeAPI");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPokemonDetail = async (nameOrId) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!res.ok) throw new Error("Error: Cannot find the Pokémon");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPokemonSpecies = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error: Cannot find those species");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);

  }
};

export const fetchEvolutionChain = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error: Cannot find this evolution chain");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
