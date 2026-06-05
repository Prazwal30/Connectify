import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";

export default function useLogin() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });

    return {
        error: mutation.error,
        isPending: mutation.isPending,
        loginMutation: mutation.mutate,
    };
}
