import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import UseAuth from "../../Hoocks/UseAuth";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password).then(() => {
      navigate(location?.state || "/");
    });
  };

  return (
    <div className=" flex items-center flex-col">
      <img src={logo} alt="" className="w-[200px]" />
      <h2 className="text-5xl font-bold mt-6 text-center">Wellcome back</h2>

      <form onSubmit={handleSubmit(handleLogin)} className="w-[300px] mt-10">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 font-medium">Email is required</p>
          )}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input relative"
              placeholder="Password"
              {...register("password", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                required: true,
              })}
            />

            <button
              type="button"
              className="btn btn-xs absolute top-[20%] right-2.5 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <IoMdEye />}
            </button>
          </div>
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 font-medium">
              assword must be at least 6 characters long and include an
              uppercase letter, a lowercase letter, a number, and a special
              character.
            </p>
          )}
          {errors.password?.type === "required" && (
            <p className="text-red-500 font-medium">password is required</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 mb-2">Login</button>
          <p className="text-center font-medium mb-2">--- OR ---</p>
          <SocialLogin></SocialLogin>
        </fieldset>
        <p className="font-medium">
          Don't have an account yet?{" "}
          <Link to={"/auth/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
