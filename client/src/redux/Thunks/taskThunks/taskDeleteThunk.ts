import { createAsyncThunk } from "@reduxjs/toolkit";

interface task {
  id: number,
  isDone: boolean | null
}

export const taskDeleteThunk = createAsyncThunk(
  'task/taskDeleteThunk',
  async function ({id, isDone}: task, {rejectWithValue}) {
    try {
      if (isDone) {
          await fetch(`http://localhost:3005/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } else {alert('Ваша задача не выполнена, вы не можете ее удалить')}
    } catch (error) {
      
    }
  }
)




// if (isDone) {
//   const responce = await fetch(`http://localhost:3005/delete/${id}`, {
//   method: 'DELETE',
//   headers: {
//   'Content-Type': 'application/json',
// }
// })
// if (responce.ok) {
//   await dispatch(fetchTodos({parse, sortBy}));
// }
// } else {alert('Ваша задача не выполнена, вы не можете ее удалить')}