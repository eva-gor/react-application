import {createSlice} from '@reduxjs/toolkit';
import { StatusAuthorizedType } from '../../model/StatusAuthorizedType';

const initialState: {status: StatusAuthorizedType} = {
   status: "not_authorized"
}
const slice = createSlice({
    initialState,
    name: 'authorizationStatus',
    reducers: {
        setAuthorizationState: (state, data) => {
            state.status = data.payload as StatusAuthorizedType
        }
    }
});
export const authorizationStatusActions = slice.actions;
export const authorizationStatusReducer = slice.reducer;