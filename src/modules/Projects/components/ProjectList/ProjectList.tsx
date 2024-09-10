import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PROJECTS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import {
  ApiResponseForProject,
  ProjectFilterOptions,
  ProjectsListResponse,
} from "../../../../interfaces/Projects/ProjectsListResponse";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";
import TableWithActions from "../../../Shared/components/TableWithActions/TableWithActions";
import Title from "../../../Shared/components/Title/Title";
import UpDownArrows from "../../../Shared/components/UpDownArrows/UpDownArrows";
import CardsWithActions from "../../../Shared/components/CardsWithActions/CardsWithActions";
import { AuthContext } from "../../../../context/AuthContext";
import Loading from "../../../Shared/components/Loading/Loading";

export default function ProjectList() {
  const [projectsList, setProjectsList] = useState<ProjectsListResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userData }: any = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoadind] = useState<number>(0);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModel = (projectId: number) => {
    setProjectId(projectId);
    setShowModal(true);
  };

  // Function to fetch the list of Projects from the API
  const getAllProject = async (params: ProjectFilterOptions | null = null) => {
    if (counterLoading == 0) {
      setLoading(true);
      setCounterLoadind(1);
    }
    try {
      const userGroup = await userData?.userGroup;
      let url: string;
      if (userGroup === "Manager") {
        url = PROJECTS_URLs.getProjectsForManagerUrl;
      } else if (userGroup === "Employee") {
        url = PROJECTS_URLs.getProjectsForEmployeeUrl;
      }
      else {
        throw new Error('User group is not defined or recognized.');
      }
      // Make the request with the determined URL
      const response = await axios.get<ApiResponseForProject>(url, {
        headers: requstHeader,
        params: {
          title: params?.title,
          pageSize: params?.pageSize,
          pageNumber: params?.pageNumber,
        },
      });
      // Setting the array of pages for pagination based on the total number of pages received
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setNumOfRecords(response.data.totalNumberOfRecords);
      setProjectsList(response.data?.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a project
  const DeleteProject = async () => {
    try {
      const response = await axios.delete(
        PROJECTS_URLs.deleteProjectUrl(projectId),
        { headers: requstHeader }
      );
      console.log(response);
      handleCloseModal();
      getAllProject();
      toast.success("Project deleted successfully.");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to delete the project. Please try again."
      );
    }
  };

  useEffect(() => {
    const title = searchParams.get("title") || "";
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
    getAllProject({ title, pageNumber });
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Title component displays a title and optionally a button that links to a specified path */}
          <Title
            titel={"Projects"}
            buttonText={`Add New Project`}
            linkPath="/dashboard/project-data"
          />

          {/* DeleteConfirmationModal component displays a confirmation dialog when deleting an item */}
          <DeleteConfirmationModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleDeleteModal={DeleteProject}
            itemName={"Project"}
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
                  Num Tasks <UpDownArrows />
                </th>
                <th scope="col">
                  Description <UpDownArrows />
                </th>
                <th scope="col">
                  Date Created <UpDownArrows />
                </th>
                <th scope="col"></th>
              </>
            }
            list={projectsList}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            ComponentName={"Project"}
            searchKey={"title"}
            handleDelete={handleShowModel}
          />

          <CardsWithActions
            list={projectsList}
            handleDelete={handleShowModel}
          />

          {/* Page navigator for handling pagination */}
          <PageNavigator
            arrayOfPages={arrayOfPages}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            numOfRecords={numOfRecords}
          />
        </>
      )}
    </>
  );
}
