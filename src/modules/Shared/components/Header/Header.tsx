import { useContext } from "react";
import Styles from "./Header.module.css";
import { AuthContext } from "../../../../context/AuthContext";


export default function Header() {
  const { userData }: any = useContext(AuthContext);

  return (
    <div className={`${Styles.headerContainer} mt-4`}>
      <div
        className={`${Styles.headerBg} text-white py-5 rounded-4 text-center text-md-start`}
      >
        <div className="content-header py-md-5 px-3 px-md-5 ">
          <h2 className="py-3 py-md-4">
            Welcome <span className={Styles.mainColor}>{userData?.userName}</span>
          </h2>
          <h3>You can add project and assign tasks to your team</h3>
        </div>
      </div>
    </div>
  );
}
