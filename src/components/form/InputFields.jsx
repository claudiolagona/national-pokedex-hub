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

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full p-2 border rounded ${
          errors[name] ? "border-red-500" : "border-grey-300"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
