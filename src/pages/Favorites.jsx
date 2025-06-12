import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";

export const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.list);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Pokémons</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No Pokémons added on your favorite list</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-10">
          {favorites.map((pokemon) => {
            if (!pokemon) return null;
            return (
              <div
                key={pokemon.name}
                className="cursor-pointer bg-white shadow-md rounded p-4 text-center hover:scale-115 transition"
              >
                <div onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-20 h-20 mx-auto"
                  />
                  <p className="capitalize mt-2 font-medium">{pokemon.name}</p>
                </div>
                <div className="mt-2">
                  <FavoriteButton pokemon={pokemon} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
