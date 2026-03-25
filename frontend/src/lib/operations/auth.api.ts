import toast from "react-hot-toast";
import { setLoading as setAuthLoading, setSuccess } from "../../store/slices/authSlice";
import {
  setFriends,
  setLoading as setProfileLoading,
  setUserData,
} from "../../store/slices/profileSlice";
import { clearFriends, saveFriends } from "../storage/friendsStorage";
import { auth } from "../api";
import { apiConnector } from "../apiConnector";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import type { AuthResponse } from "../types";

const {
  SIGNUP_API,
  LOGIN_API,
  LOGOUT_API,
  ME_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_OTP_API,
} = auth;

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
    dispatch(setAuthLoading(true));
    try {
      const response = await apiConnector<AuthResponse>("POST", SIGNUP_API, {
        fullName: name,
        username,
        email,
        password,
      });
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
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
};

export const login = (
  { identifier, password }: IUser,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await apiConnector<AuthResponse>("POST", LOGIN_API, {
        identifier,
        password,
      });
      if (!response.data.success) throw new Error(response.data.message);

      dispatch(setUserData(response.data.user));
      dispatch(setFriends(response.data.user?.friends));
      saveFriends(response.data.user?.friends ?? []);
      dispatch(setSuccess(true));
      dispatch({ type: "socket/connect" });
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
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
};

export const logout = (navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector<AuthResponse>("GET", LOGOUT_API);
      if (!response.data.success) throw new Error(response.data.message);

      localStorage.removeItem("isLoggedin");
      clearFriends();
      dispatch({ type: "socket/disconnect" });
      dispatch(setUserData(null));
      toast.success("Logout successful!");
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };
};


export const fetchMe = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setProfileLoading(true));
    try {
      const response = await apiConnector<AuthResponse>("GET", ME_API);
      if (!response.data.success) throw new Error(response.data.message);
      console.log("called");

      dispatch(setUserData(response.data.user));

      dispatch(setFriends(response.data.user?.friends));
      saveFriends(response.data.user?.friends ?? []);
      dispatch({ type: "socket/connect" });

    } catch (error: any) {
      dispatch(setUserData(null));
      localStorage.removeItem("isLoggedin");
      console.log(error);
    }finally{
      dispatch(setProfileLoading(false));
    }
  };
};

export const forgotPassword = (email: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await apiConnector<AuthResponse>(
        "POST",
        FORGOT_PASSWORD_API,
        { email }
      );
      if (!response.data.success) throw new Error(response.data.message);
      toast.success(response.data.message || "OTP sent!");
      return true;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        toast.error(errors[0]);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Unable to process request. Please try again."
        );
      }
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
};

export const resetPasswordWithOtp = (
  email: string,
  otp: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await apiConnector<AuthResponse>(
        "POST",
        RESET_PASSWORD_OTP_API,
        { email, otp, password }
      );
      if (!response.data.success) throw new Error(response.data.message);
      toast.success(response.data.message || "Password reset successful!");
      return true;
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        toast.error(errors[0]);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Unable to reset password. Please try again."
        );
      }
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
};
