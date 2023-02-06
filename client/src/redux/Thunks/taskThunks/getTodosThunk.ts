import { createAsyncThunk } from '@reduxjs/toolkit';
import { ElType } from '../../slices/taskSlice';

export type ParseType = {
  parse: {
    id: number,
    name: string,
  }
}

export type UserType = {
  parse: {
    id: number,
    name: string,
  }
}

export type TaskParams = {
  sortBy: string,
  parse: ParseType,
}

export const fetchTodos = createAsyncThunk<ElType[], TaskParams>(
  'task/fetchTodos',
  async function ({parse, sortBy}, {rejectWithValue}) {
    try {
      if (localStorage.getItem('auth')) {
        const responce = await fetch(`http://localhost:3005/${sortBy}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(parse),
        })
        if (responce.ok) {
          const data = responce.json();
          return data;
        }
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