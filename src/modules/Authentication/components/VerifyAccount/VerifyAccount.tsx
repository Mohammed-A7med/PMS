import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { AUTH_URLs } from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import AuthTitle from "../AuthShared/AuthTitle";
import {
  RequiredField,
  emailValidation,
} from "../../../../constans/VALIDATIONS";
import { useNavigate } from "react-router-dom";
import {
  AxiosErrorResponse,
  VerifyAccountFormData,
} from "../../../../interfaces/AuthResponse/AuthResponse";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyAccountFormData>({
    defaultValues: { email: "", code: "" },
  });

  //Function to handle form submission: Sends  a PUT request to the verifyAccount endpoint with form data
  const onSubmit = async (data: VerifyAccountFormData) => {
    try {
      const response = await axios.put(AUTH_URLs.verifyAccount, data);
      toast.success(
        response.data.message ||
          "Verification complete! Your account is now active."
      );
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Error verifying account. Please retry or get in touch with our support team."
      );
    }
  };
  return (
    <>
      {/* Title component with a welcome message and page title */}
      <AuthTitle
        welcomeText={"welcome to PMS"}
        title={"erify Account"}
        firstLetter={"V"}
      />

      {/* Form for verifying the account */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input field for email */}
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

        {/* Input field for OTP code */}
        <div className="my-4">
          <label className="main-colr my-1">OTP Verification</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Verification"
              aria-label="code"
              {...register("code", RequiredField("OTP"))}
            />
          </div>
          {errors.code && (
            <span className="text-danger">{String(errors.code.message)}</span>
          )}
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
              "Save"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
