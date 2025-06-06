import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import AuthForm from "../components/auth/AuthForm";
import { loginData } from "../lib/data/data";
import { login } from "../lib/operations/auth.api";
import type { RootState } from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    console.log(formData);
    dispatch(login(formData, navigate));

    if(success){
      setFormData({
        identifier: "",
        password: ""
      })
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-bl from-blue-900 to-[#1B1B1B] mx-auto w-full h-full flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#000814] to-[#0f0f0f] animate-glow text-blue-200 max-w-md w-full mx-auto p-8 py-12 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Welcome Back 👋</h2>
          <p className="text-sm mt-2">Let's get you back in the conversation</p>
        </div>

        <AuthForm
          loading={loading}
          formData={formData}
          fields={loginData}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          type={"sign-in"}
        />

        <div>
          <span>Don't have an account? </span>
          <Link to={"/signup"} className="text-amber-300 hover:text-amber-500 transition-colors duration-200 content-end-safe">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
