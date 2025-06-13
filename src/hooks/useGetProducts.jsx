import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const fetchItems = async (itemModel) => {
  const response = await api.get(`/${itemModel}`);
  return response.data.data;
};

const useGetItems = (itemModel) => {
  const { data, isLoading, error, refetch, isError } = useQuery({
    queryKey: [`${itemModel}`],
    queryFn: () => fetchItems(itemModel),
    onError: (error) => {
      console.error(`Error fetching ${itemModel}:`, error);
      toast.error(`Failed to load ${itemModel}`);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetItems;