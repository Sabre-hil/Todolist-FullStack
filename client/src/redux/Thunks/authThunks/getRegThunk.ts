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
      const responce = await fetch('http://localhost:3005/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      try {
        const data = await responce.json();
        if (!responce.ok) {
          throw new Error("Server Error!");
        }
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
  }
)
