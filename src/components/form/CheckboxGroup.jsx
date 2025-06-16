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
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label} <span className="text-sm text-gray-500 ml-2">(max 2)</span>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {POKEMON_TYPES.map((type) => {
                const isSelected = value.includes(type);
                const bgColor = typeColors[type];
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleCheckboxChange(type)}
                    className={`capitalize px-3 py-2 rounded-lg text-white font-semibold shadow-md transition transform ${bgColor} ${
                      isSelected
                        ? "ring-2 ring-teal-500 scale-102"
                        : "opacity-80 hover:opacity-100"
                    } ${
                      value.length >= 2 && !isSelected
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
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
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
