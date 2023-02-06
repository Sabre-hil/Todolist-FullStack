import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuthState } from '../../utils/getAuthState';
import { regThunk } from '../Thunks/authThunks/getRegThunk';
import { logoutUserThunk } from '../Thunks/authThunks/logoutUserThunk';
import { getAuthThunk } from '../Thunks/authThunks/getAuthThunk';
import { authType } from '../Thunks/authThunks/getAuthThunk';

const { auth } = getAuthState();

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface AuthSliceState {
  regAndAuthState: {
    id: number,
    name: string,
  },
  status: 'loading' | 'success' | 'error' | 'undone';
  error: string;
}

const initialState: AuthSliceState = {
  regAndAuthState: auth,
  status: Status.LOADING,
  error: 'Error is defined',
};

export const authAndRegSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
},
extraReducers: (builder) => {
  // Sign in
  builder.addCase(regThunk.pending, (state) => {
    state.regAndAuthState = auth;
    state.status = 'loading';
  });
  builder.addCase(regThunk.fulfilled, (state, action) => {
    state.regAndAuthState = action.payload;
    state.status = 'success';
  });
  builder.addCase(regThunk.rejected, (state, action) => {
    state.status = 'error';
    state.error = 'error in Signin';
  });
  // Login
  builder.addCase(getAuthThunk.pending, (state) => {
    state.regAndAuthState = auth;
    state.status = 'loading';
  });
  builder.addCase(getAuthThunk.fulfilled, (state, action: PayloadAction<authType | any>) => {
    console.log('action in addcase', {action});
    state.regAndAuthState = action.payload;
    state.status = 'success';
  });
  builder.addCase(getAuthThunk.rejected, (state) => {
    state.status = 'error';
    state.error = 'was error';
  });
  // Logout
  builder.addCase(logoutUserThunk.fulfilled, (state) => {
    state.regAndAuthState = null as any;
    state.status = 'undone';
  });
  builder.addCase(logoutUserThunk.rejected, (state) => {
    state.status = 'error';
    state.error = 'error in logout';
  });
},
});

export default authAndRegSlice.reducer;