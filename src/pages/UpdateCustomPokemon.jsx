import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { updateCustomPokemonThunk } from "../redux/customPokemon/customPokemonThunks";
import { GlobalLoader } from "../components/GlobalLoader";
import { InputFields } from "../components/form/InputFields";
import { CheckboxGroup } from "../components/form/CheckboxGroup";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const UpdateCustomPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customPokemonList = useSelector((state) => state.customPokemon.list);
  const pokemonToEdit = customPokemonList.find(
    (pokemon) => String(pokemon.id) === id
  );

  const methods = useForm({
    defaultValues: {
      name: "",
      types: [],
      abilities: [],
      sprite: "",
      stats: [
        { name: "hp", value: 0 },
        { name: "attack", value: 0 },
        { name: "defense", value: 0 },
        { name: "specialAttack", value: 0 },
        { name: "specialDefense", value: 0 },
        { name: "speed", value: 0 },
      ],
      description: "",
    },
  });

  useEffect(() => {
    if (pokemonToEdit) {
      methods.reset({
        name: pokemonToEdit.name,
        types: pokemonToEdit.types || [],
        abilities: pokemonToEdit.abilities?.join(", ") || "",
        sprite: pokemonToEdit.sprite || "",
        stats: pokemonToEdit.stats || [],
        description: pokemonToEdit.description || "",
      });
    }
  }, [pokemonToEdit, methods]);

  const onSubmit = async (data) => {
    const pokemonToUpdate = {
      ...pokemonToEdit,
      name: data.name,
      types: data.types,
      sprite: data.sprite,
      abilities: data.abilities
        .split(",")
        .map((ability) => ability.trim())
        .filter((ability) => ability !== ""),
      stats: [
        { name: "hp", value: +data.hp || pokemonToEdit.stats[0].value },
        { name: "attack", value: +data.attack || pokemonToEdit.stats[1].value },
        {
          name: "defense",
          value: +data.defense || pokemonToEdit.stats[2].value,
        },
        {
          name: "specialAttack",
          value: +data.specialAttack || pokemonToEdit.stats[3].value,
        },
        {
          name: "specialDefense",
          value: +data.specialDefense || pokemonToEdit.stats[4].value,
        },
        { name: "speed", value: +data.speed || pokemonToEdit.stats[5].value },
      ],
      description: data.description || pokemonToEdit.description,
    };

    try {
      const res = await fetch(`http://localhost:3001/custom-pokemon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonToUpdate),
      });

      if (!res.ok) throw new Error("Failed to update Custom Pokémon");

      const updatedPokemon = await res.json();
      dispatch(updateCustomPokemonThunk(updatedPokemon));
      navigate(`/pokemon/${updatedPokemon.name}`);
    } catch (error) {
      console.error(`Error while updating Custom Pokémon: ${error.message}`);
    }
  };

  if (!pokemonToEdit) return <GlobalLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 py-25 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Update Custom Pokémon:{" "}
          <span className="text-red-500 capitalize">{pokemonToEdit.name}</span>
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-3"
          >
            <InputFields
              name="name"
              label="Name"
              placeholder={pokemonToEdit.name}
            />
            <CheckboxGroup name="types" label="Types" />
            <InputFields
              name="abilities"
              label="Abilities"
              placeholder={pokemonToEdit.abilities.join(", ")}
            />
            <InputFields
              name="hp"
              label="HP"
              type="number"
              placeholder={pokemonToEdit.stats[0].value}
            />
            <InputFields
              name="attack"
              label="Attack"
              type="number"
              placeholder={pokemonToEdit.stats[1].value}
            />
            <InputFields
              name="defense"
              label="Defense"
              type="number"
              placeholder={pokemonToEdit.stats[2].value}
            />
            <InputFields
              name="specialAttack"
              label="Special Attack"
              type="number"
              placeholder={pokemonToEdit.stats[3].value}
            />
            <InputFields
              name="specialDefense"
              label="Special Defense"
              type="number"
              placeholder={pokemonToEdit.stats[4].value}
            />
            <InputFields
              name="speed"
              label="Speed"
              type="number"
              placeholder={pokemonToEdit.stats[5].value}
            />
            <InputFields
              name="sprite"
              label="Sprite URL"
              placeholder={pokemonToEdit.sprite}
            />

            <InputFields
              name="description"
              label="Description"
              placeholder={pokemonToEdit.description}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              Update Pokémon
            </button>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
};
