import { Link } from "react-router-dom";
import { formatDate } from "../FormateData/FormateDate";
import Styles from "./CardsWithActions.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function CardsWithActions({
  list,
  handleDelete,
  toggleActivation,
}: any) {
  const { userData }: any = useContext(AuthContext);
  return (
    <>
      <div
        className={`container-fluid mt-5 d-md-none d-flex justify-content-center align-items-center  ${Styles.cardContainer}`}
      >
        <div className="w-100 ">
          {list.map((list: any) => (
            <div
              key={list.id}
              className="accordion mb-3 rounded-3"
              id={`accordion${list.id}`}
            >
              <div className="accordion-item rounded-3 ">
                <h2
                  className={`accordion-header rounded-3 d-flex justify-content-between align-items-center ${
                    list?.isActivated === false ? "bg-danger" : "bg-success"
                  } ${Styles.transitionBgCard}`}
                >
                  <button
                    className={`accordion-button text-white py-3 px-4 ${
                      list?.isActivated === false ? "bg-danger" : "bg-success"
                    } ${Styles.transitionBgCard}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${list.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${list.id}`}
                  >
                    <h5 className="mb-0 py-2">
                      {list?.userName
                        ? `User Name: ${list.userName}`
                        : `Title: ${list.title}`}
                    </h5>
                  </button>
                  {userData?.userGroup === "Manager" ? (
                    <div className="dropdown ">
                      <button
                        className="btn dropdown-toggle  border-0 text-white"
                        type="button"
                        id={`dropdownMenu${list.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenu${list.id}`}
                      >
                        {list?.title && userData?.userGroup === "Manager" ? (
                          <>
                            <li>
                              <a className="dropdown-item">
                                <i className="mx-2 text-success fa-regular fa-eye"></i>
                                View
                              </a>
                            </li>
                            <li>
                              <Link
                                className="text-decoration-none dropdown-item"
                                to={
                                  list?.employee?.userName
                                    ? `/dashboard/task-edit/${list.id}`
                                    : `/dashboard/project-edit/${list.id}`
                                }
                                state={{ listData: list, type: "edit" }}
                              >
                                <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete?.(list.id)}
                                className="dropdown-item"
                              >
                                <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                                Delete
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                onClick={() => toggleActivation?.(list.id)}
                                className="dropdown-item border-0 bg-transparent text-black"
                              >
                                <i
                                  className={
                                    list.isActivated
                                      ? "mx-2 text-success fa-solid fa-ban"
                                      : "mx-2 text-success fa-solid fa-user"
                                  }
                                ></i>
                                {list.isActivated ? "Block" : "Unblock"}
                              </button>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <i className="mx-2 text-success fa-regular fa-eye"></i>
                                View
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </h2>
                <div
                  id={`collapse${list.id}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#accordion${list.id}`}
                >
                  <div className="accordion-body py-4">
                    <div className="row justify-content-center align-items-start">
                      {list?.userName ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Phone Number:</span>{" "}
                            {list.phoneNumber}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {list?.userName ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Status:</span>{" "}
                            {list.isActivated ? "Active" : "Not Active"}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {list?.employee?.userName ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Status:</span>{" "}
                            {list.status}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {list?.employee?.userName ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Status:</span>{" "}
                            {list.status}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {list?.task ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Status:</span>{" "}
                            {list.task.length > 0
                              ? list.task[0]?.status
                              : "No Tasks"}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {list?.userName ? (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Email:</span> {list.email}
                          </p>
                        </div>
                      ) : (
                        <div className="col-12 col-sm-6 col-md-4">
                          <p>
                            <span className="fw-bold">Description:</span>{" "}
                            {list.description}
                          </p>
                        </div>
                      )}

                      <div className="col-12 col-sm-6 col-md-4">
                        <p>
                          <span className="fw-bold">Date Created:</span>{" "}
                          {list.creationDate
                            ? formatDate(list.creationDate)
                            : "No Data"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
