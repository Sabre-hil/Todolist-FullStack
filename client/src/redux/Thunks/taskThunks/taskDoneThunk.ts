import { createAsyncThunk } from "@reduxjs/toolkit";

interface task {
  id: number,
  isDone: boolean | null
}

export const taskDoneThunk = createAsyncThunk(
  'task/fetchTodosDone',
  async function ({id, isDone}: task, {rejectWithValue}) {
    try {
        await fetch(`http://localhost:3005/done/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isDone}),
      })
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)


// const responce = await fetch(`http://localhost:3005/done/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ isDone }),
//     })
//     if (responce.ok) {
//       await dispatch(fetchTodos({parse, sortBy}));
//     }