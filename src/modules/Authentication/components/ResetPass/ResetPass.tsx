import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import FormInput from "../UI/FormInput";
import AuthTitle from "../UI/AuthTitle";
import AuthButton from "../UI/AuthButton";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import {
  PasswordValidation,
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  ResetPasswordFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { email: "", password: "", confirmPassword: "", seed: "" },
  });

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
        <FormInput
          label="E-mail"
          type="text"
          placeholder="Enter your E-mail"
          aria-label="email"
          {...register("email", emailValidation)}
          error={errors.email}
        />

        {/* Input field for OTP verification */}
        <FormInput
          label="OTP Verification"
          type="text"
          placeholder="Enter Verification"
          aria-label="seed"
          {...register("seed", RequiredField("OTP"))}
          error={errors.seed}
        />

        {/* Input field for new password */}
        <FormInput
          label="New Password"
          type="password"
          placeholder="Enter your New Password"
          aria-label="password"
          {...register("password", PasswordValidation)}
          error={errors.password}
        />

        {/* Input field for confirming the new password */}
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

        {/* Submit button for the form */}
        <AuthButton label="Save" isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
