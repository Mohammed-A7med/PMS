import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import SunIcon from "../../../../icons/SunIcon";
import BellIcon from "../../../../icons/BellIcon";
import MoonIcon from "../../../../icons/MoonIcon";
import NavLogo from "../../../../assets/nav-logo.png";
import UserGroupIcon from "../../../../icons/UserGroupIcon";
import { AuthContext } from "../../../../context/AuthContext";
import { AuthContextType } from "../../../../interfaces/UserInfo/UserInfoResponse";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { userData } = useContext(AuthContext) as AuthContextType;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle("Dark-mode", newMode);
      return newMode;
    });
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.navContainer} shadow-sm py-2 px-3`}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex w-100  align-items-center justify-content-between px-2">
          {/* Left: Logo */}
          <Link
            to="/dashboard"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img
              src={NavLogo}
              alt="Navbar Logo"
              className={`${styles.logo} img-fluid`}
            />
          </Link>

          {/* Right Section (Icons + Toggler) */}
          <div
            className={`d-flex align-items-center gap-3 ${styles.rightSection}`}
          >
            {/* Notification */}
            <button
              className={`border-0 bg-transparent p-0 ${styles.iconButton}`}
              title="Notifications"
            >
              <BellIcon size={24} color="#ef9b28" />
              <span className={`${styles.notificationBadge}`}></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`border-0 bg-transparent p-0 ${styles.iconButton}`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? (
                <SunIcon size={22} color="#ef9b28" />
              ) : (
                <MoonIcon size={22} color="#ef9b28" />
              )}
            </button>

            {/* Navbar Toggler */}
            <button
              className={`navbar-toggler ${styles.togglerCustom}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        {/* Collapsible User Section (only visible on mobile) */}
        <div
          className={`collapse navbar-collapse justify-content-end ${styles.navbarCollapse}`}
          id="navbarSupportedContent"
        >
          <div className="d-flex align-items-center gap-2 border-start ps-3 mt-3 mt-lg-0">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center ${styles.userIconContainer}`}
            >
              <UserGroupIcon size={26} color="#ef9b28" />
            </div>
            <div className="d-flex flex-column lh-1">
              <span className={`${styles.userName}`}>{userData?.userName}</span>
              <small className={`${isDarkMode? "text-secondary" : "text-muted"} mt-1`}>{userData?.userEmail}</small>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
