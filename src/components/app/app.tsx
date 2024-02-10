import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Devices from "../../pages/devices/devices";
import Layout from "../layout/layout";
import Patients from "../../pages/patients/patients";
import PrivateRoute from "../private-route/private-route";
import {AuthorizationStatus} from "../../const/authorization-status";
import {AppRoutes} from "../../const/app-routes";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Measurements from "../../pages/measurements/measurements";
import SignIn from "../../pages/sign-in/sign-in";
import {Navigate} from "react-router-dom";
import HistoryRouter from "../history-route/history-route";
import browserHistory from "../history-route/browser-history";
import {useAppSelector} from "../../hooks/hooks";
import {getAuthorizationStatus} from "../../store/auth-data/selectors";
import AddPatient from "../../pages/add-patient/add-patient";
import Patient from "../../pages/patient/patient";
import EditPatient from "../../pages/edit-patient/edit-patient";
import Logs from "../../pages/logs/logs";

function App() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
      <HistoryRouter history={browserHistory}>
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
                  path={AppRoutes.Measurements}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Measurements />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.Patient(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Patient />
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
                  path={AppRoutes.AddPatient}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddPatient />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.EditPatient(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <EditPatient />
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
                  path={AppRoutes.Logs}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Logs />
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
      </HistoryRouter>
  );
}

export default App;
