import { motion } from "framer-motion";
import { AssignedTasksListResponse } from "../../../../interfaces/Tasks/UsersTasksResponse";
import Styles from "./UsersCard.module.css";

export default function UsersCard({
  title,
  tasks,
  status,
  changeTaskStatus,
}: {
  title: string;
  tasks: AssignedTasksListResponse[];
  status: "ToDo" | "InProgress" | "Done";
  changeTaskStatus: (taskId: string, status: string) => void;
}) {
  return (
    <div className="col-md-4 mt-3">
      <h4 className="ms-3">{title} </h4>
      <motion.div
        layout={true}
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.958 }}
            layout
            layoutId={item.id}
            key={item.id}
            draggable={true}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
              e.dataTransfer.setData("taskId", item.id);
              e.dataTransfer.setData("prevStatus", item.status);
            }}
            className={`card rounded-3 my-2 ${Styles["bg-card"]}`}
          >
            <p className="pt-2 px-2 text-white">{item.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
