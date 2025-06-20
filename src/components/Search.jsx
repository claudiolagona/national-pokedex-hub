export const Search = ({ searchPokemon, handleChange }) => {
  return (
    <div className="w-full relative">
      <input
        className="w-full px-4 py-2 pl-10 text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-sm outline-none transition duration-200 focus:border-teal-500"
        type="text"
        placeholder="Search your Pokémon"
        value={searchPokemon}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-zinc-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
          />
        </svg>
      </div>
    </div>
  );
};
