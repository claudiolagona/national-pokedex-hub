import { useFormContext, Controller } from "react-hook-form";
import { typeColors } from "../../utils/typeColors";

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
    <div className="my-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 mb-2"
      >
        {label}
        <span className="ml-2 text-xs font-normal text-gray-500">(max 2)</span>
      </label>

      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) =>
            value.length > 0 && value.length <= 2
              ? true
              : "Select up to 2 types",
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {POKEMON_TYPES.map((type) => {
                const isSelected = value.includes(type);
                const bgColor = typeColors[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleCheckboxChange(type)}
                    className={`capitalize px-4 py-2 rounded-lg font-medium text-white shadow-md transition-all duration-200 transform backdrop-blur-sm
                      ${bgColor} 
                      ${
                        isSelected
                          ? "ring-2 ring-teal-500 scale-105"
                          : "opacity-90 hover:opacity-100"
                      }
                      ${
                        value.length >= 2 && !isSelected
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-1`}
                    aria-pressed={isSelected}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          );
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name].message}</p>
      )}
    </div>
  );
};
