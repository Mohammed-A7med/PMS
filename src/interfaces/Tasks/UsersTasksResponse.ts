export interface ApiResponseForAssignedTaks {
  data: AssignedTasksListResponse[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface AssignedTasksListResponse {
  id: string;
  title: string;
  status: "ToDo" | "InProgress" | "Done" | string;

}
