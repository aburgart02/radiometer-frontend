import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Devices from "../../pages/devices/devices/devices";
import Layout from "../layout/layout";
import Patients from "../../pages/patients/patients/patients";
import PrivateRoute from "../private-route/private-route";
import {AuthorizationStatus} from "../../const/authorization-status";
import {AppRoutes} from "../../const/app-routes";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Measurements from "../../pages/measurements/measurements/measurements";
import SignIn from "../../pages/sign-in/sign-in";
import {Navigate} from "react-router-dom";
import HistoryRouter from "../history-route/history-route";
import browserHistory from "../history-route/browser-history";
import {useAppSelector} from "../../hooks/hooks";
import {getAuthorizationStatus} from "../../store/auth-data/selectors";
import AddPatient from "../../pages/patients/add-patient/add-patient";
import Patient from "../../pages/patients/patient/patient";
import EditPatient from "../../pages/patients/edit-patient/edit-patient";
import Logs from "../../pages/logs/logs/logs";
import Log from "../../pages/logs/log/log";
import Tokens from "../../pages/tokens/tokens/tokens";
import AddToken from "../../pages/tokens/add-token/add-token";
import Token from "../../pages/tokens/token/token";
import EditToken from "../../pages/tokens/edit-token/edit-token";
import Users from "../../pages/users/users/users";
import User from "../../pages/users/user/user";
import AddUser from "../../pages/users/add-user/add-user";
import EditUser from "../../pages/users/edit-user/edit-user";
import Device from "../../pages/devices/device/device";
import AddDevice from "../../pages/devices/add-device/add-device";
import EditDevice from "../../pages/devices/edit-device/edit-device";
import AddCalibration from "../../pages/calibrations/add-calibration/add-calibration";
import Calibration from "../../pages/calibrations/calibration/calibration";
import EditCalibration from "../../pages/calibrations/edit-calibration/edit-calibration";
import Measurement from "../../pages/measurements/measurement/measurement";
import AddMeasurement from "../../pages/measurements/add-measurement/add-measurement";
import SelectPatient from "../../pages/patients/select-patient/select-patient";
import SelectDevice from "../../pages/devices/select-device/select-device";
import SelectUser from "../../pages/users/select-user/select-user";

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
                  path={AppRoutes.Measurement(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Measurement />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.AddMeasurement}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddMeasurement />
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
                  path={AppRoutes.SelectPatient}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <SelectPatient />
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
                  path={AppRoutes.Device(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Device />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.AddDevice}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddDevice />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.EditDevice(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <EditDevice />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.SelectDevice}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <SelectDevice />
                          </Layout>
                      </PrivateRoute>
                  }
              />

              <Route
                  path={AppRoutes.Calibration(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Calibration />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.AddCalibration(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddCalibration />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.EditCalibration(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <EditCalibration />
                          </Layout>
                      </PrivateRoute>
                  }
              />

              <Route
                  path={AppRoutes.Users}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Users />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.User(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <User />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.AddUser}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddUser />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.EditUser(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <EditUser />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.SelectUser}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <SelectUser />
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
                  path={AppRoutes.Log(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Log />
                          </Layout>
                      </PrivateRoute>
                  }
              />

              <Route
                  path={AppRoutes.Tokens}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Tokens />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.Token(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <Token />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.AddToken}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <AddToken />
                          </Layout>
                      </PrivateRoute>
                  }
              />
              <Route
                  path={AppRoutes.EditToken(':id')}
                  element={
                      <PrivateRoute authorizationStatus={authorizationStatus}>
                          <Layout>
                              <EditToken />
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
