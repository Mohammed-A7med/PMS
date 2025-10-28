import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormInput from "../UI/FormInput";
import AuthTitle from "../UI/AuthTitle";
import AuthButton from "../UI/AuthButton";
import { AUTH_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { PasswordValidation } from "../../../../constans/VALIDATIONS";
import {
  AxiosErrorResponse,
  ChangePasswordFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function ChangePass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ChangePasswordFormData>({
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });


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
        <FormInput
          label="Old Password"
          type="password"
          placeholder="Enter your Old Password"
          aria-label="oldPassword"
          {...register("oldPassword", PasswordValidation)}
          error={errors.oldPassword}
        />

        {/* New Password Input */}
        <FormInput
          label="New Password"
          type="password"
          placeholder="Enter your New Password"
          aria-label="newPassword"
          {...register("newPassword", PasswordValidation)}
          error={errors.newPassword}
        />

        {/* Confirm New Password Input */}
        <FormInput
          label="Confirm New Password"
          type="password"
          placeholder="Confirm New Password"
          aria-label="confirmNewPassword"
          {...register("confirmNewPassword", {
            validate: (value) =>
              value === getValues("newPassword") || "password dont match",
          })}
          error={errors.confirmNewPassword}
        />

        {/* Submit Button */}
        <AuthButton label="Save" isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
