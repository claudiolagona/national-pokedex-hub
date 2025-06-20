import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonThunk } from "../redux/pokemon/pokemonThunks";
import { PokemonCard } from "../components/PokemonCard";
import { GlobalLoader } from "../components/GlobalLoader";
import { Pagination } from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "../components/Search";
import { FilterByType } from "../components/FilterByType";
import { FilterByGenerations } from "../components/FilterByGenerations";
import { loadCustomPokemon } from "../redux/customPokemon/customPokemonThunks";

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemonsPerPage = 20;

  const userFromState = useSelector((state) => state.user.currentUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentUser =
    userFromState && userFromState.role
      ? userFromState
      : {
          role: "guest",
        };
  const { pokemonList, authStatus, error } = useSelector(
    (state) => state.pokemon
  );
  const customPokemonList =
    useSelector((state) => state.customPokemon.list) || [];
  const customAuthStatus = useSelector(
    (state) => state.customPokemon.authStatus
  );
  const customError = useSelector((state) => state.customPokemon.error);
  const allPokemons = [...pokemonList, ...customPokemonList];
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const searchPokemon = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "";
  const selectedGen = searchParams.get("generation") || "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results);
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/generation");
        if (!res.ok) throw new Error("Failed to fetch generations");
        const data = await res.json();
        setGenerations(data.results);
      } catch (error) {
        console.error("Error fetching generations:", error);
      }
    };

    fetchGenerations();
  }, []);

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonThunk());
    }
  }, [dispatch, pokemonList]);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      dispatch(loadCustomPokemon());
    }
  }, [dispatch, currentUser]);

  const filteredPokemons = allPokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchPokemon.toLowerCase());
    const matchesType = !selectedType || pokemon.types?.includes(selectedType);
    const matchesGen = !selectedGen || pokemon.generation === selectedGen;
    const customVisibility =
      currentUser?.role === "admin" || pokemon.generation !== "custom";

    return matchesSearch && matchesType && matchesGen && customVisibility;
  });

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  if (authStatus === "loading" || customAuthStatus === "loading") {
    return <GlobalLoader />;
  }

  if (authStatus === "failed" || customAuthStatus === "failed") {
    return (
      <p className="text-red-500 text-center">
        {error || customError || "Error while charging Pokémon."}
      </p>
    );
  }

  const handlePageChange = (page) => {
    setSearchParams({
      search: searchPokemon,
      type: selectedType,
      generation: selectedGen,
      page: page.toString(),
    });
  };

  const handleSearchChange = (pokemon) => {
    setSearchParams({
      search: pokemon,
      type: selectedType,
      generation: selectedGen,
      page: "1",
    });
  };

  const handleTypeChange = (type) => {
    setSearchParams({
      search: searchPokemon,
      type: type,
      generation: selectedGen,
      page: "1",
    });
  };

  const handleChangeGen = (gen) => {
    setSearchParams({
      search: searchPokemon,
      type: selectedType,
      generation: gen,
      page: "1",
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-20 py-25 pb-10 bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      <div className="w-full flex flex-row items-baseline justify-center gap-2 flex-wrap mb-8">
        <Search
          searchPokemon={searchPokemon}
          handleChange={handleSearchChange}
        />
        <FilterByType
          selectedType={selectedType}
          changeType={handleTypeChange}
          allTypes={types}
        />
        <FilterByGenerations
          selectedGen={selectedGen}
          changeGen={handleChangeGen}
          allGenerations={generations}
          currentUser={currentUser}
        />
      </div>

      <p className="text-center text-sm text-gray-600 mb-4">
        {filteredPokemons.length} Pokémons found
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage}-${searchPokemon}-${selectedType}-${selectedGen}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
        >
          {currentPokemons.length === 0 && (
            <p className="col-span-full text-center text-lg font-semibold text-gray-500">
              No Pokémons found
            </p>
          )}
          {currentPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};
