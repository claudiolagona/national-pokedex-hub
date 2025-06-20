export const FilterByGenerations = ({
  selectedGen,
  changeGen,
  allGenerations,
  currentUser,
}) => {
  return (
    <div className="inline-block relative w-[30%] max-sm:w-full">
      <select
        value={selectedGen}
        onChange={(e) => changeGen(e.target.value)}
        className={`w-full appearance-none bg-white text-gray-800 border-2 rounded-lg px-4 py-2 pr-10 shadow-sm outline-none transition-all duration-200 ${
          selectedGen ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <option value="">All generations</option>
        {allGenerations.map((gen, index) => {
          return (
            <option key={gen.name} value={gen.name}>
              Generation {index + 1}
            </option>
          );
        })}
        {currentUser?.role === "admin" && (
          <option value="custom">Custom Pokémon</option>
        )}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
