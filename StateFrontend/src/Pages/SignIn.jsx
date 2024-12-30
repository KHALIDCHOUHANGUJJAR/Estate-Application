/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "../api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SingIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("token");

  const [istoken, setToken] = useState(token);
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await postReq("/auth/login", formData);
      const { token } = response?.data;
      localStorage.setItem("token", token);
      if (token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (istoken) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="p-3 max-w-lg mx-auto shadow-xl">
      <h1 className="text-3xl text-center font-bold my-7">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loging in..." : "Login"}{" "}
        </button>

        <button
          type="button"
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80"
        >
          Continue with Google
        </button>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex items-center sm:text-xl text-sm gap-2 mt-5">
          <div>Don't have an account?</div>
          <Link to="/SignUp">
            <span className="text-blue-700  font-bold">Sign Up</span>
          </Link>
        </div>
          <span className="text-red-800 text-xl font-bold text-center">
            OR{" "}
          </span>
          <button className="font-bold sm:uppercase text-sm lowercase">
            {" "}
            Forgot Password
          </button>
      </div>
    </div>
  );
}

export default SingIn;
