export interface ApiResponseForUser {
  data: UsersListResponse[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number; 
}

export interface UsersListResponse {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}

export interface UsersFilterOptions {
  userName?: string;
  email?: string;
  country?: string;
  groups?: 1 | 2;
  pageSize?: number;
  pageNumber?: number;
}

