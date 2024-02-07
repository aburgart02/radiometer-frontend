import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Devices from "../../pages/devices/devices";
import Layout from "../layout/layout";
import Patients from "../../pages/patients/patients";
import PrivateRoute from "../private-route/private-route";
import {AuthorizationStatus} from "../../const/authorization-status";
import {AppRoutes} from "../../const/app-routes";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Researches from "../../pages/researches/researches";
import SignIn from "../../pages/sign-in/sign-in";
import {Navigate} from "react-router-dom";

function App() {
  const authorizationStatus = AuthorizationStatus.Auth;

  return (
      <Routes>
          <Route
              path={AppRoutes.SignIn}
              element={
                  authorizationStatus === AuthorizationStatus.Auth
                      ? <Navigate to={AppRoutes.Main} />
                      : <SignIn />
              }
          />
          <Route
              path={AppRoutes.Main}
              element={
                  <PrivateRoute authorizationStatus={authorizationStatus}>
                      <Layout>
                          <></>
                      </Layout>
                  </PrivateRoute>
              }
          />
          <Route
              path={AppRoutes.Researches}
              element={
                  <PrivateRoute authorizationStatus={authorizationStatus}>
                      <Layout>
                          <Researches />
                      </Layout>
                  </PrivateRoute>
              }
          />
          <Route
              path={AppRoutes.Patients}
              element={
                  <PrivateRoute authorizationStatus={authorizationStatus}>
                      <Layout>
                          <Patients />
                      </Layout>
                  </PrivateRoute>
              }
          />
          <Route
              path={AppRoutes.Devices}
              element={
                  <PrivateRoute authorizationStatus={authorizationStatus}>
                      <Layout>
                          <Devices />
                      </Layout>
                  </PrivateRoute>
              }
          />
          <Route
              path={AppRoutes.NotFound}
              element={
                  <NotFoundPage />
              }
          />
      </Routes>
  );
}

export default App;
