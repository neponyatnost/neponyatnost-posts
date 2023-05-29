import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import commentsSaga from '../actions/commentsAction'
import postsSaga from '../actions/postsAction'
import usersSaga from '../actions/usersAction'
import commentsReducer from '../reducers/commentsSlice'
import postsReducer from '../reducers/postsSlice'
import usersReducer from '../reducers/usersSlice'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  postsReducer,
  commentsReducer,
  usersReducer,
})

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware, logger),
  middleware: [sagaMiddleware],
})

function* rootSaga() {
  yield all([postsSaga(), commentsSaga(), usersSaga()])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
