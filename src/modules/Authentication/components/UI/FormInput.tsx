import React, { useState } from "react";

import EyeIcon from "../../../../icons/EyeIcon";
import EyeSlashIcon from "../../../../icons/EyeSlashIcon";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: { message?: string };
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="my-3 my-md-4">
      {label && <label className="main-colr my-1">{label}</label>}

      <div className="input-group">
        <input
          {...props}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          className={`form-control ${props.className || ""}`}
          aria-label={props.name || label || "input"}
        />

        {/* Password toggle icon */}
        {isPasswordField && (
          <button
            type="button"
            onClick={toggleVisibility}
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            className="input-group-text bg-transparent border-0 border-bottom border-icon rounded-0"
          >
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
            <i
              className={`text-white ${
                showPassword ? <EyeIcon /> : <EyeSlashIcon />
              }`}
            ></i>
          </button>
        )}
      </div>

      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
};

export default FormInput;
