import React, { useState, forwardRef } from "react";

import EyeIcon from "../../../../icons/EyeIcon";
import EyeSlashIcon from "../../../../icons/EyeSlashIcon";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: { message?: string };
}

/**
 * FormInput Component
 * -------------------
 * A reusable, accessible input component with optional label and error message.
 * Supports password visibility toggle and integrates seamlessly with react-hook-form
 * using `forwardRef` for proper ref forwarding and form registration.
 */

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";

    // Toggle the password visibility state
    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="my-3 my-md-4">
        {label && <label className="main-colr my-1">{label}</label>}

        {/* Input group for text or password fields */}
        <div className="input-group">
          <input
            ref={ref}
            {...props}
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            className={`form-control responsive-input ${className}`}
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
              {showPassword ? (
                <EyeIcon color="white" size={18} />
              ) : (
                <EyeSlashIcon color="white" size={18} />
              )}
            </button>
          )}
        </div>

        {/* Validation error message */}
        {error && <span className="text-danger">{error.message}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
