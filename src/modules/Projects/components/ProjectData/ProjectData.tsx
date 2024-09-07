import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PROJECTS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { RequiredField } from "../../../../constans/VALIDATIONS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import { ProjectFormData } from "../../../../interfaces/Projects/ProjectsDataResponse";
import Title from "../../../Shared/components/Title/Title";

export default function ProjectData() {
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.type === "edit";
  const ProjectData = location.state?.listData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>();

  // Function to handle form submission
  const onsubmit = async (data: ProjectFormData) => {
    try {
      // Send API request based on the mode (update or create)
      const respone = await axios({
        method: status ? "put" : "post",
        url: status
          ? `${PROJECTS_URLs.updateProjectUrl(ProjectData.id)}`
          : `${PROJECTS_URLs.createProjectUrl}`,
        data: data,
        headers: requstHeader,
      });
      console.log(respone);
      if (status) {
        toast.success("Project updated! All changes have been saved.");
        navigate("/dashboard/project-list");
      } else {
        toast.success("New project has been added successfully.");
        navigate("/dashboard/project-list");
      }
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <>
      {/* Dynamic title based on mode */}
      <Title
        titel={status ? "Update a Project" : "Add a New Project"}
        linKText="View All Projects"
        pathBack="/project-list"
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
              defaultValue={status ? ProjectData.title : ""}
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
              defaultValue={status ? ProjectData.description : ""}
            ></textarea>
            {errors.description && (
              <span className="text-danger mt-2">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Buttons for cancel and submit */}
          <div className="btn-container d-flex justify-content-between align-items-center border-1 border-top py-4">
            <button
              onClick={() => navigate("/dashboard/project-list")}
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
