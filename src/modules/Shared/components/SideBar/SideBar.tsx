import { useContext } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useResponsiveCollapse } from "../../../../hooks/useResponsiveCollapse";
import { AuthContext } from "../../../../context/AuthContext";
import HomeIcon from "../../../../icons/HomeIcon";
import LockIcon from "../../../../icons/LockIcon";
import LogoutIcon from "../../../../icons/LogoutIcon";
import SplitSquareIcon from "../../../../icons/SplitSquareIcon";
import TasksListIcon from "../../../../icons/TasksListIcon";
import UsersIcon from "../../../../icons/UsersIcon";
import ArrowRightIcon from "../../../../icons/ArrowRightIcon";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapse, toggleCollapse } = useResponsiveCollapse(900);
  const { userData }: any = useContext(AuthContext);
  
  const getMenuItemClassName = (path: string) => {
    return location.pathname === path
      ? "ps-menu-button active"
      : "ps-menu-button";
  };

  return (
    <div className="sidebar-container d-flex position-sticky top-0 bottom-0 vh-100">
      <Sidebar collapsed={isCollapse}>
        {!isCollapse && (
          <div
            onClick={toggleCollapse}
            className="icon-toggle mt-2 d-flex justify-content-end"
          >
            <i className="fa-solid fa-chevron-left main-bg  px-1 rounded-start-3 text-white"></i>
          </div>
        )}
        <Menu className={`text-white ${isCollapse ? "mt-5 px-1" : "px-2"}`}>
          <MenuItem
            icon={<HomeIcon />}
            component={<Link to="/dashboard" />}
            className={getMenuItemClassName("/dashboard")}
          >
            Home
          </MenuItem>

          {userData?.userGroup === "Manager" && (
            <MenuItem
              icon={<UsersIcon />}
              component={<Link to="/dashboard/users-list" />}
              className={getMenuItemClassName("/dashboard/users-list")}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<SplitSquareIcon />}
            component={<Link to="/dashboard/project-list" />}
            className={getMenuItemClassName("/dashboard/project-list")}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<TasksListIcon />}
            component={
              userData?.userGroup === "Manager" ? (
                <Link to="/dashboard/task-list" />
              ) : (
                <Link to="/dashboard/users-tasks" />
              )
            }
            className={
              userData?.userGroup === "Manager"
                ? getMenuItemClassName("/dashboard/task-list")
                : getMenuItemClassName("/dashboard/users-tasks")
            }
          >
            Tasks
          </MenuItem>

          <MenuItem
            icon={<LockIcon />}
            component={<Link to="/change-password" />}
            className={getMenuItemClassName("change-password")}
          >
            Change Password
          </MenuItem>

          <MenuItem
            onClick={() => {
              localStorage.removeItem("userToken");
              navigate("/login");
            }}
            icon={<LogoutIcon />}
            className="ps-menu-button"
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      {isCollapse && (
        <div
          onClick={toggleCollapse}
          className="icon-toggle mt-3 d-none d-md-block bg-light rounded-end-3"
        >
          <div className="main-bg py-2 rounded-end-3">
            <ArrowRightIcon size={18} color="white" />
          </div>
        </div>
      )}
    </div>
  );
}
