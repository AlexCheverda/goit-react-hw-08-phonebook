import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, getCurrentUser } from './authOperations';
const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [register.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [logIn.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [logOut.fulfilled](state) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
        },
        [getCurrentUser.pending](state) {
            state.isGettingCurrentUser = true;
        },
        [getCurrentUser.fulfilled](state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isGettingCurrentUser = false;
        },
        [getCurrentUser.rejected](state) {
            state.isGettingCurrentUser = false;
        },
    },
});

export default authSlice.reducer;