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
import { useSelector, useDispatch } from "react-redux";
import { FavoriteButton } from "../components/FavoriteButton";
import { transformCustomPokemon } from "../utils/transformCustomPokemon";
import { deleteCustomPokemonThunk } from "../redux/customPokemon/customPokemonThunks";
import { ConfirmModal } from "../components/ConfirmModal";
import { Link } from "react-router-dom";

export const PokemonView = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const { list: customPokemonList, authStatus: authCustomStatus } = useSelector(
    (state) => state.customPokemon
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleDeleteCustom = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId == null) return;
    try {
      await fetch(`http://localhost:3001/pokemon/${selectedId}`, {
        method: "DELETE",
      });

      dispatch(deleteCustomPokemonThunk(selectedId));
      setModalOpen(false);
      setSelectedId(null);
      navigate("/pokemon");
    } catch (error) {
      console.error(
        `Error while deleting Custom Pokémon ${selectedId} - ${error.message}`
      );
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    if (authCustomStatus !== "succeeded") return;

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const customPokemon = customPokemonList.find(
          (pokemon) =>
            pokemon.name && pokemon.name.toLowerCase() === name.toLowerCase()
        );

        if (customPokemon) {
          setPokemon(transformCustomPokemon(customPokemon));
        } else {
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
            evolution_chain: parseEvolutionChain(evolutionChain),
          });
        }
      } catch (error) {
        console.error(`Error while fetching ${name} - ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [name, customPokemonList, authCustomStatus]);

  if (isLoading) return <GlobalLoader />;

  if (!pokemon) {
    return (
      <div className="text-center text-red-600 mt-10">Pokémon not found</div>
    );
  }

  if (currentUser.role !== "admin" && pokemon.generation === "custom") return;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        onClick={() => navigate("/pokemon")}
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

        <div className="flex flex-col">
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
          {pokemon.cries && (
            <audio
              src={pokemon.cries}
              type="audio/ogg"
              className="w-90 h-9"
              controls
            />
          )}
          {isLoggedIn ? (
            <FavoriteButton key={pokemon.name} pokemon={pokemon} />
          ) : (
            <p className="mt-4 text-xs text-gray-500 italic">
              Log if you want to save your favorites Pokémon
            </p>
          )}
          {pokemon.generation === "custom" && (
            <button
              className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-700 text-white text-center rounded mt-2"
              onClick={() => handleDeleteCustom(pokemon.id)}
            >
              Delete Custom Pokémon
            </button>
          )}
          <ConfirmModal
            isOpen={modalOpen}
            message={`Are you sure to delete Custom Pokémon #${pokemon.id}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
          {pokemon.generation === "custom" && (
            <Link
              to={`/update/${pokemon.id}`}
              className="px-4 py-2 cursor-pointer text-center bg-blue-500 hover:bg-blue-700 text-white rounded mt-2"
            >
              Update Custom Pokémon
            </Link>
          )}
        </div>
      </div>

      <div className="mt-10">
        <Tab.Group>
          <Tab.List className="flex space-x-2 border-b mb-4">
            {[
              "Stats",
              pokemon.generation !== "custom" && "Moves",
              pokemon.generation !== "custom" && "Evolution Chain",
            ].map((tab) => (
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

            {pokemon.moves && (
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
            )}

            {pokemon.evolution_chain && (
              <Tab.Panel>
                <h2 className="text-2xl font-semibold mb-4">Evolution Chain</h2>
                <div className="flex gap-6 items-center flex-wrap">
                  {pokemon.evolution_chain.map((evo) => (
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
                      <span className="capitalize text-sm mt-2">
                        {evo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </motion.div>
  );
};
