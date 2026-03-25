import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { forgotPassword, resetPasswordWithOtp } from "../lib/operations/auth.api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!otpSent) {
      dispatch(forgotPassword(email)).then((ok) => {
        if (ok) {
          setOtpSent(true);
        }
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(resetPasswordWithOtp(email, otp, password)).then((ok) => {
      if (ok) {
        setOtpSent(false);
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        navigate("/signin");
      }
    });
  };

  return (
    <div className="bg-gradient-to-bl from-blue-900 to-[#1B1B1B] mx-auto w-full h-full flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#000814] to-[#0f0f0f] animate-glow text-blue-200 max-w-md w-full mx-auto p-8 py-12 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Reset Password</h2>
          <p className="text-sm mt-2">
            Enter your email and we'll send an OTP.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
          <div className="flex flex-col relative">
            <label className="text-sm font-semibold pointer-events-none" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 mt-1 border border-amber-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-sm"
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <>
              <div className="flex flex-col relative">
                <label className="text-sm font-semibold pointer-events-none" htmlFor="otp">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="6-digit code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="px-4 py-2 mt-1 border border-amber-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-sm"
                />
              </div>

              <div className="flex flex-col relative">
                <label className="text-sm font-semibold pointer-events-none" htmlFor="password">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 mt-1 border border-amber-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-sm"
                />
              </div>

              <div className="flex flex-col relative">
                <label className="text-sm font-semibold pointer-events-none" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-4 py-2 mt-1 border border-amber-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-sm"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-amber-600 mt-2 p-2 rounded-md font-semibold cursor-pointer text-white transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-700"
            }`}
          >
            {loading
              ? otpSent
                ? "Resetting..."
                : "Sending..."
              : otpSent
              ? "Reset Password"
              : "Send OTP"}
          </button>
        </form>

        <div>
          <Link
            to="/signin"
            className="text-amber-300 hover:text-amber-500 transition-colors duration-200"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
