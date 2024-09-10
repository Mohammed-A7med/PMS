import React, { useContext, useState } from "react";
import Styles from "./TableWithActions.module.css";
import { formatDate } from "../FormateData/FormateDate";
import { Link } from "react-router-dom";
import { TableWithActionsProps } from "../../../../interfaces/TableWithActions/TableWithActionsResponse";
import { AuthContext } from "../../../../context/AuthContext";

export default function TableWithActions({
  tHead,
  list,
  setSearchParams,
  searchParams,
  ComponentName,
  searchKey,
  handleDelete,
  toggleActivation,
}: TableWithActionsProps) {
  const [dynamicSearchKey, setDynamicSearchKey] = useState(searchKey);
  const { userData }: any = useContext(AuthContext);

  // Handler for search input
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [dynamicSearchKey]: e.target.value,
      pageNumber: "1",
    });
  };

  // Handler for status select filter for "Tasks"
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      status: status || undefined,
      pageNumber: "1",
    });
  };

  // Handler for filter select for "Users"
  const handleUserFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setDynamicSearchKey(selectedOption);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [selectedOption]: searchParams.get(selectedOption) || "",
      pageNumber: "1",
    });
  };

  return (
    <>
      <div className="bg-white mt-4 p-3 rounded-top-4 shadow-sm">
        <div
          className={`d-flex align-items-center ms-md-3 ${Styles.inputContainer}`}
        >
          {/* -------------------------- Search Input  -------------------------- */}
          <div className="input-group mb-3 w-25">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder={`Search ${dynamicSearchKey}`}
              aria-label={`Search ${dynamicSearchKey}`}
              aria-describedby="basic-addon1"
              onChange={handleSearchInputChange}
              value={searchParams.get(dynamicSearchKey) ?? ""}
            />
          </div>

          {/* --------------------  Conditional Selects Based on ComponentName  --------------------  */}
          {ComponentName === "Tasks" && (
            <div className={`input-group mb-3 w-25 mx-2 ${Styles.inputFilter}`}>
              <select
                onChange={handleStatusChange}
                className="form-control rounded-5"
                value={searchParams.get("status") || ""}
              >
                <option value="ToDo">Filter</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          )}

          {ComponentName === "Users" && (
            <div className={`input-group mb-3 w-25 mx-2 ${Styles.inputFilter}`}>
              <select
                onChange={handleUserFilterChange}
                className="form-control rounded-5"
                value={dynamicSearchKey}
              >
                <option value="userName">Filter</option>
                <option value="email">Email</option>
                <option value="country">Country</option>
                <option value="groups">Groups</option>
              </select>
            </div>
          )}
        </div>

        {/* --------------------------  Table  -------------------------- */}
        <div className={`d-none d-md-block ${Styles.tableContainer}`}>
          <table className="table text-center table-striped ">
            <thead>
              <tr>{tHead}</tr>
            </thead>
            <tbody>
              {list?.map((list: any) => {
                const statusClass =
                  list.status === "ToDo"
                    ? `${Styles.bgStatusTask} rounded-pill`
                    : list.status === "InProgress"
                    ? "bg-warning rounded-pill"
                    : list.status === "Done"
                    ? "bg-success rounded-pill"
                    : "";

                return (
                  <tr key={list.id}>
                    {list?.title ? (
                      <th>{list.title}</th>
                    ) : (
                      <th>{list.userName}</th>
                    )}

                    {/* Conditional class for activation status */}
                    {typeof list.isActivated === "boolean" ? (
                      <td
                        className={
                          list.isActivated
                            ? "bg-success text-white rounded-5"
                            : `${Styles.bgNotAvtive} text-white rounded-5`
                        }
                      >
                        {list.isActivated ? "Active" : "Not Active"}
                      </td>
                    ) : (
                      ""
                    )}

                    {/* Status column with conditional classes */}
                    {list?.status ? (
                      <td className={`${statusClass}`}>{list.status}</td>
                    ) : (
                      ""
                    )}

                    {/* Additional rows */}
                    {list?.phoneNumber ? <td>{list.phoneNumber}</td> : ""}
                    {list?.email ? <td>{list.email}</td> : ""}
                    {list?.employee ? (
                      <td scope="row">{list.employee?.userName}</td>
                    ) : (
                      ""
                    )}
                    {list?.task ? (
                      <td className={`${Styles.bgStatusProject} rounded-5`}>
                        {list.task.length > 0
                          ? list.task[0]?.status
                          : "No Tasks"}
                      </td>
                    ) : (
                      ""
                    )}
                    {list?.task ? <td scope="row">{list.task?.length}</td> : ""}
                    {list.description ? <td>{list.description}</td> : ""}
                    <td>
                      {list.creationDate
                        ? formatDate(list.creationDate)
                        : "No creation Date"}
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        className="border-0 bg-transparent dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
