/**
 * Reference: https://pokeapi.co/
 */

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async () => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=1025`);
  if (!res.ok) throw new Error("Error: Cannot reach PokeAPI");
  const data = await res.json();

  return data;
};

export const fetchPokemonDetail = async (nameOrId) => {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error("Error: Cannot find the Pokémon");
  const data = await res.json();

  return data;
};

export const fetchPokemonSpecies = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error: Cannot find those species");
  const data = await res.json();

  return data;
};

export const fetchEvolutionChain = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error: Cannot find this evolution chain");
  const data = await res.json();

  return data;
};
