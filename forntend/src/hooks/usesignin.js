import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../lib/api.js";

export default function useSignin() {
    const queryClient = useQueryClient();

    const { mutate: signinMutation, isPending, error } = useMutation({
        mutationFn: signin,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });

    return { error, isPending, signinMutation };
}
