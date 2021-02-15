import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginItem {
  userId: number
  username: string
  token: string
}

export interface UserState {
  isLogin: boolean,
  userId: number,
  username: string,
  token: string
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userId: -1,
    username: "",
    token: "",
  },
  reducers: {
    logoff: state => {
      state.isLogin = false
      state.userId = -1
      state.username = ""
      state.token = ""
    },
    login: (state, action: PayloadAction<LoginItem>) => {
      let data = action.payload
      state.isLogin = true
      state.userId = data.userId
      state.username = data.username
      state.token = data.token
    }
  }
});

export const { logoff, login } = userSlice.actions;

export default userSlice.reducer;