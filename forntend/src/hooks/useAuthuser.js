import { getAuthUser } from "../lib/api.js"
import { useQuery} from "@tanstack/react-query"
const useAuthUser = () => {

const { data: authUser, isLoading, error } = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry:false,
});

return {isLoading, authUser, error}

}

export default useAuthUser;
