import { typeColorsBorder } from "../utils/typeColors";

export const FilterByType = ({ selectedType, changeType, allTypes }) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => changeType(e.target.value)}
      className={`border-2 px-4 py-2 rounded outline-0 ${
        selectedType ? typeColorsBorder[selectedType] : "border-gray-300"
      }`}
    >
      <option value="">All Types</option>
      {allTypes.map((type, index) =>
        index !== allTypes.length - 2 && index !== allTypes.length - 1 ? (
          <option key={type.name} value={type.name}>
            {type.name[0].toUpperCase() + type.name.slice(1)}
          </option>
        ) : null
      )}
    </select>
  );
};
