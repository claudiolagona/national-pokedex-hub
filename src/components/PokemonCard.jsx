import { Link } from "react-router-dom";
import { typeColors } from "../utils/typeColors";

export const PokemonCard = ({ pokemon }) => {
  const isCustom = pokemon.custom;
  const { name, types, image } = pokemon;

  return (
    <Link to={`/pokemon/${name}`}>
      <div className="w-95 bg-white px-4 py-15 rounded-xl shadow-lg text-center hover:scale-110 transition cursor-pointer duration-200">
        {image ? (
          <img src={image} alt={name} className="w-30 h-30 mx-auto mb-2" />
        ) : (
          <div className="w-30 h-30 mx-auto mb-2 bg-gray-100 rounded animate-pulse"></div>
        )}
        <h2 className="text-2xl font-bold capitalize">{name}</h2>

        {types && (
          <div className="flex justify-center gap-2 mt-2 flex-wrap">
            {types.map((type) => (
              <span
                className={`text-md px-4 py-2 rounded capitalize font-bold ${
                  typeColors[type] || "bg-gray-200"
                }`}
                key={type}
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {isCustom && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2 inline-block">
            Custom
          </span>
        )}
      </div>
    </Link>
  );
};
