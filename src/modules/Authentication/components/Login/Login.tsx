import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PasswordValidation,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import AuthTitle from "../AuthShared/AuthTitle";
import axios, { AxiosError } from "axios";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  AxiosErrorResponse,
  LoginFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";
import { AuthContext } from "../../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  let { saveUserData }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  // Function to toggle password visibility
  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  // Function to handle form submission a Send POST request to login endpoint with form data
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.login, data);
      toast.success(
        response.data.message ||
          "Welcome back! You have successfully logged in."
      );
      localStorage.setItem("userToken", response.data.token);
      saveUserData();
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };
  return (
    <>
      {/* Title component with a welcome message and page title */}
      <AuthTitle
        welcomeText={"welcome to PMS"}
        title={"ongin"}
        firstLetter={"L"}
      />

      {/* Form for user login */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email input */}
        <div className="my-3 my-md-4">
          <label className="main-colr my-1">E-mail</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your E-mail"
              aria-label="email"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{String(errors.email.message)}</span>
          )}
        </div>

        {/* Password input */}
        <div className="my-4">
          <label className="main-colr my-1">New Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control "
              placeholder="Enter your New Password"
              aria-label="password"
              {...register("password", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowPassword)}
              className="input-group-text bg-transparent border-0 border-bottom border-icon rounded-0"
            >
              <span className="sr-only">
                {showPassword ? "hide password" : "show password"}
              </span>
              <i
                className={`text-white 
                  ${showPassword ? "fa-solid fa-eye " : "fa-solid fa-eye-slash"}
                `}
              ></i>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">
              {String(errors.password.message)}
            </span>
          )}
        </div>

        {/* Links for registration and password recovery */}
        <div className="lodin-links d-flex justify-content-between">
          <Link
            to={`/register`}
            className="text-white text-decoration-none link-item"
          >
            Register Now ?
          </Link>

          <Link
            to={`/forget-password`}
            className="text-white text-decoration-none link-item"
          >
            Forget Password ?
          </Link>
        </div>

        {/* Submit button */}
        <div className="main-bg rounded-pill mt-5">
          <button
            className="btn text-white border-0  w-100 py-2 py-md-3 "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                please wait...{" "}
                <i className="fa-solid fa-spinner fa-spin mx-1"></i>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
