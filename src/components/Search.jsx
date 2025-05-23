export const Search = ({ searchPokemon, handleChange }) => {
  return (
    <input
      className="border-2 border-gray-300 outline-0 px-4 py-2 rounded w-full md:w-1/2 mb-6"
      type="text"
      placeholder="Search your Pokémon"
      value={searchPokemon}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
