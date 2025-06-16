import { Link } from "react-router-dom";
import { typeColors } from "../utils/typeColors";

export const PokemonCard = ({ pokemon }) => {
  const { name, types, image } = pokemon;
  const sprite = pokemon.sprite || null;

  return (
    <div className="w-full sm:w-75 md:w-64 lg:w-75 bg-white px-4 py-15 rounded-xl shadow-md text-center hover:scale-110 transition cursor-pointer duration-200 mb-6">
      <Link to={`/pokemon/${name}`}>
        {image || sprite ? (
          <img
            src={image || sprite}
            alt={name}
            className="mx-auto mb-3 max-w-[120px] h-auto"
          />
        ) : (
          <div className="mx-auto mb-3 w-[120px] h-[120px] bg-gray-100 rounded animate-pulse"></div>
        )}
        <h2 className="text-2xl font-bold capitalize">{name}</h2>

        {types && (
          <div className="flex justify-center gap-2 mt-2 flex-wrap">
            {types.map((type, index) => {
              if (!type || !type.type || !type.type.name) return null;

              const typeName = type.type.name;

              return (
                <span
                  className={`text-md px-4 py-2 rounded capitalize font-bold ${
                    typeColors[typeName] || "bg-gray-200"
                  }`}
                  key={index}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        )}
      </Link>
    </div>
  );
};
