import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async function (data, {rejectWithValue}) {
    try {
        await fetch('http://localhost:3005/logout', {
        credentials: 'include',
      });
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)