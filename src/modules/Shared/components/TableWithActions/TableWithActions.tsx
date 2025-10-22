import { Link } from "react-router-dom";
import { useContext, useState, ChangeEvent } from "react";

import { AuthContext } from "../../../../context/AuthContext";
import { TableWithActionsProps } from "../../../../interfaces/TableWithActions/TableWithActionsResponse";
import { formatDate } from "../FormateData/FormateDate";
import Styles from "./TableWithActions.module.css";

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

  // ----------------------------- Handlers -----------------------------

  // Handle search input changes dynamically based on current key
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [dynamicSearchKey]: e.target.value,
      pageNumber: "1",
    });
  };

  // Handle task status filtering
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      status: e.target.value || undefined,
      pageNumber: "1",
    });
  };

  // Handle user filter selection and update search key
  const handleUserFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    setDynamicSearchKey(selectedKey);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [selectedKey]: searchParams.get(selectedKey) || "",
      pageNumber: "1",
    });
  };

  // ----------------------------- UI Rendering -----------------------------

  const renderStatusBadge = (status: string) => {
    const statusClass =
      status === "ToDo"
        ? Styles.bgStatusTask
        : status === "InProgress"
        ? "bg-warning"
        : status === "Done"
        ? "bg-success"
        : "";

    return (
      <td>
        <span
          className={`${statusClass} text-white rounded-pill py-1 px-3 d-inline-block my-2`}
        >
          {status}
        </span>
      </td>
    );
  };

  const renderActivationBadge = (isActive: boolean) => (
    <td>
      <span
        className={`${
          isActive ? "bg-success" : Styles.bgNotAvtive
        } text-white rounded-pill py-1 px-3 d-inline-block my-2`}
      >
        {isActive ? "Active" : "Not Active"}
      </span>
    </td>
  );

  return (
    <div className="bg-white mt-4 p-3 rounded-top-4 shadow-sm">
      {/* -------------------------- Filters -------------------------- */}
      <div
        className={`d-flex align-items-center ms-md-3 ${Styles.inputContainer}`}
      >
        {/* Search Input */}
        <div className="input-group mb-3 w-25">
          <input
            type="text"
            className="form-control rounded-5"
            placeholder={`Search ${dynamicSearchKey}`}
            aria-label={`Search ${dynamicSearchKey}`}
            onChange={handleSearchInputChange}
            value={searchParams.get(dynamicSearchKey) ?? ""}
          />
        </div>

        {/* Conditional Filters */}
        {ComponentName === "Tasks" && (
          <div className={`input-group mb-3 w-25 mx-2 ${Styles.inputFilter}`}>
            <select
              onChange={handleStatusChange}
              className="form-control rounded-5"
              value={searchParams.get("status") || ""}
            >
              <option value="">Filter</option>
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

      {/* -------------------------- Table -------------------------- */}
      <div className={`${Styles.tableContainer} d-none d-md-block`}>
        <table className="table text-center table-striped">
          <thead>
            <tr>{tHead}</tr>
          </thead>
          <tbody>
            {list?.map((item: any) => (
              <tr key={item.id}>
                <th>{item.title || item.userName}</th>

                {/* Activation Badge */}
                {typeof item.isActivated === "boolean" &&
                  renderActivationBadge(item.isActivated)}

                {/* Task Status */}
                {item.status && renderStatusBadge(item.status)}

                {/* Additional Info */}
                {item.phoneNumber && <td>{item.phoneNumber}</td>}
                {item.email && <td>{item.email}</td>}
                {item.employee && <td>{item.employee.userName}</td>}
                {item.task && (
                  <>
                    <td className="border-0 rounded-0">
                      {item.task && item.task.length > 0 ? (
                        <span
                          className={`${Styles["bgStatusProject"]} rounded-5 text-center px-4`}
                        >
                          {item.task[0]?.status}
                        </span>
                      ) : (
                        "No Tasks"
                      )}
                    </td>
                    <td>{item.task.length}</td>
                  </>
                )}
                {item.description && <td>{item.description}</td>}
                <td>
                  {item.creationDate
                    ? formatDate(item.creationDate)
                    : "No Creation Date"}
                </td>

                {/* Actions for Manager */}
                {userData?.userGroup === "Manager" ? (
                  <td>
                    <button
                      className="border-0 bg-transparent dropdown-toggle"
                      type="button"
                      id={`dropdown-${item.id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdown-${item.id}`}
                    >
                      {item.title ? (
                        <>
                          <li>
                            <button className="dropdown-item bg-transparent">
                              <i className="mx-2 text-success fa-regular fa-eye"></i>
                              View
                            </button>
                          </li>
                          <li>
                            <Link
                              className="text-decoration-none dropdown-item"
                              to={
                                item.employee?.userName
                                  ? `/dashboard/task-edit/${item.id}`
                                  : `/dashboard/project-edit/${item.id}`
                              }
                              state={{ listData: item, type: "edit" }}
                            >
                              <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                              Edit
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete?.(item.id)}
                              className="dropdown-item bg-transparent"
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
                              onClick={() => toggleActivation?.(item.id)}
                              className="dropdown-item bg-transparent"
                            >
                              <i
                                className={
                                  item.isActivated
                                    ? "mx-2 text-success fa-solid fa-ban"
                                    : "mx-2 text-success fa-solid fa-user"
                                }
                              ></i>
                              {item.isActivated ? "Block" : "Unblock"}
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item bg-transparent">
                              <i className="mx-2 text-success fa-regular fa-eye"></i>
                              View
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
