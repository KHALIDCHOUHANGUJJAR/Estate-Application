/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "../api";
import { useEffect, useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [istoken, setToken] = useState(token);
  const [loading, isloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    isloading(true);
    try {
      const response = await postReq("/auth/signup", formData);
      isloading(false);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      isloading(false);
    }
  };
  useEffect(() => {
    if (istoken) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="p-3 max-w-lg mx-auto shadow-xl">
      <h1 className="text-3xl text-center font-bold my-7">SignUp</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            placeholder="UserName"
            className="border p-3 rounded-lg w-full"
            {...register("userName", { required: "UserName is required" })}
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userName.message}
            </p>
          )}
        </div>

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
        >
          {loading ? "signup..." : "sing up"}
        </button>

        <button
          type="button"
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80"
        >
          Continue with Google
        </button>
      </form>

      <div className="flex items-center gap-2 mt-5">
        <div>Already have an account?</div>
        <Link to="/SingIn">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
