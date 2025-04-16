import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import api from "../../lib/axios";
import { DisplayErrors } from "../../utils";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
      toast.success("Successfully signed in!");
    } catch (error) {
      DisplayErrors(error);
    }
  };
  return (
    <div className="min-h-[100vh] flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  {...register("email")}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  {...register("password")}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
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
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-emerald-600 hover:text-emerald-500"
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
            "url(https://images.unsplash.com/photo-1608546043931-6c9678ea9feb?q=80&w=1920)",
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
                <span className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></span>
                Exclusive member discounts
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></span>
                Priority booking for popular tours
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></span>
                Personalized travel recommendations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
