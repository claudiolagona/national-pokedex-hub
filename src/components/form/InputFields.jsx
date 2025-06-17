import { useFormContext } from "react-hook-form";

export const InputFields = ({
  name,
  label,
  type = "text",
  placeholder,
  rules = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className="my-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold mb-2 text-gray-800"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...register(name, rules)}
        className={`w-full px-4 py-3 rounded-md bg-white/30 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/50 transition-all duration-300 shadow-inner backdrop-blur-md
          ${hasError ? "ring-2 ring-red-500 focus:ring-red-500" : ""}
        `}
      />
      {hasError && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
