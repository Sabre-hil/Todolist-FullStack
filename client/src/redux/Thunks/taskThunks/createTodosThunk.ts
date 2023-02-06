import { createAsyncThunk } from "@reduxjs/toolkit";

interface todoType {
  title?: string
}

export const createTodosThunk = createAsyncThunk(
  'task/createTodosThunk',
  async function (data: todoType, {rejectWithValue}) {
    try {
      const responce = await fetch('http://localhost:3005/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      if (responce.ok) {
        const res = await responce.json();
        return res
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