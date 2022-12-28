import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./contacts/contactsApi";
import { filter } from './filter/filterReducer';
import { default as authReducer } from './auth/authSlice';
import storage from "redux-persist/lib/storage";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

export const store = configureStore({
    reducer: { [contactsApi.reducerPath]: contactsApi.reducer, filter,
    auth: persistReducer(authPersistConfig, authReducer),
},
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(contactsApi.middleware),
});
export const persistor = persistStore(store);