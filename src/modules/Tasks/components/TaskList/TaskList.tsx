import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TASKS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import {
  ApiResponseForTaks,
  TaskFilterOptions,
  TasksListResponse,
} from "../../../../interfaces/Tasks/TasksListResponse";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";
import TableWithActions from "../../../Shared/components/TableWithActions/TableWithActions";
import Title from "../../../Shared/components/Title/Title";
import UpDownArrows from "../../../Shared/components/UpDownArrows/UpDownArrows";
import CardsWithActions from "../../../Shared/components/CardsWithActions/CardsWithActions";
import { AuthContext } from "../../../../context/AuthContext";

export default function ProjectList() {
  const [tasksList, setTasksList] = useState<TasksListResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userData }: any = useContext(AuthContext);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModel = (taskId: number) => {
    setTaskId(taskId);
    setShowModal(true);
  };

  // Function to fetch the list of Tasks from the API
  const getAllTasks = async (params: TaskFilterOptions | null = null) => {
    try {
      const response = await axios.get<ApiResponseForTaks>(
        TASKS_URLs.getAllTasksForManagerUrl,
        {
          headers: requstHeader,
          params: {
            title: params?.title,
            pageSize: params?.pageSize,
            pageNumber: params?.pageNumber,
            status: params?.status,
          },
        }
      );
      // Setting the array of pages for pagination based on the total number of pages received
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setNumOfRecords(response.data.totalNumberOfRecords);
      setTasksList(response.data?.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  // Function to delete a Task
  const DeleteTask = async () => {
    try {
      const response = await axios.delete(TASKS_URLs.deleteTaskUrl(taskId), {
        headers: requstHeader,
      });
      console.log(response);
      handleCloseModal();
      getAllTasks();
      toast.success("Task deleted successfully.");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to delete the Task. Please try again."
      );
    }
  };

  useEffect(() => {
    const title = searchParams.get("title") || "";
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
    const status = searchParams.get("status") as TaskFilterOptions["status"];
    if (userData?.userGroup === "Manager") {
      getAllTasks({ title, pageNumber, status });
    }
  }, [searchParams]);

  return (
    <>
      {/* Title component displays a title and optionally a button that links to a specified path */}
      <Title
        titel={"Tasks"}
        buttonText={`Add New Task`}
        linkPath="/dashboard/task-data"
      />

      {/* DeleteConfirmationModal component displays a confirmation dialog when deleting an item */}
      <DeleteConfirmationModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteModal={DeleteTask}
        itemName={"Task"}
      />

      {/* Table with actions including search, filter, and pagination */}
      <TableWithActions
        tHead={
          <>
            <th scope="col">
              Title <UpDownArrows />
            </th>
            <th scope="col">
              Statues <UpDownArrows />
            </th>
            <th scope="col ">
              User <UpDownArrows />
            </th>
            <th scope="col">
              Description <UpDownArrows />
            </th>
            <th scope="col">
              Date Created <UpDownArrows />
            </th>
            {userData?.userGroup === "Manager" ? <th scope="col"></th> : ""}
          </>
        }
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        searchKey={"title"}
        ComponentName={"Tasks"}
        list={tasksList}
        handleDelete={handleShowModel}
      />

      <CardsWithActions list={tasksList} handleDelete={handleShowModel} />

      {/* Page navigator for handling pagination */}
      <PageNavigator
        arrayOfPages={arrayOfPages}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        numOfRecords={numOfRecords}
      />
    </>
  );
}
