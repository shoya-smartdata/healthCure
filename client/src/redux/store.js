import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
  },
});

export default store;
