export interface AxiosErrorResponse {
  data: {
    message: string;
  };
  [key: string]: any;
}

export interface RegisterFormData extends LoginFormData {
  userName: string;
  country: string;
  phoneNumber: string;
  confirmPassword: string;
  profileImage: any;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgetPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData
  extends LoginFormData,
    Pick<RegisterFormData, "confirmPassword"> {
  seed: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface VerifyAccountFormData extends ForgetPasswordFormData {
  code:string
}

export interface AuthTitleProps {
  welcomeText: string;
  title: string;
  firstLetter: string;
}
