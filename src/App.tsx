import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ChangePass from "./modules/Authentication/components/ChangePass/ChangePass";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import ProjectList from "./modules/Projects/components/ProjectList/ProjectList";
import Authlayout from "./modules/Shared/components/Authlayout/Authlayout";
import Masterlayout from "./modules/Shared/components/Masterlayout/Masterlayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import TaskData from "./modules/Tasks/components/TaskData/TaskData";
import TaskList from "./modules/Tasks/components/TaskList/TaskList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import UsersTasks from "./modules/Tasks/components/UsersTasks/UsersTasks";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Authlayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <Masterlayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "register", element: <Register /> },
        { path: "project-list", element: <ProjectList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "project-edit/:id", element: <ProjectData /> },
        { path: "task-list", element: <TaskList /> },
        { path: "users-tasks", element: <UsersTasks /> },
        { path: "task-data", element: <TaskData /> },
        { path: "task-edit/:id", element: <TaskData /> },
        { path: "users-list", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
