import React from "react";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import { Paths } from "./Paths";
import { PrivateLayout } from "../layouts/privateLayouts/PrivateLayout";
import { PrivatePaths } from "./PrivatePaths";
import { useSelector } from "react-redux";
import { PublicLayout } from "../layouts/publicLayouts/PublicLayout";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated == 3) {
    return <Navigate to="/private-layout/dashboard" replace />;
  }
  return <Outlet />;
}

// This function is used for Authentication when user's credentials will be invalid.
function PrivateRoute({ isAuthenticated }) {
  if (isAuthenticated != 3) return <Navigate to="/" />;
  return <Outlet />;
}

export default function AllRoutes() {
  const token = useSelector((state) => state?.LoginSlice?.data?.profileStatus);
  const tokenForManage = useSelector((state) => state?.LoginSlice?.verifyOtp?.profileStatus);
  console.log(tokenForManage ,token , "-------------------tokennn" );

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={token ?? tokenForManage} />}>
          <Route path="/" element={<PublicLayout />}>
            {Paths.map((routes, index) => (
              <Route key={index} path={routes.path} element={routes.component} />
            ))}
          </Route>
        </Route>

        <Route element={<PrivateRoute isAuthenticated={token ?? tokenForManage} />}>
          <Route path="/private-layout" element={<PrivateLayout />}>
            {PrivatePaths.map((routes, index) => (
              <Route key={index} path={`${routes.path}`} element={routes.component} />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.string
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.string
};
