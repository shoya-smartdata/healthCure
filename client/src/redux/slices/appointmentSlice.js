import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
  },
});

export const { addAppointment, removeAppointment, updateAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
