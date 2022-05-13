import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/loginService";

const ProtectedRoutes = (props) => {
  const location = useLocation();
  const auth = getCurrentUser();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
