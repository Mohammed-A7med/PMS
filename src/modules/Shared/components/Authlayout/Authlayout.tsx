import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../../assets/Auth-logo.png";

export default function AuthLayout() {
  const location = useLocation();

  const isRegisterRoute = location.pathname === "/register";

  return (
    <div className="auth-container">
      <div className="container-fluid h-100">
        <div className={`row justify-content-center align-items-center ${isRegisterRoute? "h-100" : "vh-100"}`}>
          <div className={isRegisterRoute ? "w-100 mt-md-5" : "col-md-5"}>
            {isRegisterRoute ? (
              <Outlet />
            ) : (
              <>
                <div className="img-logo text-center my-3">
                  <img src={logo} alt="Auth-logo" />
                </div>
                <div className="auth-item rounded rounded-4 p-5 pt-3">
                  <Outlet />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
