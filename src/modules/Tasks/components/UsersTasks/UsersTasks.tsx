import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TASKS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import {
  ApiResponseForAssignedTaks,
  AssignedTasksListResponse,
} from "../../../../interfaces/Tasks/UsersTasksResponse";
import Title from "../../../Shared/components/Title/Title";
import UsersCard from "../UsersCard/UsersCard";

export default function UsersTasks() {
  const [assignedTasksList, setAssignedTasksList] = useState<
    AssignedTasksListResponse[]
  >([]);
  const getUserTasks = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponseForAssignedTaks>(
        TASKS_URLs.getAllAssignedTasksUrl,
        {
          headers: requstHeader(),
          params: { pageSize: 30 },
        }
      );
      setAssignedTasksList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "An error occurred. Please try again."
      );
    }
  }, []);

  const changeTaskStatus = useCallback(
    async (taskId: string, newStatus: string) => {
      const newTasks = assignedTasksList.map(
        (task: AssignedTasksListResponse) => {
          if (task.id == taskId) {
            task.status = newStatus;
            return task;
          }
          return task;
        }
      );

      setAssignedTasksList(newTasks);
      try {
        await axios.put(
          TASKS_URLs.changeStatusTaskEmployeeUrl(taskId),
          { status: newStatus },
          { headers: requstHeader() }
        );
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        toast.error(
          axiosError.response?.data.message ||
            "An error occurred. Please try again."
        );
      } finally {
        getUserTasks();
      }
    },
    [getUserTasks , assignedTasksList]
  );

  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);
  return (
    <>
      <Title titel={"Task Board"} />

      <div className="Board-container mt-5">
        <div className="row ">
          <UsersCard
            changeTaskStatus={changeTaskStatus}
            title="To Do "
            status="ToDo"
            tasks={assignedTasksList.filter((task) => task.status == "ToDo")}
          />
          <UsersCard
            changeTaskStatus={changeTaskStatus}
            title="In progress "
            status="InProgress"
            tasks={assignedTasksList.filter(
              (task) => task.status == "InProgress"
            )}
          />
          <UsersCard
            changeTaskStatus={changeTaskStatus}
            title="Done "
            status="Done"
            tasks={assignedTasksList.filter((task) => task.status == "Done")}
          />
        </div>
      </div>
    </>
  );
}
