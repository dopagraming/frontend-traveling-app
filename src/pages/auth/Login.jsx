import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Compass } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/axios";
import { DisplayErrors } from "../../utils";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
  setAuthChecked,
} from "../../rtk/features/userSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data.data));
      dispatch(setAuthChecked(res.data.data));
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch(loginFailure(errorMessage));
      DisplayErrors(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-soft-sand">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center mt-10">
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-natural-blue rounded-lg">
                <Compass className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-deep-charcoal">
              Welcome back
            </h2>
            <p className="mt-2 text-cool-gray">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-deep-charcoal">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
                <input
                  type="email"
                  {...register("email")}
                  className="pl-10 block w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-charcoal">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pl-10 pr-10 block w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sea-blue hover:text-sea-blue-dark"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-sea-blue focus:ring-sea-blue border-sea-blue/30 rounded"
                />
                <label className="ml-2 block text-sm text-deep-charcoal">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-sea-blue hover:text-sea-blue-dark"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-deep-charcoal bg-sunny-yellow hover:bg-sunny-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunny-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-cool-gray">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-sea-blue hover:text-sea-blue-dark"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920)",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Explore Ancient Wonders</h2>
            <p className="text-lg mb-8">
              Sign in to access exclusive deals and personalized travel
              recommendations for your Egyptian adventure.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Exclusive member discounts
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Priority booking for popular tours
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Personalized travel recommendations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
