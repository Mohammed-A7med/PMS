export interface ApiResponseForProject {
  data: ProjectsListResponse[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface ProjectsListResponse {
  id: number;
  title: string;
  creationDate: string;
  description: string;
  task: Task[];
}

interface Task {
  userName: string;
  status: string;
}

export interface ProjectFilterOptions {
  title?: string;
  pageSize?: number;
  pageNumber?: number;
}
