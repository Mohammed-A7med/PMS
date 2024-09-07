import { useState } from "react";
import AuthTitle from "../AuthShared/AuthTitle";
import { useForm } from "react-hook-form";
import PersonImg from "../../../../assets/Person-img-1.jpg";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import axios, { AxiosError } from "axios";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  AxiosErrorResponse,
  RegisterFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      userName: "",
      confirmPassword: "",
      country: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  // Function to toggle visibility of password fields
  const toggleVisibility = (setterFunction: any) => {
    return () => setterFunction((prevState: any) => !prevState);
  };

  // Function to append form data to FormData object for API submission
  const appendToFormData = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage);

    return formData;
  };

  //Function to handle form submission: Sends a POST request to the registration endpoint with the form data.
  const onSubmit = async (data: RegisterFormData) => {
    const userData = appendToFormData(data);
    try {
      const response = await axios.post(AUTH_URLs.register, userData);
      toast.success(
        response.data.message ||
          "Congratulations! Your account has been successfully created."
      );
      navigate("/verify-account");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Registration failed. Please double-check your details and try again"
      );
    }
  };

  return (
    <div className="container-fluid container-register rounded-4">
      <div className="ps-5 pt-3">
        {/* Title component with a welcome message and page title */}
        <AuthTitle
          welcomeText={"welcome to PMS"}
          title={"reate New Account"}
          firstLetter={"C"}
        />
      </div>

      {/* Form for user registration */}
      <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Image Upload */}
        <div className="input-group-img">
          <div className="img-person-container d-flex justify-content-center">
            <label htmlFor="file-input" className="position-relative">
              <img
                className="img-fluid rounded-circle PersonImg"
                src={PersonImg}
                alt="Person"
              />
              <div className="layer-img position-absolute top-0 start-0 end-0 bottom-0 rounded-circle d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-camera main-colr fa-3x"></i>
              </div>
            </label>
            <input
              type="file"
              id="file-input"
              className="d-none"
              {...register("profileImage", RequiredField("profile Image"))}
            />
          </div>
          <div className="d-flex justify-content-center">
            {errors.profileImage && (
              <span className="text-danger">
                {String(errors.profileImage.message)}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          {/* User Name Input */}
          <div className="col-md-6">
            <div className="my-3 my-md-4">
              <label className="main-colr my-1">User Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  aria-label="userName"
                  {...register("userName", RequiredField("user Name"))}
                />
              </div>
              {errors.userName && (
                <span className="text-danger">
                  {String(errors.userName.message)}
                </span>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="col-md-6">
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
                <span className="text-danger">
                  {String(errors.email.message)}
                </span>
              )}
            </div>
          </div>

          {/* Country Input */}
          <div className="col-md-6">
            <div className="my-3 my-md-4">
              <label className="main-colr my-1">Country</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your country"
                  aria-label="country"
                  {...register("country", RequiredField("Country"))}
                />
              </div>
              {errors.country && (
                <span className="text-danger">
                  {String(errors.country.message)}
                </span>
              )}
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="col-md-6">
            <div className="my-3 my-md-4">
              <label className="main-colr my-1">Phone Number</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone number"
                  aria-label="phoneNumber"
                  {...register("phoneNumber", RequiredField("phone Number "))}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-danger">
                  {String(errors.phoneNumber.message)}
                </span>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="col-md-6">
            <div className="my-4">
              <label className="main-colr my-1">Password</label>
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
          </div>

          {/* Confirm Password Input */}
          <div className="col-md-6">
            <div className="my-3 my-md-4">
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
          </div>

          {/* Submit Button */}
          <div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
            <div className="main-bg rounded-pill  w-100 my-3 my-md-5">
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
          </div>
        </div>
      </form>
    </div>
  );
}
