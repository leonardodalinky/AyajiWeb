import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './user'
import uiReducer, { UIConfigState } from './uiconfig'

export interface RootState {
  user: UserState
  uiConfig: UIConfigState
}

export default configureStore({
  reducer: {
    user: userReducer,
    uiConfig: uiReducer
  }
})