import { Navigate } from "react-router-dom";
import userStore from "../store/Userstore";

const CheckUser = ({ children }) => {
  const user = userStore((state) => state.user);
  if (user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default CheckUser;
