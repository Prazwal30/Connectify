import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";

const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        return response.data.user;
      } catch (error) {
        if (error.response?.status === 401) return null;
        throw error;
      }
    },
    retry: false,
  });

  return { authUser, isLoading };
};

export default useAuthUser;
