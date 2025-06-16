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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-red-100 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Create a Custom Pokémon
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputFields
              name="name"
              label="Name"
              placeholder="Enter Pokémon name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Name must contain only letters",
                },
              }}
            />
            <CheckboxGroup name="types" label="Types" />
            <InputFields
              name="abilities"
              label="Abilities (separated by commas)"
              placeholder="e.g. Overgrow, Blaze"
              rules={{
                validate: (value) =>
                  value.split(",").length <= 3 || "Max 3 abilities allowed",
              }}
            />
            <InputFields
              name="hp"
              label="HP"
              type="number"
              rules={{
                required: "HP is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="attack"
              label="Attack"
              type="number"
              rules={{
                required: "Attack is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="defense"
              label="Defense"
              type="number"
              rules={{
                required: "Defense is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="specialAttack"
              label="Special Attack"
              type="number"
              rules={{
                required: "Special Attack is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="specialDefense"
              label="Special Defense"
              type="number"
              rules={{
                required: "Special Defense is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="speed"
              label="Speed"
              type="number"
              rules={{
                required: "Speed is required",
                min: { value: 1, message: "Must be at least 1" },
                max: {
                  value: 255,
                  message: "Must be less than or equal to 255",
                },
              }}
            />
            <InputFields
              name="sprite"
              label="Sprite"
              placeholder="https://..."
              rules={{
                required: "Sprite is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                  message: "Must be a valid image URL (png/jpg/svg)",
                },
              }}
            />
            <InputFields
              name="description"
              label="Description"
              placeholder="Short description"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md cursor-pointer hover:from-blue-700 hover:to-indigo-700"
            >
              Save Pokémon
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
