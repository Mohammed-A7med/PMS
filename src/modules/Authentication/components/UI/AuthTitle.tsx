import { AuthTitleProps } from "../../../../interfaces/AuthResponse/AuthResponse";

export default function AuthTitle({
  welcomeText,
  title,
  firstLetter,
}: AuthTitleProps) {
  return (
    <div className="auth-title my-4 py-3">
      <p className="text-white">{welcomeText}</p>
      <h3 className="main-colr title">
        <span className="frist-ch position-relative">{firstLetter}</span>
        {title}
      </h3>
    </div>
  );
}
