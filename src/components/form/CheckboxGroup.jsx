import { useFormContext, Controller } from "react-hook-form";
import { InputFields } from "./InputFields";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const CheckboxGroup = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <p className="block font-medium mb-2"></p>

      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) =>
            (value.length > 0 && value.length <= 2) ||
            "Select 2 types at least",
        }}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => {
          const handleCheckboxChange = (checkedValue) => {
            if (value.includes(checkedValue)) {
              onChange(value.filter((val) => val !== checkedValue));
            } else if (value.length < 2) {
              onChange([...value, checkedValue]);
            }
          };

          return (
            <div className="mb-2">
              <label htmlFor={name} className="block font-medium mb-1">
                {label}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {POKEMON_TYPES.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      checked={value.includes(type)}
                      onChange={() => handleCheckboxChange(type)}
                      className="accent-blue-500"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
