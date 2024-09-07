import { Link, useNavigate } from "react-router-dom";
import Styles from "./Title.module.css";
import { TitleData } from "../../../../interfaces/Dashboard/TitleResponse";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

export default function Title({
  linKText,
  titel,
  buttonText,
  pathBack,
  linkPath,
}: TitleData) {
  const navigate = useNavigate();
  const { userData }: any = useContext(AuthContext);

  return (
    <div
      className={`bg-white mt-2 d-flex justify-content-between align-items-center py-4 shadow-sm ${Styles.titelConatiner}`}
    >
      <div className="item">
        {linKText && userData?.userGroup === "Manager" ? (
          <Link
            to={`/dashboard${pathBack}`}
            className="ps-2 ps-md-5 text-decoration-none text-black"
          >
            {" "}
            <i className="fa-solid fa-angle-left pe-2 "></i>
            {linKText}
          </Link>
        ) : (
          ""
        )}
        <h3 className="ps-2 ps-md-5 py-1">{titel}</h3>
      </div>

      {buttonText && userData?.userGroup === "Manager" ? (
        <button
          onClick={() => (linkPath ? navigate(`${linkPath}`) : "")}
          className="btn bg-warning rounded-5 me-md-3 py-md-2 "
        >
          <i className="fa-solid fa-plus mx-2 "></i>
          {buttonText}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
