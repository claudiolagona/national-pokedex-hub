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
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <PacmanLoader size={50} color="#ffcb05" />
      </div>
    )
  );
};
