import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const customPokemonList = useSelector((state) => state.customPokemon.list);
  const [customPokemon, setCustomPokemon] = useState([]);

  useEffect(() => {
    const lastCustomPokemons = customPokemonList.slice(-5).reverse();
    setCustomPokemon(lastCustomPokemons);
  }, [customPokemonList]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">
        {currentUser.username} Dashboard
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Those are the last Custom Pokémons you created
      </h2>

      {customPokemon.length === 0 ? (
        <p className="text-gray-500">No Custom Pokémon found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {customPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white border rounded-lg shadow p-4 text-center"
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto"
              />
              <p className="capitalize mt-2 font-semibold text-gray-700">
                {pokemon.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
