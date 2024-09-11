import Title from "../../../Shared/components/Title/Title";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskFormData } from "../../../../interfaces/Tasks/TasksDataResponse";
import { RequiredField } from "../../../../constans/VALIDATIONS";
import axios, { AxiosError } from "axios";
import {
  PROJECTS_URLs,
  TASKS_URLs,
  USERS_URLs,
  requstHeader,
} from "../../../../constans/END_POINTS";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import { useEffect, useState } from "react";
import {
  ApiResponseForUser,
  UsersListResponse,
} from "../../../../interfaces/Users/UserListResponse";
import {
  ApiResponseForProject,
  ProjectsListResponse,
} from "../../../../interfaces/Projects/ProjectsListResponse";

export default function TaskData() {
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.type === "edit";
  const taskData = location.state?.listData;
  const [userList, setUserList] = useState<UsersListResponse[]>([]);
  const [projectList, setProjectList] = useState<ProjectsListResponse[]>([]);
  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>();

  // Function to handle form submission
  const onsubmit = async (data: TaskFormData) => {
    try {
      // Send API request based on the mode (update or create)
      const respone = await axios({
        method: status ? "put" : "post",
        url: status
          ? `${TASKS_URLs.updateTaskUrl(taskData.id)}`
          : `${TASKS_URLs.createTaskUrl}`,
        data: data,
        headers: requstHeader(),
      });
      console.log(respone);
      if (status) {
        toast.success("Task updated! All changes have been saved.");
        navigate("/dashboard/task-list");
      } else {
        toast.success("New task has been added successfully.");
        navigate("/dashboard/task-list");
      }
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  // Function to get User List
  const getUsersList = async () => {
    try {
      const response = await axios.get<ApiResponseForUser>(
        USERS_URLs.getAllUsersUrl,
        {
          headers: requstHeader(),
        }
      );
      setUserList(response.data?.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "An error occurred. Please try again."
      );
    }
  };

  // Function to get User List
  const getProjectsList = async () => {
    try {
      const response = await axios.get<ApiResponseForProject>(
        PROJECTS_URLs.getProjectsForManagerUrl,
        {
          headers: requstHeader(),
        }
      );
      setProjectList(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    getUsersList();
    getProjectsList();
    if (status && taskData) {
      setUserId(taskData.employee?.id);
      setProjectId(taskData.project?.id);
    }
  }, []);

  return (
    <>
      {/* Dynamic title based on mode */}
      <Title
        titel={status ? "Update a Task" : "Add a New Task"}
        linKText="View All Tasks"
        pathBack="/task-list"
      />

      <div className="container w-75 bg-white my-5 p-3 rounded-4 shadow-sm">
        {/* Form for project data */}
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* Title input */}
          <div className="mb-4">
            <label className="my-2 ms-2">Title</label>
            <input
              type="text"
              className="form-control rounded-4 my-2"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              {...register("title", RequiredField("title"))}
              defaultValue={status ? taskData.title : ""}
            />
            {errors.title && (
              <span className="text-danger mt-2">{errors.title.message}</span>
            )}
          </div>

          {/* Description textarea */}
          <div className="my-4">
            <label className="my-2 ms-2">Description</label>
            <textarea
              className="form-control rounded-4 my-2"
              placeholder="Description"
              {...register("description", RequiredField("description"))}
              defaultValue={status ? taskData.description : ""}
            ></textarea>
            {errors.description && (
              <span className="text-danger mt-2">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Columns for the  User field and Project field  */}
          <div className="row my-4">
            <div className="col-md-6">
              <div className="mb-4">
                <label className="my-2 ms-2">User</label>
                <select
                  className="form-control rounded-4 my-2"
                  {...register("employeeId", RequiredField("User"))}
                  value={userId}
                  onChange={(e) => setUserId(e.target?.value)}
                >
                  <option value="">User</option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <span className="text-danger mt-2">
                    {errors.employeeId.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="my-2 ms-2">Project</label>
                <select
                  className="form-control rounded-4 my-2"
                  {...register("projectId", RequiredField("projectId"))}
                  value={projectId}
                  onChange={(e) => setProjectId(e.target?.value)}
                >
                  <option value="">Project</option>
                  {projectList.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>

                {errors.projectId && (
                  <span className="text-danger mt-2">
                    {errors.projectId.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Buttons for cancel and submit */}
          <div className="btn-container d-flex justify-content-between align-items-center border-1 border-top py-4">
            <button
              onClick={() => navigate("/dashboard/task-list")}
              className="btn btn-outline-dark rounded-pill py-2 px-md-4"
            >
              Cancel
            </button>

            <button
              className="btn btn-warning rounded-pill py-2 px-md-4 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  please wait...{" "}
                  <i className="fa-solid fa-spinner fa-spin mx-1"></i>
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// className="form-control rounded-4 my-2"
//                   placeholder="User"
//                   aria-label="User"
//                   aria-describedby="basic-addon1"
//
//                   defaultValue={status ? taskData.employeeId : ""}
