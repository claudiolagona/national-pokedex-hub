import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const customPokemonList = useSelector((state) => state.customPokemon.list);
  const [customPokemon, setCustomPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lastCustomPokemons = customPokemonList.slice(-5).reverse();
    setCustomPokemon(lastCustomPokemons);
  }, [customPokemonList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 px-4 py-25">
      <div className="max-w-5xl mx-auto mt-10 p-6 backdrop-blur-md bg-white/50 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
          {currentUser.username} Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Here's a quick look at your latest Custom Pokémons.
        </p>

        {customPokemon.length === 0 ? (
          <p className="text-gray-500 text-center">No Custom Pokémon found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {customPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto object-contain"
                />
                <p className="capitalize mt-3 text-center font-semibold text-gray-700">
                  {pokemon.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
