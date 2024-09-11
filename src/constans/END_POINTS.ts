const BASE_URLS = "https://upskilling-egypt.com:3003/api/v1";
export const requstHeader = ()=>{
  return {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
}
//USERS urls
const BASE_USERS = `${BASE_URLS}/Users`;

export const AUTH_URLs = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  verifyAccount: `${BASE_USERS}/verify`,
  forgotPassword: `${BASE_USERS}/Reset/Request`,
  ResetPassword: `${BASE_USERS}/Reset`,
  ChangePassword: `${BASE_USERS}/ChangePassword`,
};

export const USERS_URLs = {
  CreateAnManagerUrl : `${BASE_USERS}/Create`,
  GetUserByIdUrl : (id: number) => `${BASE_USERS}/${id}`,
  toggleUserUrl: (id: number) => `${BASE_USERS}/${id}`,
  countUsersUrl: `${BASE_USERS}/count`,
  getUsersByManagerUrl: `${BASE_USERS}/Manager`,
  getAllUsersUrl: `${BASE_USERS}`,
  GetCurrentUserUrl: `${BASE_USERS}/currentUser`,
};

//PROJECTS urls  Project
const BASE_PROJECTS = `${BASE_URLS}/Project`;

export const PROJECTS_URLs = {
  createProjectUrl: `${BASE_PROJECTS}`,
  getProjectUrl: (id: number) => `${BASE_PROJECTS}/${id}`,
  updateProjectUrl: (id: number) => `${BASE_PROJECTS}/${id}`,
  deleteProjectUrl: (id: number) => `${BASE_PROJECTS}/${id}`,
  getProjectsForManagerUrl: `${BASE_PROJECTS}/manager`,
  getProjectsForEmployeeUrl: `${BASE_PROJECTS}/employee`,
  getAllProjectsUrl: `${BASE_PROJECTS}`,
};

//TASKS urls
const BASE_TASKS = `${BASE_URLS}/Task`;

export const TASKS_URLs = {
  createTaskUrl: `${BASE_TASKS}`,
  getAllAssignedTasksUrl: `${BASE_TASKS}`,
  getAllTasksForManagerUrl: `${BASE_TASKS}/manager`,
  getTaskUrl: (id: number) => `${BASE_TASKS}/${id}`,
  updateTaskUrl: (id: number) => `${BASE_TASKS}/${id}`,
  deleteTaskUrl: (id: number) => `${BASE_TASKS}/${id}`,
  countTasksUrl: `${BASE_TASKS}/count`,
  changeStatusTaskEmployeeUrl: (id: string) =>
    `${BASE_TASKS}/${id}/change-status`,
  getAllTaskUrl: (id: number) => `${BASE_TASKS}/project/${id}`,
};
