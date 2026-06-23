import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../lib/api.js";

export default function useSignin() {
    const queryClient = useQueryClient();

    const { mutate: signinMutation, isPending, error } = useMutation({
        mutationFn: signin,
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem("connectify-token", data.token);
            }
            queryClient.setQueryData(["authUser"], data.user);
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });

    return { error, isPending, signinMutation };
}
