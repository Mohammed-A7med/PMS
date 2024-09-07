export interface ApiResponseForTaks {
  data: TasksListResponse[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface TasksListResponse {
  id: number;
  employee: Employee;
  title: string;
  status: string;
  description: string;
  creationDate: string;
}

interface Employee {
  userName: string;
}

export interface TaskFilterOptions {
  title?: string;
  pageSize?: number;
  pageNumber?: number;
  status?: "ToDo" | "InProgress" | "Done";
}
