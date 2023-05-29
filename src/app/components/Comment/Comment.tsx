import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { IComment } from '../../../models/types'
import { fetchUsersRequest } from '../../../reducers/usersSlice'
import RandomAvatar from '../UI/Avatar/RandomAvatar'

interface CommentProps {
  comment: IComment
  userId: number
}

const Comment: FC<CommentProps> = ({ comment, userId }) => {
  const { users, isLoading, error } = useAppSelector(
    (state) => state.usersReducer
  )
  const {
    posts: postsFromApi,
    isLoading: postsIsLoading,
    error: postsError,
  } = useAppSelector((state) => state.postsReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersRequest())
  }, [dispatch])

  const commentTime = new Date().toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className='card mb-4 w-100'>
      <div className='card-body'>
        <div className='d-flex justify-content-between mb-2'>
          <div className='d-flex flex-row align-items-center'>
            <RandomAvatar size={25} />

            <p className='small mb-0 ms-2'>{comment.email}</p>
          </div>
          <p className='small'>{commentTime}</p>
        </div>
        <hr />
        <p>{comment.body}</p>
      </div>
    </div>
  )
}

export default Comment
