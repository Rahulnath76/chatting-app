import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { signupData } from "../lib/data/data";
import { signup } from "../lib/operations/auth.api";
import type { AppDispatch, RootState } from "../store/store";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
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
    dispatch(signup(formData, navigate));
    setLoading(false);

    if (success) {
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="bg-gradient-to-bl from-blue-900 to-[#1B1B1B] mx-auto w-full h-full flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#000814] to-[#0f0f0f] animate-glow text-blue-200 max-w-md w-full mx-auto p-8 py-12 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Let’s Get You Talking 🚀</h2>
          <p className="text-sm mt-2">Sign up and jump into your first chat!</p>
        </div>

        <AuthForm
          loading={loading}
          formData={signupData}
          fields={signupData}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          type={"sign-up"}
        />

        <div>
          <span>Already have an account? </span>
          <Link
            to={"/signin"}
            className="text-amber-300 hover:text-amber-500 transition-colors duration-200 content-end-safe"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
