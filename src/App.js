import React, { Component } from 'react'
import { Routes, Route, Navigate, Outlet, BrowserRouter } from "react-router-dom";
import { authenticatedRoutes, unAuthenticatedRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { useUserCurrent } from "./hooks/useUserCurrent";
import Page404 from "./views/pages/page404/Page404";


import './assets/scss/style.scss'

const LoginMiddleware = () => {
  const currentUser = useUserCurrent();
  if (currentUser) return <Navigate to="/" />;
  return <Outlet />;
};

const AppMiddleware = () => {
  const currentUser = useUserCurrent();
  if (!currentUser) return <Navigate to="/login" />;
  return <Outlet />;
};

const mapRoutes = (routes) => {
  return routes.map((route, index) => <Route key={index} {...route} />);
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Routes>
            <Route element={<LoginMiddleware />}>
              {mapRoutes(unAuthenticatedRoutes)}
            </Route>

            <Route element={<AppMiddleware />}>
              <Route element={<DefaultLayout />}>
                {mapRoutes(authenticatedRoutes)}
              </Route>
            </Route>
            <Route path="*" element={<Page404/>} />
          </Routes>
          {/* <HotToast /> */}
      </BrowserRouter>
    )
  }
}

export default App