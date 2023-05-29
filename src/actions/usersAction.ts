import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchUsersFail, fetchUsersSuccess } from '../reducers/usersSlice'
import { IUser } from './../models/types'

const getPostsFromApi = () =>
  axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* fetchUsersSaga(): any {
  yield delay(500)
  try {
    const { data } = yield call(getPostsFromApi)
    yield put(fetchUsersSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchUsersFail(error.message))
    }
    return error
  }
}

function* usersSaga() {
  yield takeEvery('users/fetchUsersRequest', fetchUsersSaga)
}

export default usersSaga
