import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileAdmin from "../assets/pika-admin.png";
import profileUser from "../assets/pika-user.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const favorites = useSelector((state) => state.favorites.list);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 px-4 py-25">
      <motion.div
        className="max-w-5xl mx-auto mt-10 px-6 py-8 backdrop-blur-md bg-white/50 shadow-xl rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={currentUser.role === "admin" ? profileAdmin : profileUser}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-yellow-400"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {currentUser.username}
            </h1>
            <p className="text-gray-600">
              {currentUser.email || "example@pokedex.pika"}
            </p>
            <span
              className={`mt-3 inline-block px-3 py-1 text-sm font-semibold rounded-lg ${
                currentUser.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Some of your Favorite Pokémons
          </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center sm:text-left">
              No Pokémons added on your favorite list
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.slice(0, 5).map((pokemon) => {
                if (!pokemon) return null;
                return (
                  <div
                    key={pokemon.name}
                    className="backdrop-blur-md bg-white/50 shadow-md rounded-lg p-4 text-center hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <div>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-20 h-20 mx-auto"
                      />
                      <p className="capitalize mt-3 font-medium">
                        {pokemon.name}
                      </p>
                    </div>
                  </div>
                );
              })}
              {favorites.length > 5 && (
                <motion.div
                  className="flex items-center justify-center backdrop-blur-md bg-blue-50 text-blue-600 font-semibold rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition"
                  onClick={() => navigate("/favorites")}
                  whileHover={{ scale: 1.05 }}
                >
                  View all favorites →
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
