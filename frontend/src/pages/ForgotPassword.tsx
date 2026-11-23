import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { forgotPassword, resetPasswordWithOtp } from "../lib/operations/auth.api";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import { ArrowLeft, Loader2, Mail, KeyRound, Lock, Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <AuthLayout
      title="Reset Password"
      subtitle={
        otpSent
          ? `Enter the OTP sent to ${email}`
          : "Enter your email address to receive a recovery code"
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 group">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-slate-300"
          >
            Email Address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none">
              <Mail className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                otpSent ? "opacity-60 cursor-not-allowed bg-slate-900/60" : ""
              }`}
            />
          </div>
        </div>

        {otpSent && (
          <>
            <div className="flex flex-col gap-1.5 group">
              <label
                htmlFor="otp"
                className="text-xs font-semibold text-slate-300"
              >
                Verification OTP
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none">
                  <KeyRound className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="6-digit code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-100 placeholder:text-slate-500 tracking-wider focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 group">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-300"
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none">
                  <Lock className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 group">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-slate-300"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none">
                  <Lock className="size-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-md shadow-blue-900/20 transition-all duration-150 cursor-pointer ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          <span>{otpSent ? "Reset Password" : "Send Recovery Code"}</span>
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-800 text-center">
        <Link
          to="/signin"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
