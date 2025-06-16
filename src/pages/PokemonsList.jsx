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
  /* const { pokemonList, authStatus, error } = useSelector(
    (state) => state.pokemon
  ); */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pokemonList = [
    {
      id: 1,
      name: "bulbasaur",
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        back_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
        back_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
      },
      cries: null,
      moves: [
        "razor-wind",
        "swords-dance",
        "cut",
        "bind",
        "vine-whip",
        "headbutt",
        "tackle",
        "body-slam",
        "take-down",
        "double-edge",
        "growl",
        "strength",
        "mega-drain",
        "leech-seed",
        "growth",
        "razor-leaf",
        "solar-beam",
        "poison-powder",
        "sleep-powder",
        "petal-dance",
        "string-shot",
        "toxic",
        "rage",
        "mimic",
        "double-team",
        "defense-curl",
        "reflect",
        "bide",
        "rest",
        "rock-slide",
        "substitute",
        "snore",
        "curse",
        "protect",
        "sludge-bomb",
        "mud-slap",
        "giga-drain",
        "endure",
        "rollout",
        "false-swipe",
        "swagger",
        "fury-cutter",
        "attract",
        "sleep-talk",
        "return",
        "frustration",
        "safeguard",
        "secret-power",
        "synthesis",
        "hidden-power",
        "sunny-day",
        "rock-smash",
        "facade",
        "nature-power",
        "weather-ball",
        "bullet-seed",
        "magical-leaf",
        "natural-gift",
        "pick-up",
        "fling",
        "snatch",
        "ingrain",
        "tickle",
        "grass-knot",
        "round",
        "echoed-voice",
        "grass-pledge",
        "work-up",
        "confide",
      ],
      stats: [
        { stat: { name: "hp" }, base_stat: 45 },
        { stat: { name: "attack" }, base_stat: 49 },
        { stat: { name: "defense" }, base_stat: 49 },
        { stat: { name: "special-attack" }, base_stat: 65 },
        { stat: { name: "special-defense" }, base_stat: 65 },
        { stat: { name: "speed" }, base_stat: 45 },
      ],
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      height: 7,
      weight: 69,
      generation: "custom",
      evolutions: [],
    },
  ];

  const customPokemonList =
    useSelector((state) => state.customPokemon.list) || [];
  /* const customAuthStatus = useSelector(
    (state) => state.customPokemon.authStatus
  ); */
  /* const customError = useSelector((state) => state.customPokemon.error); */
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
    if (!pokemonList.length > 0) {
      dispatch(fetchPokemonThunk());
      if (currentUser.role === "admin") {
        dispatch(loadCustomPokemon());
      }
    }
  }, [dispatch, pokemonList, currentUser]);

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

  /* if (authStatus === "loading" || customAuthStatus === "loading") {
    return <GlobalLoader />;
  } */

  /* if (authStatus === "failed" || customAuthStatus === "failed") {
    return (
      <p className="text-red-500 text-center">
        {error || customError || "Error while charging Pokémon."}
      </p>
    );
  } */

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
    <div className="px-4 sm:px-6 lg:px-20 py-6 mb-10">
      <div className="flex flex-col lg:flex-row justify-center items-baseline gap-4 flex-wrap mb-6">
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

      <p className="px-4 sm:px-6 lg:px-20 text-left text-sm text-gray-700 mb-4">
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
            <p className="col-span-full text-center text-gray-500 text-lg font-semibold">
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
