import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { DisplayErrors } from "../utils";

const fetchItems = async (itemModle) => {
  const response = await api.get(`/${itemModle}`);
  return response.data.data;
};

const useGetItmes = (itemModle) => {
  const { data, isLoading, error, refetch, isError } = useQuery({
    queryKey: [`${itemModle}`],
    queryFn: () => fetchItems(itemModle),
    onError: (error) => {
      DisplayErrors(error);
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
export default useGetItmes;
