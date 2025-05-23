export const parseEvolutionChain = (chain) => {
  const evolution = [];
  let current = chain.chain;

  while (current && current.species) {
    const url = current.species.url;
    const id = parseInt(url.split("/").filter(Boolean).pop());

    evolution.push({ name: current.species.name, id });

    if (!current.evolves_to || current.evolves_to.length === 0) break;
    current = current.evolves_to[0];
  }

  return evolution;
};
