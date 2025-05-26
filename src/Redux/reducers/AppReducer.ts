import {createSlice} from '@reduxjs/toolkit';
import {AppStrings} from '../../Utils/Strings';
import {IReduxState} from '../../Utils/AppTypes';

const initialState: IReduxState = {
  isLoaderStart: false,
  isNetConnected: true,
  safeArea: {top: 0, bottom: 0},
  userData: null,
  isNotchDevice: false,
  fetchUpdatedUser: new Date().toISOString(),
  alertObj: null,
};

export const AppSlice = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setSafeArea: (state, action) => {
      state.safeArea = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsNotchDevice: (state, action) => {
      state.isNotchDevice = action.payload;
    },
    setNetConnected: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setFetchUpdatedUser: (state, action) => {
      state.fetchUpdatedUser = action.payload;
    },
    setAlertObj: (state, action) => {
      state.alertObj = action.payload;
    },
  },
});

export const {
  setLoader,
  setSafeArea,
  setUserData,
  setIsNotchDevice,
  setNetConnected,
  setFetchUpdatedUser,
  setAlertObj,
} = AppSlice.actions;

export default AppSlice.reducer;
