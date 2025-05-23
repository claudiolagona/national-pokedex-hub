import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchPokemonDetail,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "../api/pokeapi";
import { GlobalLoader } from "../components/GlobalLoader";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { typeColors } from "../utils/typeColors";
import { Tab } from "@headlessui/react";
import { parseEvolutionChain } from "../utils/parseEvolutions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  addFavorites,
  removeFavorites,
} from "../redux/favorites/favoritesActions";
import { useDispatch, useSelector } from "react-redux";

export const PokemonView = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = favorites.includes(pokemon);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorites(pokemon));
    } else {
      dispatch(addFavorites(pokemon));
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const pokemonRes = await fetchPokemonDetail(name);
        const speciesRes = await fetchPokemonSpecies(pokemonRes.species.url);
        const evolutionChain = await fetchEvolutionChain(
          speciesRes.evolution_chain.url
        );

        setPokemon({
          name: pokemonRes.name,
          id: pokemonRes.id,
          sprites: pokemonRes.sprites,
          types: pokemonRes.types,
          cries: pokemonRes.cries.latest,
          moves: pokemonRes.moves.slice(0, 20),
          stats: pokemonRes.stats,
          height: pokemonRes.height,
          weight: pokemonRes.weight,
          generation: speciesRes.generation.name,
          evolutions: parseEvolutionChain(evolutionChain),
        });
      } catch (error) {
        console.error(`Error while fetching ${name} - ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  if (isLoading) return <GlobalLoader />;

  if (!pokemon) {
    return (
      <div className="text-center text-red-600 mt-10">Pokémon not found</div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full max-w-md mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {[
              { label: "Front", src: pokemon.sprites.front_default },
              { label: "Shiny", src: pokemon.sprites.front_shiny },
              { label: "Back", src: pokemon.sprites.back_default },
              { label: "Back Shiny", src: pokemon.sprites.back_shiny },
            ]
              .filter((sprite) => sprite.src)
              .map((sprite) => (
                <SwiperSlide key={sprite.label}>
                  <div className="flex flex-col items-center pb-6">
                    <img
                      src={sprite.src}
                      alt={sprite.label}
                      className="w-24 mx-auto"
                    />
                    <p className="mt-2 text-sm">{sprite.label}</p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div>
          <h1 className="text-3xl capitalize font-bold mb-4">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`text-md px-4 py-2 mb-4 rounded capitalize font-bold ${
                  typeColors[type.type.name] || "bg-gray-200"
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <audio
            src={pokemon.cries}
            type="audio/ogg"
            className="w-90 h-9"
            controls
          />
          {isLoggedIn ? (
            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded cursor-pointer mt-4 transition ${
                isFavorite ? "bg-red-400" : "bg-gray-300"
              }`}
            >
              {isFavorite ? "★ Remove" : "☆ Add"}
            </button>
          ) : (
            <p className="mt-4 text-xs text-gray-500 italic">
              Log if you want to save your favorites Pokémon
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <Tab.Group>
          <Tab.List className="flex space-x-2 border-b mb-4">
            {["Stats", "Moves", "Evolution Chain"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "px-4 py-2 text-sm font-medium cursor-pointer outline-none",
                    selected
                      ? "underline font-semibold text-grey-800"
                      : "text-gray-500"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <h2 className="text-2xl font-semibold mb-4">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="w-full flex flex-col justify-between items-left"
                  >
                    <div className="w-full flex justify-between">
                      <span className="capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="capitalize">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-4 relative">
                      <div
                        className="absolute h-4 rounded bg-green-500"
                        style={{ width: `${stat.base_stat / 1.5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <h2 className="text-2xl font-semibold mb-4">Moves</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {pokemon.moves.map((move) => (
                  <div
                    key={move.move.name}
                    className="capitalize px-4 py-2 bg-gray-100 rounded shadow-sm"
                  >
                    {move.move.name.replace("-", " ")}
                  </div>
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <h2 className="text-2xl font-semibold mb-4">Evolution Chain</h2>
              <div className="flex gap-6 items-center flex-wrap">
                {pokemon.evolutions.map((evo) => (
                  <div
                    key={evo.id}
                    className="flex flex-col items-center cursor-pointer hover:scale-115 transition"
                    onClick={() => navigate(`/pokemon/${evo.name}`)}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                      alt={evo.name}
                      className="w-20"
                      onError={(e) => {
                        e.target.src =
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
                      }}
                    />
                    <span className="capitalize text-sm mt-2">{evo.name}</span>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </motion.div>
  );
};
