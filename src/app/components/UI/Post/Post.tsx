import { FC, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { IComment } from '../../../../models/types'
import { fetchPostsRequest } from '../../../../reducers/postsSlice'
import { fetchUsersRequest } from '../../../../reducers/usersSlice'
import AccordionComponent from '../Accordion/AccordionComponent'
import RandomAvatar from '../Avatar/RandomAvatar'

interface PostProps {
  id: number
  userId: number
  title: string
  body: string
  comments: IComment[]
}

const Post: FC<PostProps> = ({ id, userId, title, body, comments }) => {
  const { users, isLoading, error } = useAppSelector(
    (state) => state.usersReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersRequest())
    dispatch(fetchPostsRequest())
  }, [dispatch])

  return (
    <Card className='mb-2'>
      {isLoading && <Skeleton height={30} />}
      {error && <p>{error}</p>}
      {users &&
        users
          .filter((user) => user.id === userId)
          .map((u) => <Card.Header key={u.id}>{u.name}</Card.Header>)}
      <Card.Body>
        <Link to={`/user/${userId}`}>
          <RandomAvatar size={50} />
        </Link>

        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <AccordionComponent comments={comments} userId={userId} />
      </Card.Body>
    </Card>
  )
}

export default Post
