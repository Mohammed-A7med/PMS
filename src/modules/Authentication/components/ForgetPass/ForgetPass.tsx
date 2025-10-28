import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import FormInput from "../UI/FormInput";
import AuthTitle from "../UI/AuthTitle";
import AuthButton from "../UI/AuthButton";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { emailValidation } from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  ForgetPasswordFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function ForgetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({ defaultValues: { email: "" } });

  //Function to handle form submission: Sends a POST request to the forgotPassword endpoint with form data
  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const response = await axios.post(AUTH_URLs.forgotPassword, data);
      toast.success(
        response.data.message ||
          "Password reset successful. Please check your email for further instructions."
      );
      navigate("/reset-password");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError?.response?.data?.message ||
          "Something went wrong. We couldn't reset your password. Please try again."
      );
    }
  };

  return (
    <>
      {/* Title component with a welcome message and page title */}
      <AuthTitle
        welcomeText={"welcome to PMS"}
        title={"orget Password"}
        firstLetter={"F"}
      />

      {/* Form for requesting password reset */}
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

        {/* Submit button */}
        <AuthButton label="Verify" isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
