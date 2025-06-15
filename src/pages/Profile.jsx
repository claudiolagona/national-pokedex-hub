import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileAvatar from "../assets/pika-404.png";

export const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const favorites = useSelector((state) => state.favorites.list);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={profileAvatar}
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
            className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${
              currentUser.role === "admin"
                ? "bg-red-100 text-red-600"
                : currentUser.role === "user"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {currentUser.role}
          </span>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Some of Your Favorite Pokémons
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">
            No Pokémons added on your favorite list
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-10">
            {favorites.slice(0, 5).map((pokemon) => {
              if (!pokemon) return null;
              return (
                <div
                  key={pokemon.name}
                  className="bg-white shadow-md rounded p-4 text-center"
                >
                  <div>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-20 h-20 mx-auto"
                    />
                    <p className="capitalize mt-2 font-medium">
                      {pokemon.name}
                    </p>
                  </div>
                </div>
              );
            })}
            {favorites.length > 5 && (
              <div className="bg-white shadow-md rounded p-4 text-center">
                <p
                  className="mt-10 text-sm font-bold text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate("/favorites")}
                >
                  View all favorites
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
