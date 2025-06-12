import { useForm, FormProvider } from "react-hook-form";
import { InputFields } from "../components/form/InputFields";
import { useNavigate } from "react-router-dom";
import { createCustomPokemonApi } from "../api/jsonServer";
import toast from "react-hot-toast";
import { CheckboxGroup } from "../components/form/CheckboxGroup";

export const CreateCustomPokemon = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (customPokemon) => {
    try {
      const {
        name,
        types,
        abilities,
        sprite,
        description,
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      } = customPokemon;

      const formattedPokemon = {
        name,
        types,
        abilities: abilities.split(",").map((ability) => ability.trim()),
        sprite,
        description,
        stats: [
          { name: "hp", value: +hp },
          { name: "attack", value: +attack },
          { name: "defense", value: +defense },
          { name: "specialAttack", value: +specialAttack },
          { name: "specialDefense", value: +specialDefense },
          { name: "speed", value: +speed },
        ],
        generation: "custom",
      };

      await createCustomPokemonApi(formattedPokemon);
      toast.success("Custom Pokémon created successfully!");
      navigate("/pokemon");
    } catch {
      toast.error("Error while creating custom Pokémon");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mb-8">
      <h1 className="text-2xl font-bold mb-6">Create a Custom Pokémon</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputFields
            name="name"
            label="Name"
            placeholder="Enter Pokémon name"
            rules={{ required: "Name is required" }}
          />
          <CheckboxGroup name="types" label="Types (max 2)" />
          <InputFields
            name="abilities"
            label="Abilities (separated by commas)"
            placeholder="e.g. Overgrow, Blaze"
          />
          <InputFields
            name="hp"
            label="HP"
            type="number"
            rules={{ required: "HP is required" }}
          />
          <InputFields
            name="attack"
            label="Attack"
            type="number"
            rules={{ required: "Attack is required" }}
          />
          <InputFields
            name="defense"
            label="Defense"
            type="number"
            rules={{ required: "Defense is required" }}
          />
          <InputFields
            name="specialAttack"
            label="Special Attack"
            type="number"
            rules={{ required: "Special Attack is required" }}
          />
          <InputFields
            name="specialDefense"
            label="Special Defense"
            type="number"
            rules={{ required: "Special Defense is required" }}
          />
          <InputFields
            name="speed"
            label="Speed"
            type="number"
            rules={{ required: "Speed is required" }}
          />
          <InputFields
            name="sprite"
            label="Sprite"
            placeholder="https://..."
            rules={{ required: "Sprite is required" }}
          />
          <InputFields
            name="description"
            label="Description"
            placeholder="Short description"
          />

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
          >
            Save Pokémon
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
