import { useContext } from "react";
import { Link } from "react-router-dom";
import PersonNav from "../../../../assets/nav-img.png";
import navLogo from "../../../../assets/nav-logo.png";
import { AuthContext } from "../../../../context/AuthContext";
import { AuthContextType } from "../../../../interfaces/UserInfo/UserInfoResponse";
import Styles from "./Navbar.module.css";

export default function Navbar() {
  const { userData } = useContext(AuthContext) as AuthContextType;
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${Styles.navContainer} shadow-lg `}
      >
        <div className="container-fluid d-flex navbar-light">
          <div className="d-flex justify-content-between w-75 align-items-center ">
            <Link className="navbar-brand" to={"/dashboard"}>
              <img className="img-fluid" src={navLogo} alt="navbar-logo" />
            </Link>
            <div className="icon-nav navbar-brand">
              <i className="fa-solid fa-bell text-warning "></i>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse w-25  ${Styles.navbarCollapse}`}
            id="navbarSupportedContent"
          >
            <div className="d-flex align-items-center ">
              <img
                className="img-fluid rounded-circle me-2 "
                src={PersonNav}
                alt=""
              />
              <div className={`${Styles.cantentNav}`}>
                <p>{userData?.userName}</p>
                <span className="text-muted">{userData?.userEmail}</span>
              </div>

              <i className="fa-solid fa-angle-down text-muted ms-3"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
