import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(true);
  const { userData }: any = useContext(AuthContext);

  const getMenuItemClassName = (path: string) => {
    return location.pathname === path
      ? "ps-menu-button active"
      : "ps-menu-button";
  };

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const logOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsCollapse(false);
      } else {
        setIsCollapse(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar-container d-flex position-sticky top-0 bottom-0 vh-100">
      <Sidebar collapsed={isCollapse}>
        {isCollapse ? (
          ""
        ) : (
          <div
            onClick={toggleCollapse}
            className="icon-toggle mt-2 d-flex justify-content-end"
          >
            <i className="fa-solid fa-chevron-left main-bg  px-1 rounded-start-3 text-white"></i>
          </div>
        )}
        <Menu className={`text-white ${isCollapse ? "mt-5 px-1" : "px-2"}`}>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
            className={getMenuItemClassName("/dashboard")}
          >
            Home
          </MenuItem>
          {userData?.userGroup === "Manager" ? (
            <MenuItem
              icon={<i className="fa-solid fa-user-group"></i>}
              component={<Link to="/dashboard/users-list" />}
              className={getMenuItemClassName("/dashboard/users-list")}
            >
              Users
            </MenuItem>
          ) : (
            ""
          )}
          <MenuItem
            icon={<i className="fa-solid fa-table-columns"></i>}
            component={<Link to="/dashboard/project-list" />}
            className={getMenuItemClassName("/dashboard/project-list")}
          >
            Projects
          </MenuItem>
            
          <MenuItem
            icon={<i className="fa-solid fa-list-check"></i>}
            component={userData?.userGroup === "Manager" ?<Link to="/dashboard/task-list" /> : <Link to="/dashboard/users-tasks" /> }
            className={userData?.userGroup === "Manager" ? getMenuItemClassName("/dashboard/task-list") : getMenuItemClassName("/dashboard/users-tasks") }
          >
            Tasks
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-lock"></i>}
            component={<Link to="/change-password" />}
            className={getMenuItemClassName("change-password")}
          >
            Change Password
          </MenuItem>

          <MenuItem
            onClick={logOut}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            className="ps-menu-button"
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      {isCollapse ? (
        <div
          onClick={toggleCollapse}
          className="icon-toggle mt-3 d-none d-md-block bg-light rounded-end-3"
        >
          <i className="fa-solid fa-chevron-right main-bg px-1 rounded-end-3 text-white"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
