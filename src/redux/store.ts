import {configureStore} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { authorizationStatusReducer } from './slices/stateAuthorizedSlice';
import { StatusAuthorizedType } from '../model/StatusAuthorizedType';

export const store = configureStore({
    reducer: {
        authorizationStatus: authorizationStatusReducer
    }
});

export function useSelectorAuthorizationStatus() {
    return useSelector<any, StatusAuthorizedType>(state => state.authorizationStatus.status) ;
 }