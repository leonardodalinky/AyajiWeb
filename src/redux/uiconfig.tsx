import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIConfigState {
  drawerState: {
    open: boolean
  },
}

const initialState: UIConfigState = {
  drawerState: {
    open: false
  }
}

export const uiConfigSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerState.open = action.payload
    }
  }
});

export const { toggleDrawer } = uiConfigSlice.actions;

export default uiConfigSlice.reducer;