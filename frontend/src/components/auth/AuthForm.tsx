import React, { useState } from "react";
import { Eye, EyeOff, User, AtSign, Mail, Lock, Loader2 } from "lucide-react";

type AuthField = {
  name: string;
  value: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  isPassword?: boolean;
};

interface FormType {
  formData: Record<string, string>;
  fields: AuthField[];
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  type: "sign-in" | "sign-up";
  loading: boolean;
}

const getFieldIcon = (value: string, isPassword?: boolean) => {
  if (isPassword) return <Lock className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />;
  if (value.toLowerCase().includes("email") || value === "identifier") {
    return <Mail className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />;
  }
  if (value.toLowerCase().includes("username")) {
    return <AtSign className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />;
  }
  return <User className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />;
};

const AuthForm = ({
  formData,
  fields,
  handleOnChange,
  handleSubmit,
  type,
  loading,
}: FormType) => {
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map(({ name, value, isPassword, type: fieldType, placeholder, required }) => (
        <div key={name} className="flex flex-col gap-1.5 group">
          <label
            htmlFor={value}
            className="text-xs font-semibold text-slate-300"
          >
            {name}
          </label>
          <div className="relative flex items-center">
            {/* Left Icon */}
            <div className="absolute left-3.5 flex items-center pointer-events-none">
              {getFieldIcon(value, isPassword)}
            </div>

            {/* Input Field */}
            <input
              id={value}
              type={
                isPassword
                  ? showPasswordMap[name]
                    ? "text"
                    : "password"
                  : fieldType
              }
              name={value}
              placeholder={placeholder}
              required={required}
              value={formData[value] || ""}
              onChange={handleOnChange}
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-150"
            />

            {/* Password Toggle Button */}
            {isPassword && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(name)}
                className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                aria-label={showPasswordMap[name] ? "Hide password" : "Show password"}
              >
                {showPasswordMap[name] ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-md shadow-blue-900/20 transition-all duration-150 cursor-pointer ${
          loading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        <span>
          {loading
            ? type === "sign-up"
              ? "Creating account..."
              : "Signing in..."
            : type === "sign-up"
            ? "Create Account"
            : "Sign In"}
        </span>
      </button>
    </form>
  );
};

export default AuthForm;
