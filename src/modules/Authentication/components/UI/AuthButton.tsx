import React from "react";

import SpinnerIcon from "../../../../icons/SpinnerIcon";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isSubmitting?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label = "Submit",
  isSubmitting = false,
  className = "",
  ...props
}) => {
  return (
    <div className="main-bg rounded-pill mt-5">
      <button
        className={`btn text-white border-0 w-100 py-2 py-md-3 ${className}`}
        type="submit"
        disabled={isSubmitting || props.disabled}
        {...props}
      >
        {isSubmitting ? (
          <span>
            please wait... {""}
            <SpinnerIcon />
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default AuthButton;
