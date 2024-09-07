import Styles from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div
        className={`fixed-top d-flex justify-content-center align-items-center vh-100 ${Styles.loaderContainer}`}
      >
        <div className={`d-flex justify-content-between ${Styles.loader}`}>
          <div className=""></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
