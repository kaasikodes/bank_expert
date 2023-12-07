import axios from "axios";
import { useMutation } from "react-query";

type TData = {
  userId: string;
  name: string;
};
const createData = async (props: { data: TData }) => {
  const url = `api/auth/wallet/category`;

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data = props.data;
  const response = await axios.post(url, data, config);
  return response;
};
export const useAddWalletCategory = () => {
  return useMutation((props: TData) => createData({ data: props }));
};
