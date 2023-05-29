import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { IComment } from '../models/types'
import {
  fetchCommentsFail,
  fetchCommentsSuccess,
} from '../reducers/commentsSlice'

const getCommentsFromApi = () =>
  axios.get<IComment[]>('https://jsonplaceholder.typicode.com/comments')

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* fetchCommentsSaga(): any {
  yield delay(500)
  try {
    const { data } = yield call(getCommentsFromApi)
    yield put(fetchCommentsSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchCommentsFail(error.message))
    }
    return error
  }
}

function* commentsSaga() {
  yield takeEvery('comments/fetchCommentsRequest', fetchCommentsSaga)
}

export default commentsSaga
