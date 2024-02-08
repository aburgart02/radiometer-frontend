import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {store} from "./store";
import {checkAuthAction} from "./store/api-actions/api-actions";

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store = {store}>
            <ToastContainer />
            <App />
        </Provider>
    </React.StrictMode>
);