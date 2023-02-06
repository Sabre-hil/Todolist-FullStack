import { createAsyncThunk } from "@reduxjs/toolkit";

export const createFullTodosThunk = createAsyncThunk(
  'task/createFullTodosThunk',
  async function (id: string | undefined, {rejectWithValue}) {
    try {
      const responce = await fetch(`http://localhost:3005/task/:${id}`);
      if (responce.ok) {
        const data = await responce.json();
        return data;
      };
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    };
  }
);