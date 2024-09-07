import axios, { AxiosError } from "axios";
import { AssignedTasksListResponse } from "../../../../interfaces/Tasks/UsersTasksResponse";
import Styles from "./UsersCard.module.css";
import { TASKS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import { toast } from "react-toastify";

export default function UsersCard({
  title,
  tasks,
  status,
  refetchTasks,
}: {
  title: string;
  tasks: AssignedTasksListResponse[];
  status: "ToDo" | "InProgress" | "Done";
  refetchTasks: () => Promise<void>;
}) {
  const changeTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await axios.put(
        TASKS_URLs.changeStatusTaskEmployeeUrl(taskId),
        { status: newStatus },
        { headers: requstHeader }
      );
      refetchTasks();
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="col-md-4 mt-3">
      <h4 className="ms-3">{title} </h4>
      <div
        onDrop={(e) => {
          e.preventDefault();
          const taskId = e.dataTransfer.getData("taskId");
          const prevStatus = e.dataTransfer.getData("prevStatus");
          if (prevStatus == status) return;
          changeTaskStatus(taskId, status);
        }}
        onDragOver={(e) => e.preventDefault()}
        className={`cards p-3 rounded-4 mt-4  ${Styles["bg-cards"]}`}
      >
        {tasks.map((item: AssignedTasksListResponse) => (
          <div
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", item.id);
              e.dataTransfer.setData("prevStatus", item.status);
            }}
            key={item.id}
            className={`card rounded-3 my-2 ${Styles["bg-card"]}`}
          >
            <p className="pt-2 px-2 text-white">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
