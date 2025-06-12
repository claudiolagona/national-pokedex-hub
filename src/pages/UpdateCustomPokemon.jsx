import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { updateCustomPokemonThunk } from "../redux/customPokemon/customPokemonThunks";
import { GlobalLoader } from "../components/GlobalLoader";
import { InputFields } from "../components/form/InputFields";
import { CheckboxGroup } from "../components/form/CheckboxGroup";

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
        abilities: pokemonToEdit.abilities || [],
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
      abilities: data.abilities,
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2-xl font-bold mb-4">
        Update Custom Pokémon:{" "}
        <span className="text-red-500">{pokemonToEdit.name}</span>
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputFields
            name="name"
            label="Name"
            placeholder={pokemonToEdit.name}
          />
          <CheckboxGroup name="types" label="Types (max 2)" />
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
            className="mt-4 mb-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Update Pokémon
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
