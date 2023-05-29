import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '../models/types'

export interface CommentsState {
  comments: IComment[]
  isLoading: boolean
  error: string
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: '',
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsRequest(state) {
      state.isLoading = true
    },
    fetchCommentsSuccess(state, action: PayloadAction<IComment[]>) {
      state.comments = action.payload
      state.isLoading = false
      state.error = ''
    },
    fetchCommentsFail(state, action: PayloadAction<string>) {
      state.comments = []
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFail } =
  commentsSlice.actions

export default commentsSlice.reducer
