import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './user'

export interface RootState {
  user: UserState
}

export default configureStore({
  reducer: {
    user: userReducer
  }
})