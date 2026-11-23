import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { loginData } from "../lib/data/data";
import { login } from "../lib/operations/auth.api";
import type { RootState } from "../store/store";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData, navigate));

    if (success) {
      setFormData({
        identifier: "",
        password: "",
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue chatting"
    >
      <AuthForm
        loading={loading}
        formData={formData}
        fields={loginData}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        type="sign-in"
      />

      <div className="mt-3.5 text-right">
        <Link
          to="/forgot-password"
          className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
        <span>Don't have an account? </span>
        <Link
          to="/signup"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
