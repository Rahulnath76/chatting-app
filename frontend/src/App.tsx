import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./pages/MyProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { fetchMe } from "./lib/operations/auth.api";
import Loading from "./components/ui/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.profile);
  const isLoggedIn = localStorage.getItem("isLoggedin") === "true";

  // always try to fetch logged in user on mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMe());
    }
  }, [dispatch, isLoggedIn]);

  if (loading) {
    return <Loading fullScreen message="Fetching your profile..." />;
  }

  return (
    <div className="w-full h-screen">
      <Routes>
        {/* Private Route */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/profile"
          element={user ? <MyProfile /> : <Navigate to="/signin" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" replace /> : <ForgotPassword />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
