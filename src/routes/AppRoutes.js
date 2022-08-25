import React, { lazy, Suspense } from "react";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

// import RouteGuardLogin from "./RouteGuardLogin";
// import RouteGuardDashboard from "./RouteGuardDashboard";

//history
import { history } from "../helpers/history.js";
//pages

const Home = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login"));

function useAuth() {
  let flag = false;

  //check user has JWT token
  localStorage.getItem("token") ? (flag = true) : (flag = false);
  return flag;
}

function LoginOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
}

function PrivateOutlet() {
  const auth = !useAuth();
  return auth ? <Outlet /> : <Navigate to="/dashboard" />;
}

function AppRoutes() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LoginOutlet />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route element={<PrivateOutlet />}>
            <Route exact path="/" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
