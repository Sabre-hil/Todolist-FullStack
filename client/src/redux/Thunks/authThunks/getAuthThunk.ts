import { createAsyncThunk } from '@reduxjs/toolkit';

interface authValue {
  email: string,
  password: string,
}

export type authType = {
  id: number,
  name: string 
}
export const getAuthThunk = createAsyncThunk(
  'auth/getAuthThunk',
  async function (data: authValue, {rejectWithValue}) {
      const responce = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      try {
        const { id, name }: authType = await responce.json();
        const res = { id, name };
        if (!responce.ok) {
          throw new Error("Server Error!");
          
        }
        return res;

      } catch (error: any) {
        return rejectWithValue(error.message)
      }
  }
);
