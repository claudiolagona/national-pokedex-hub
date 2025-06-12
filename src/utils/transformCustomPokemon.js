export const transformCustomPokemon = (customPokemon) => ({
  ...customPokemon,
  id: customPokemon.id || Math.floor(Math.random() * 10000),
  sprites: {
    front_default: customPokemon.sprite || null,
    front_shiny: null,
    back_default: null,
    back_shiny: null,
  },
  cries: null,
  moves: null,
  stats:
    customPokemon.stats?.map((stat) => ({
      stat: { name: stat.name },
      base_stat: stat.value,
    })) || [],
  types: customPokemon.types?.map((type) => ({ type: { name: type } })) || [],
  height: null,
  weight: null,
  generation: "custom",
  evolutions: [],
});
