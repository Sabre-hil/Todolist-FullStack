import { createAsyncThunk } from '@reduxjs/toolkit';

interface regType {
  name: string,
  email: string,
  number: string,
  password: string,
}

export const regThunk = createAsyncThunk(
  'auth/regThunk',
  async function (data: regType, {rejectWithValue}) {
    try {
      const responce = await fetch('http://localhost:3005/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (responce.ok) {
        const data = await responce.json();
        return data;
      } else {
        alert('Произошла ошибка')
      }
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)