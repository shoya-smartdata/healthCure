// redux/slices/userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
  const response = await axios.post('/api/user/login', { email, password });
  // Assuming the response contains the token in the format { token: 'your-jwt-token' }
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
