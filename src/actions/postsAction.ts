import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchPostsFail, fetchPostsSuccess } from '../reducers/postsSlice'
import { IPost } from './../models/types'

const getPostsFromApi = () =>
  axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* fetchPostsSaga(): any {
  yield delay(500)
  try {
    const { data } = yield call(getPostsFromApi)
    yield put(fetchPostsSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchPostsFail(error.message))
    }
    return error
  }
}

function* postsSaga() {
  yield takeEvery('posts/fetchPostsRequest', fetchPostsSaga)
}

export default postsSaga
