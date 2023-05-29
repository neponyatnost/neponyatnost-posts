import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../models/types'

export interface UsersState {
  users: IUser[]
  isLoading: boolean
  error: string
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.isLoading = true
    },
    fetchUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload
      state.isLoading = false
      state.error = ''
    },
    fetchUsersFail(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.users = []
      state.isLoading = false
    },
  },
})

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFail } =
  usersSlice.actions

export default usersSlice.reducer
