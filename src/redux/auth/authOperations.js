import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const register = createAsyncThunk('auth/register', async credentials => {
  console.log(credentials);
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
    } catch (error) {
      Notiflix.Notify.info(
        'Something went wrong, please, try again in a minute!'
      );
      console.log(error.message);
    }
});
export const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      Notiflix.Notify.info(
          'Something went wrong, please, try again in a minute!'
      );

      console.log(error.message);
    }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
      await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      Notiflix.Notify.info(
          'Something went wrong, please, try again in a minute!'
      );
      console.log(error.message);
    }
});

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkApi) => {
      const state = thunkApi.getState();
      const persistedToken = state.auth.token;
    if (persistedToken === null) {
        return thunkApi.rejectWithValue();
    }
      token.set(persistedToken);
    try {
        const { data } = await axios.get('/users/current');
        return data;
    } catch (error) {
        Notiflix.Notify.info(
            'Something went wrong, please, try again in a minute!'
        );
        console.log(error.message);
    }
  }
);