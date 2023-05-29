import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../models/types'

export interface PostsState {
  posts: IPost[]
  isLoading: boolean
  error: string
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.isLoading = true
    },
    fetchPostsSuccess(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload
      state.isLoading = false
      state.error = ''
    },
    fetchPostsFail(state, action: PayloadAction<string>) {
      state.posts = []
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFail } =
  postsSlice.actions

export default postsSlice.reducer
