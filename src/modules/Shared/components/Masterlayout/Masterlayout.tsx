import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Styles from "./Masterlayout.module.css"

export default function Masterlayout() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <SideBar  />
        <div className={`${Styles.container} w-100 container-fluid`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
