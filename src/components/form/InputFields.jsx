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
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1"
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
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ${
          hasError
            ? "border-red-500 focus:ring-1 focus:ring-red-400"
            : "border-grey-300 focus:ring-1 focus:ring-blue-400"
        }`}
      />
      {hasError && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
