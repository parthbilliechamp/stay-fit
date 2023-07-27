import React from "react";
import { Navigate } from "react-router-dom";
import userStore from "../store/Userstore";

const RequireAuth = ({ children }) => {
  const user = userStore((state) => state.user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireAuth;
