import { useState } from "react";
import AuthTitle from "../AuthShared/AuthTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import { useNavigate } from "react-router-dom";
import {
  AxiosErrorResponse,
  ResetPasswordFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function ResetPass() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { email: "", password: "", confirmPassword: "", seed: "" },
  });

  // Function to toggle password visibility
  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  //Function to handle form submission: Sends a POST request to the resetPassword endpoint with form data
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.ResetPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Something went wrong. We couldn't reset your password. Please try again."
      );
    }
  };

  return (
    <>
      {/* Title component with a welcome message and page title */}
      <AuthTitle
        welcomeText={"welcome to PMS"}
        title={"eset  Password"}
        firstLetter={"R"}
      />

      {/* Form for resetting the password */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input field for email */}
        <div className="my-2 my-md-3">
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

        {/* Input field for OTP verification */}
        <div className="my-4">
          <label className="main-colr my-1">OTP Verification</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Verification"
              aria-label="seed"
              {...register("seed", RequiredField("OTP"))}
            />
          </div>
          {errors.seed && (
            <span className="text-danger">{String(errors.seed.message)}</span>
          )}
        </div>

        {/* Input field for new password */}
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
                className={
                  showPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">
              {String(errors.password.message)}
            </span>
          )}
        </div>

        {/* Input field for confirming the new password */}
        <div className="my-4">
          <label className="main-colr my-1">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control "
              placeholder="Confirm New Password"
              aria-label="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("password") || "password dont match",
              })}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowConfirmPassword)}
              className="input-group-text bg-transparent border-0 border-bottom border-icon rounded-0"
            >
              <span className="sr-only">
                {showConfirmPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showConfirmPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger">
              {String(errors.confirmPassword.message)}
            </span>
          )}
        </div>

        {/* Submit button for the form */}
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
              "Save"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
