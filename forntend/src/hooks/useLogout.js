import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios.js";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== "authUser",
      });
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutation, isPending };
};
