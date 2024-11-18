import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    selectedDoctor: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    removeDoctor: (state, action) => {
      state.doctors = state.doctors.filter(
        (doctor) => doctor.id !== action.payload
      );
    },
    selectDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
  },
});

export const { setDoctors, addDoctor, removeDoctor, selectDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
