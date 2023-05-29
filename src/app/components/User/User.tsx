import { FC, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { IPost } from '../../../models/types'
import { fetchCommentsRequest } from '../../../reducers/commentsSlice'
import { fetchPostsRequest } from '../../../reducers/postsSlice'
import { fetchUsersRequest } from '../../../reducers/usersSlice'
import Post from '../UI/Post/Post'

interface UserProps {
  posts?: IPost[]
}

const User: FC<UserProps> = ({ posts }) => {
  const { comments, isLoading, error } = useAppSelector(
    (state) => state.commentsReducer
  )
  const {
    posts: postsFromApi,
    isLoading: postsIsLoading,
    error: postsError,
  } = useAppSelector((state) => state.postsReducer)

  const {
    users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useAppSelector((state) => state.usersReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPostsRequest())
    dispatch(fetchCommentsRequest())
    dispatch(fetchUsersRequest())
  }, [dispatch])

  const { id } = useParams()
  const navigate = useNavigate()

  if (isLoading && postsFromApi.length === 0) {
    return <Skeleton count={5} height={232} />
  }

  if (id) {
    return (
      <>
        <Button className='mb-3' onClick={() => navigate('/')}>
          Go back
        </Button>
        {users &&
          users
            .filter((user) => user.id === +id)
            .map((u) => (
              <Card className='w-100 mb-3' key={u.id}>
                <Card.Header>
                  <strong>Name: </strong>
                  {u.name}
                </Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <strong>Phone: </strong>
                    {u.phone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email: </strong>
                    {u.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Website: </strong>
                    {u.website}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))}

        {error && <p>{error}</p>}
        {postsFromApi &&
          postsFromApi
            .filter((post) => post.userId === +id)
            .map((p) => (
              <Post
                userId={+id}
                title={p.title}
                body={p.body}
                id={+id}
                comments={comments.filter((com) => com.postId === p.id)}
                key={p.id}
              />
            ))}
      </>
    )
  }
  return <p>Empty</p>
}

export default User
