export const FilterByGenerations = ({
  selectedGen,
  changeGen,
  allGenerations,
}) => {
  return (
    <select
      value={selectedGen}
      onChange={(e) => changeGen(e.target.value)}
      className={`px-4 py-2 border-2 rounded outline-0 ${
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
    </select>
  );
};
