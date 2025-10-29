import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormInput from "../UI/FormInput";
import AuthTitle from "../UI/AuthTitle";
import AuthButton from "../UI/AuthButton";
import PersonImg from "../../../../assets/Person-img-1.jpg";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  RegisterFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function Register() {
  const navigate = useNavigate();

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
            <FormInput
              label="User Name"
              type="text"
              placeholder="Enter your name"
              aria-label="userName"
              {...register("userName", RequiredField("user Name"))}
              error={errors.userName}
            />
          </div>

          {/* Email Input */}
          <div className="col-md-6">
            <FormInput
              label="E-mail"
              type="text"
              placeholder="Enter your E-mail"
              aria-label="email"
              {...register("email", emailValidation)}
              error={errors.email}
            />
          </div>

          {/* Country Input */}
          <div className="col-md-6">
            <FormInput
              label="Country"
              type="text"
              placeholder="Enter your country"
              aria-label="country"
              {...register("country", RequiredField("Country"))}
              error={errors.country}
            />
          </div>

          {/* Phone Number Input */}
          <div className="col-md-6">
            <FormInput
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
              aria-label="phoneNumber"
              {...register("phoneNumber", RequiredField("phone Number "))}
              error={errors.phoneNumber}
            />
          </div>

          {/* Password Input */}
          <div className="col-md-6">
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your New Password"
              aria-label="password"
              {...register("password", PasswordValidation)}
              error={errors.password}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="col-md-6">
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm New Password"
              aria-label="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("password") || "password dont match",
              })}
              error={errors.confirmPassword}
            />
          </div>

          {/* Submit Button */}
          <div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
            <div className="w-100 my-3 my-md-4">
              <AuthButton label="Save" isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}