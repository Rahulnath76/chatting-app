import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AuthForm = ({
  formData,
  fields,
  handleOnChange,
  handleSubmit,
  type,
  loading,
}) => {
  const [showPasswordMap, setShowPasswordMap] = useState<
    Record<string, boolean>
  >({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-2">
      {fields.map(
        ({ name, value, isPassword, type, placeholder, required }) => (
          <div key={name} className={`flex flex-col relative`}>
            <label className="text-sm font-semibold pointer-events-none" htmlFor={name}>
              {name}
            </label>
            <input
              type={
                isPassword
                  ? showPasswordMap[name]
                    ? "text"
                    : "password"
                  : type
              }
              name={value}
              placeholder={placeholder}
              required={required}
              value={formData[value]}
              onChange={handleOnChange}
              className="px-4 py-2 mt-1 border border-amber-400 bg- text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-sm"
            />
            {isPassword && (
              <span
                onClick={() => togglePasswordVisibility(name)}
                className="absolute right-4 top-8 cursor-pointer"
              >
                {showPasswordMap[name] ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            )}
          </div>
        )
      )}

      <button
        type="submit"
        disabled={loading}
        className={`bg-amber-600 mt-2 p-2 rounded-md font-semibold cursor-pointer text-white transition-all duration-200 ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-700"
        }`}
      >
        {loading
          ? type === "sign-up"
            ? "Signing up..."
            : "Signing in..."
          : type === "sign-up"
          ? "Sign Up"
          : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
