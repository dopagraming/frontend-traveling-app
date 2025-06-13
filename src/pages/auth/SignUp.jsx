import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, Compass } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/axios";
import { DisplayErrors } from "../../utils";
import {
  signupStart,
  signupSuccess,
  signupFailure,
  clearError,
} from "../../rtk/features/userSlice";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
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
    dispatch(signupStart());
    try {
      const res = await api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      localStorage.setItem("token", res.data.token);
      dispatch(signupSuccess(res.data.user));
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(signupFailure(errorMessage));
      DisplayErrors(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-soft-sand ">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center mt-10">
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-natural-blue rounded-lg">
                <Compass className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-deep-charcoal">
              Create an account
            </h2>
            <p className="mt-2 text-cool-gray">
              Join us for amazing travel experiences
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-deep-charcoal">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
                <input
                  type="text"
                  {...register("name")}
                  className="pl-10 block w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            <div>
              <label className="block text-sm font-medium text-deep-charcoal">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sea-blue h-5 w-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("passwordConfirm")}
                  className="pl-10 pr-10 block w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue bg-soft-sand text-deep-charcoal"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sea-blue hover:text-sea-blue-dark"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-sea-blue focus:ring-sea-blue border-sea-blue/30 rounded"
              />
              <label className="ml-2 block text-sm text-deep-charcoal">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-sea-blue hover:text-sea-blue-dark"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-sea-blue hover:text-sea-blue-dark"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-deep-charcoal bg-sunny-yellow hover:bg-sunny-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunny-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-cool-gray">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sea-blue hover:text-sea-blue-dark"
              >
                Sign in
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
            <h2 className="text-4xl font-bold mb-6">Start Your Journey</h2>
            <p className="text-lg mb-8">
              Create an account to unlock a world of exclusive benefits and
              start planning your perfect Egyptian adventure.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Save your favorite trips
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Get early access to special offers
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-sunny-yellow rounded-full mr-3"></span>
                Manage your bookings easily
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
