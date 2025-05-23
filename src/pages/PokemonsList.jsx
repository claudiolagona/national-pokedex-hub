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

export const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemonsPerPage = 21;

  const { pokemonList, authStatus, error } = useSelector(
    (state) => state.pokemon
  );
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
    dispatch(fetchPokemonThunk());
  }, [dispatch]);

  const filteredPokemons = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchPokemon.toLowerCase());
    const matchesType = !selectedType || pokemon.types?.includes(selectedType);
    const matchesGen = !selectedGen || pokemon.generation === selectedGen;

    return matchesSearch && matchesType && matchesGen;
  });

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  if (authStatus === "loading") {
    return <GlobalLoader />;
  }

  if (authStatus === "failed") {
    return (
      <p className="text-red-500 text-center">
        {error || "Errore nel caricamento dei Pokemon."}
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
    <div className="px-4 py-6 mb-10">
      <div className="flex flex-col md:flex-row justify-center items-baseline gap-4 mb-6 px-35">
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
        />
      </div>

      <p className="text-left text-sm text-gray-700 px-90">
        {filteredPokemons.length} Pokémons found
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage}-${searchPokemon}-${selectedType}-${selectedGen}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-row flex-wrap justify-center gap-8 py-10 px-40"
        >
          {currentPokemons.length === 0 && (
            <p className="text-center text-gray-500 text-lg font-semibold">
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
