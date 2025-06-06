import toast from "react-hot-toast";
import { setLoggedin, setSuccess } from "../../store/slices/authSlice";
import { setUserData } from "../../store/slices/profileSlice";
import { auth } from "../api";
import { apiConnector } from "../apiConnector";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import type { AuthResponse } from "../types";

const { SIGNUP_API, LOGIN_API, LOGOUT_API } = auth;

interface IUser {
  name?: string;
  username?: string;
  identifier?: string;
  email?: string;
  password: string;
}

export const signup = (
  { name, email, password, username }: IUser,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector<AuthResponse>("POST", SIGNUP_API, {
        fullName: name,
        username,
        email,
        password,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Signup failed");
      dispatch(setSuccess(true));
      toast.success("Signup successful!");
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      dispatch(setSuccess(false));
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        toast.error(errors[0]);
      } else {
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  };
};

export const login = (
  { identifier, password }: IUser,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector<AuthResponse>("POST", LOGIN_API, {
        identifier,
        password,
      });
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(true));
      dispatch(setUserData({ user: { ...response.data.user } }));
      dispatch(setSuccess(true));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedin", "true");
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      // console.log("LOGIN API ERROR............", error);
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        toast.error(errors[0]);
      } else {
        toast.error(error.response?.data?.message || "Signin failed. Please try again.");
      }
    }
  };
};

export const logout = (navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector<AuthResponse>("POST", LOGOUT_API);
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setLoggedin(false));

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedin");
      dispatch(setUserData({ user: null }));
      toast.success("Logout successful!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };
};
