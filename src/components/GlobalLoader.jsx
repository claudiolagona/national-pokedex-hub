import { PacmanLoader } from "react-spinners";
import { useSelector } from "react-redux";

export const GlobalLoader = () => {
  const userLoading = useSelector(
    (state) => state.user.authStatus === "loading"
  );
  const pokemonLoading = useSelector(
    (state) => state.pokemon.authStatus === "loading"
  );
  const customPokemonLoading = useSelector(
    (state) => state.customPokemon.authStatus === "loading"
  );

  const isLoading = userLoading || pokemonLoading || customPokemonLoading;

  return (
    isLoading && (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        aria-label="Loading"
      >
        <div className="text-center">
          <PacmanLoader size={40} color="#ffcb05" />
          <p className="mt-4 text-white font-semibold tracking-wide animate-pulse">
            Loading your Pokédex...
          </p>
        </div>
      </div>
    )
  );
};
