import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { USERS_URLs, requstHeader } from "../../../../constans/END_POINTS";
import { AxiosErrorResponse } from "../../../../interfaces/AuthResponse/AuthResponse";
import {
  ApiResponseForUser,
  UsersFilterOptions,
  UsersListResponse,
} from "../../../../interfaces/Users/UserListResponse";
import PageNavigator from "../../../Shared/components/PageNavigator/PageNavigator";
import TableWithActions from "../../../Shared/components/TableWithActions/TableWithActions";
import Title from "../../../Shared/components/Title/Title";
import UpDownArrows from "../../../Shared/components/UpDownArrows/UpDownArrows";
import CardsWithActions from "../../../Shared/components/CardsWithActions/CardsWithActions";
import Loading from "../../../Shared/components/Loading/Loading";

export default function UsersList() {
  const [usersList, setUsersList] = useState<UsersListResponse[]>([]);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoadind] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to fetch the list of users from the API
  const getAllUsers = async (params: UsersFilterOptions | null = null) => {
    if (counterLoading == 0) {
      setLoading(true);
      setCounterLoadind(1);
    }
    try {
      const response = await axios.get<ApiResponseForUser>(
        USERS_URLs.getAllUsersUrl,
        {
          headers: requstHeader(),
          params: {
            userName: params?.userName,
            email: params?.email,
            country: params?.country,
            groups: params?.groups,
            pageSize: params?.pageSize,
            pageNumber: params?.pageNumber,
          },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setNumOfRecords(response.data.totalNumberOfRecords);
      setUsersList(response.data?.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivation = async (id: number) => {
    try {
      const response = await axios.put(
        USERS_URLs.toggleUserUrl(id),
        {},
        {
          headers: requstHeader(),
        }
      );
      getAllUsers();
      const { isActivated } = response.data;
      toast.success(
        `User has been ${
          isActivated ? "activated" : "deactivated"
        } successfully.`
      );
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  useEffect(() => {
    const activeSearchKey =
      ["userName", "email", "country", "groups"].find((key) =>
        searchParams.has(key)
      ) || "userName";
    const searchValue = searchParams.get(activeSearchKey) || "";
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
    getAllUsers({ [activeSearchKey]: searchValue, pageNumber });
  }, [searchParams]);

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title titel={"Users"} />
          <TableWithActions
            tHead={
              <>
                <th scope="col">
                  User Name <UpDownArrows />
                </th>
                <th scope="col">
                  Statues <UpDownArrows />
                </th>
                <th scope="col">
                  Phone Number <UpDownArrows />
                </th>
                <th scope="col">
                  Email <UpDownArrows />
                </th>
                <th scope="col">
                  Date Created <UpDownArrows />
                </th>
                <th scope="col"></th>
              </>
            }
            list={usersList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            searchKey={"userName"}
            ComponentName={"Users"}
            toggleActivation={toggleActivation}
          />

          <CardsWithActions
            list={usersList}
            toggleActivation={toggleActivation}
          />

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
