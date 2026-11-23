import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { signupData } from "../lib/data/data";
import { signup } from "../lib/operations/auth.api";
import type { AppDispatch, RootState } from "../store/store";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading } = useSelector((state: RootState) => state.auth);
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
    dispatch(signup(formData, navigate));

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
    <AuthLayout
      title="Create Account"
      subtitle="Join to start connecting and chatting with friends"
    >
      <AuthForm
        loading={loading}
        formData={formData}
        fields={signupData}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        type="sign-up"
      />

      <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
        <span>Already have an account? </span>
        <Link
          to="/signin"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
