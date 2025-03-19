import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useAuth = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = Boolean(user && token);

  return {
    user,
    token,
    isAuthenticated,
  };
}; 