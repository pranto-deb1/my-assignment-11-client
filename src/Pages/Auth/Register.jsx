import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../Hoocks/UseAuth";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, upDateUserProfile } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        const updateUser = {
          displayName: data.name,
          photoURL: data.photo,
        };
        upDateUserProfile(updateUser)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.code);
          });

        const userInfo = {
          displayName: data.name,
          email: data.email,
          photoUrl: data.photo,
        };

        axiosSecure
          .post("/roles", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              toast.success("successfully inserted user in the database");
            }
          })
          .catch(() => {
            toast.error(
              "there was a problem while storing the user in the database"
            );
          });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <div className=" flex items-center flex-col">
      <img src={logo} alt="" className="w-[200px]" />
      <h2 className="text-5xl font-bold mt-6 text-center">Wellcome</h2>

      <form onSubmit={handleSubmit(handleRegister)} className="w-[300px] mt-10">
        <fieldset className="fieldset">
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input"
            placeholder="Full Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 font-medium">Name is required</p>
          )}
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
              password must be at least 6 characters long and include an
              uppercase letter, a lowercase letter, a number, and a special
              character.
            </p>
          )}
          {errors.password?.type === "required" && (
            <p className="text-red-500 font-medium">password is required</p>
          )}
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            {...register("photo")}
          />

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p className="font-medium">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
