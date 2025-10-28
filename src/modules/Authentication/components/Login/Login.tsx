import { useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../UI/FormInput";
import Styles from "./Login.module.css";
import AuthTitle from "../UI/AuthTitle";
import AuthButton from "../UI/AuthButton";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { AuthContext } from "../../../../context/AuthContext";
import {
  PasswordValidation,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  LoginFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function Login() {
  const navigate = useNavigate();
  const { saveUserData }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: {
      email: "mohamedahmedkhalaf68@gmail.com",
      password: "@Password321!",
    },
  });

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
        <FormInput
          label="E-mail"
          type="email"
          placeholder="Enter your E-mail"
          aria-label="email"
          {...register("email", emailValidation)}
          error={errors.email}
        />

        {/* Password input */}
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your New Password"
          aria-label="password"
          {...register("password", PasswordValidation)}
          error={errors.password}
        />

        {/* Links for registration and password recovery */}
        <div className="lodin-links d-flex justify-content-between align-items-center w-100">
          <Link
            to={`/register`}
            className={`text-white text-decoration-none link-item ${Styles["text-link"]}`}
          >
            Register Now?
          </Link>

          <Link
            to={`/forget-password`}
            className={`text-white text-decoration-none link-item ${Styles["text-link"]}`}
          >
            Forget Password?
          </Link>
        </div>

        {/* Submit button */}
        <AuthButton label="Login" isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
