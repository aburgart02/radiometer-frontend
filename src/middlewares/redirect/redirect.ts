import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../components/history-route/browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../../store/root-reducer/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
    () =>
        (next) =>
            (action: PayloadAction<string>) => {
                if (action.type === 'redirectToRoute') {
                    browserHistory.push(action.payload);
                }

                return next(action);
            };
