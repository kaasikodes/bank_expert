import axios from "axios";
import { useMutation } from "react-query";

type TData = {
  userId: string;
  categoryId: string;
  addresses: string[];
};
const createData = async (props: { data: TData }) => {
  const url = `api/auth/wallet/assign-to-category`;

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data = props.data;
  const response = await axios.post(url, data, config);
  return response;
};
export const useAssignWalletsACategory = () => {
  return useMutation((props: TData) => createData({ data: props }));
};
