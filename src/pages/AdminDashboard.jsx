import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const allPokemons = useSelector((state) => state.pokemon.pokemonList);
  const [customPokemon, setCustomPokemon] = useState([]);

  useEffect(() => {
    const lastCustomPokemons = allPokemons
      .filter((pokemon) => pokemon.generation === "custom")
      .slice(-5)
      .reverse();
    setCustomPokemon(lastCustomPokemons);
  }, [allPokemons]);

  return <h1>Admin Dashboard</h1>;
};
