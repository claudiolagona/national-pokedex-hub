import { useEffect, useState, useMemo } from "react";
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

  const currentUser = useMemo(() => {
    return userFromState && userFromState.role
      ? userFromState
      : {
          role: "guest",
        };
  }, [userFromState]);
  const { pokemonList, authStatus, error } = useSelector(
    (state) => state.pokemon
  );
  const customPokemonListRaw = useSelector((state) => state.customPokemon.list);
  const customAuthStatus = useSelector(
    (state) => state.customPokemon.authStatus
  );
  const customError = useSelector((state) => state.customPokemon.error);
  const allPokemons = useMemo(() => {
    const customPokemonList = customPokemonListRaw || [];
    return [...pokemonList, ...customPokemonList];
  }, [customPokemonListRaw, pokemonList]);
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingGenerations, setIsLoadingGenerations] = useState(true);

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
      try {
        setIsLoadingTypes(true);
        const res = await fetch("https://pokeapi.co/api/v2/type");
        if (!res.ok) throw new Error("Failed to fetch types");
        const data = await res.json();
        setTypes(data.results);
      } catch (error) {
        console.error(error);
        setTypes([]);
      } finally {
        setIsLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        setIsLoadingGenerations(true);
        const res = await fetch("https://pokeapi.co/api/v2/generation");
        if (!res.ok) throw new Error("Failed to fetch generations");
        const data = await res.json();
        setGenerations(data.results);
      } catch (error) {
        console.error("Error fetching generations:", error);
        setGenerations([]);
      } finally {
        setIsLoadingGenerations(false);
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

  const filteredPokemons = useMemo(() => {
    return allPokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchPokemon.toLowerCase());
      const matchesType =
        !selectedType || pokemon.types?.includes(selectedType);
      const matchesGen = !selectedGen || pokemon.generation === selectedGen;
      const customVisibility =
        currentUser?.role === "admin" || pokemon.generation !== "custom";

      return matchesSearch && matchesType && matchesGen && customVisibility;
    });
  }, [
    allPokemons,
    searchPokemon,
    selectedType,
    selectedGen,
    currentUser?.role,
  ]);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  if (
    authStatus === "loading" ||
    customAuthStatus === "loading" ||
    isLoadingGenerations ||
    isLoadingTypes
  ) {
    return <GlobalLoader />;
  }

  if (authStatus === "failed" || customAuthStatus === "failed") {
    return (
      <p className="text-red-500 text-center">
        {error || customError || "Error while loading Pokémon."}
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      )}
    </div>
  );
};
