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
      queryClient.clear();
      queryClient.setQueryData(["authUser"], null);
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutation, isPending };
};
