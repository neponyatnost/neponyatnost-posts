import { FC, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchCommentsRequest } from '../../../reducers/commentsSlice'
import RandomAvatar from '../UI/Avatar/RandomAvatar'

interface CommentsProps {}

const Comments: FC<CommentsProps> = () => {
  const { comments, isLoading, error } = useAppSelector(
    (state) => state.commentsReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCommentsRequest())
  }, [dispatch, comments])

  const commentTime = new Date().toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {isLoading && <Skeleton count={2} />}
      {error && <p>{error}</p>}
      {comments &&
        comments.map((com) => (
          <div className='card mb-4 w-50' key={Math.random()}>
            <div className='card-body'>
              <div className='d-flex justify-content-between mb-2'>
                <div className='d-flex flex-row align-items-center'>
                  <Link to={`users/${com.id}`}>
                    <RandomAvatar size={25} />
                  </Link>
                  <p className='small mb-0 ms-2'>Martha</p>
                </div>
                <p className='small'>{commentTime}</p>
              </div>
              <hr />
              <p>Type your note, and hit enter to add it</p>
            </div>
          </div>
        ))}
      <div className='card mb-4 w-50'>
        <div className='card-body'>
          <div className='d-flex justify-content-between mb-2'>
            <div className='d-flex flex-row align-items-center'>
              <RandomAvatar size={25} />
              <p className='small mb-0 ms-2'>Martha</p>
            </div>
          </div>
          <hr />
          <p>Type your note, and hit enter to add it</p>
        </div>
      </div>
      <div className='card mb-4 w-50'>
        <div className='card-body'>
          <div className='d-flex justify-content-between mb-2'>
            <div className='d-flex flex-row align-items-center'>
              <RandomAvatar size={25} />
              <p className='small mb-0 ms-2'>Martha</p>
            </div>
          </div>
          <hr />
          <p>Type your note, and hit enter to add it</p>
        </div>
      </div>
    </>
  )
}

export default Comments
