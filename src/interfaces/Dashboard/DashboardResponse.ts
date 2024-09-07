export interface UserCountResponse {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export interface TaskCountResponse {
  done: number;
  inProgress: number;
  toDo:  number;
}
