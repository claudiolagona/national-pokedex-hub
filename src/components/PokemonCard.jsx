import { Link } from "react-router-dom";
import { typeColors } from "../utils/typeColors";

export const PokemonCard = ({ pokemon }) => {
  const { name, types, image } = pokemon;
  const sprite = pokemon.sprite || null;

  return (
    <Link
      to={`/pokemon/${name}`}
      className="w-full group block transform transition hover:scale-[1.05]"
    >
      <div className="relative backdrop-blur-md bg-white/10 hover:bg-white/70 rounded-lg shadow-lg p-6 text-center flex flex-col items-center gap-3 hover:shadow-2xl transition duration-300">
        {image || sprite ? (
          <img
            src={image || sprite}
            alt={name}
            className="w-28 h-28 object-contain transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-100 rounded-lg animate-pulse" />
        )}
        <h2 className="text-xl font-extrabold capitalize text-gray-800 tracking-wide capitalize">
          {name}
        </h2>

        {types && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {types.map((type, index) => (
              <span
                key={index}
                className={`text-sm font-bold px-3 py-1 rounded-lg text-white shadow-sm ${
                  typeColors[type] || "bg-gray-400"
                }`}
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
