import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";


export default function Masterlayout() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <SideBar  />
        <div className="w-100 container-fluid bg-light">
          <Outlet />
        </div>
      </div>
    </>
  );
}
