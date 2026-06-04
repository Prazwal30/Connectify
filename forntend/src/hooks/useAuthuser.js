import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";

const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data.user;
    },
    retry: false,
  });

  return { authUser, isLoading };
};

export default useAuthUser;
