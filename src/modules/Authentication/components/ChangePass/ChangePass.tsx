import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../../../constans/VALIDATIONS";
import axios, { AxiosError } from "axios";
import { AUTH_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import AuthTitle from "../AuthShared/AuthTitle";
import {
  AxiosErrorResponse,
  ChangePasswordFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  // State hooks to control the visibility of password fields
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ChangePasswordFormData>({
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  // Function to toggle visibility of password fields
  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  //Function to handle form submission: Sends a PUT request to change the password
  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await axios.put(AUTH_URLs.ChangePassword, data, {
        headers: requstHeader(),
      });
      toast.success(
        response.data.message || "Your password has been successfully changed!"
      );
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Password change unsuccessful. Please try again"
      );
    }
  };

  return (
    <>
      {/* Title component with a welcome message and page title */}
      <AuthTitle
        welcomeText={"welcome to PMS"}
        title={"hange Password"}
        firstLetter={"C"}
      />

      {/* Form for changing password */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Old Password Input */}
        <div className="my-2 my-md-3">
          <label className="main-colr my-1">Old Password</label>
          <div className="input-group">
            <input
              type={showOldPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your Old Password"
              aria-label="oldPassword"
              {...register("oldPassword", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowOldPassword)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {showOldPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showOldPassword
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.oldPassword && (
            <span className="text-danger">
              {String(errors.oldPassword.message)}
            </span>
          )}
        </div>

        {/* New Password Input */}
        <div className="my-3">
          <label className="main-colr my-1">New Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control "
              placeholder="Enter your New Password"
              aria-label="newPassword"
              {...register("newPassword", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowPassword)}
              className="input-group-text bg-transparent border-0"
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
          {errors.newPassword && (
            <span className="text-danger">
              {String(errors.newPassword.message)}
            </span>
          )}
        </div>

        {/* Confirm New Password Input */}
        <div className="my-4">
          <label className="main-colr my-1">Confirm New Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control "
              placeholder="Confirm New Password"
              aria-label="confirmNewPassword"
              {...register("confirmNewPassword", {
                validate: (value) =>
                  value === getValues("newPassword") || "password dont match",
              })}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={toggleVisibility(setShowConfirmPassword)}
              className="input-group-text bg-transparent border-0"
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
          {errors.confirmNewPassword && (
            <span className="text-danger">
              {String(errors.confirmNewPassword.message)}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="main-bg rounded-pill">
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
