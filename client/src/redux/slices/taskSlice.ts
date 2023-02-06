import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from '../Thunks/taskThunks/getTodosThunk';
import { createTodosThunk } from '../Thunks/taskThunks/createTodosThunk';
import { createFullTodosThunk } from '../Thunks/taskThunks/createFullTodosThunk';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface taskSliceState {
  taskState: ElType[];
  fullTaskState: ElType;
  status: 'loading' | 'success' | 'error';
  error: string;
}

const initialState: taskSliceState = {
  taskState: [],
  fullTaskState: {
    id: 0,
    title: '',
    isDone: true,
    user_id: 0,
    createdAt: '',
    updatedAt: '',
  },
  status: Status.LOADING,
  error: '',
};

export type ElType = {
  id: number,
  title: string,
  isDone: boolean | null,
  user_id: number,
  createdAt: string,
  updatedAt: string,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
},

extraReducers: (builder) => {
  //
  builder.addCase(fetchTodos.pending, (state) => {
    state.taskState = [];
    state.status = 'loading';
  });

  builder.addCase(fetchTodos.fulfilled, (state, action) => {
    state.taskState = action.payload;
    state.status = 'success';
  });

  builder.addCase(fetchTodos.rejected, (state) => {
    state.status = 'error';
    state.error = 'error in fetchTodos';
  });
  //
  builder.addCase(createTodosThunk.fulfilled, (state, action) => {
    state.taskState.push(action.payload);
    state.status = 'success';
  });

  builder.addCase(createTodosThunk.rejected, (state, action) => {
    state.status = 'error';
    state.error = 'error in createTodosThunk';
  });
  //

  builder.addCase(createFullTodosThunk.fulfilled, (state, action) => {
    state.fullTaskState = action.payload;
    state.status = 'success';
  });

  builder.addCase(createFullTodosThunk.rejected, (state, action) => {
    state.status = 'error';
    state.error = 'error in createFullTodosThunk';
  });
}
});

export default taskSlice.reducer;