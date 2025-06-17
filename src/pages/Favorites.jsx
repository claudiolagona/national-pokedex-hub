import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.list);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 px-4 py-25">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
          Favorite Pokémons
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No Pokémon added to your favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((pokemon) => {
              if (!pokemon) return null;
              return (
                <motion.div
                  key={pokemon.name}
                  className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  <div onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-20 h-20 mx-auto"
                    />
                    <p className="capitalize mt-3 font-semibold text-lg">
                      {pokemon.name}
                    </p>
                  </div>
                  <div className="mt-3">
                    <FavoriteButton pokemon={pokemon} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};
