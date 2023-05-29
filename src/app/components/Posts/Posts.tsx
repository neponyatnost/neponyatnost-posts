import { orderBy } from 'lodash'
import { FC, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { usePosts } from '../../../hooks/usePosts'
import { fetchCommentsRequest } from '../../../reducers/commentsSlice'
import { fetchPostsRequest } from '../../../reducers/postsSlice'
import { paginate } from '../../../utils/paginate'
import Pagination from '../UI/Pagination/Pagination'
import Post from '../UI/Post/Post'
import TextInput from '../UI/TextInput/TextInput'

interface PostsProps {}

interface ISortByProps {
  path: string
  order: boolean | 'asc' | 'desc'
}

const Posts: FC<PostsProps> = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filter, setFilter] = useState({ sort: 0, query: '' })
  const [sortBy, setSortBy] = useState<ISortByProps>({
    path: 'title',
    order: 'asc',
  })
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postsReducer
  )
  const { comments } = useAppSelector((state) => state.commentsReducer)

  const dispatch = useAppDispatch()
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const handleSearchQuery = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: currentTarget.value })
  }

  const handleClearSearchQuery = () => {
    setFilter({ ...filter, query: '' })
  }

  const handlePageChange = (pageIndex: number) => {
    setPage(pageIndex)
  }

  const handleSort = (item: string) => {
    if (sortBy.path === item) {
      setSortBy({
        ...sortBy,
        path: item,
        order: sortBy.order === 'asc' ? 'desc' : 'asc',
      })
    } else {
      setSortBy({ path: item, order: 'asc' })
    }
  }

  const count = posts.length
  const pageSize = 10

  useEffect(() => {
    setPage(1)
  }, [filter.query])

  useEffect(() => {
    dispatch(fetchPostsRequest())
    dispatch(fetchCommentsRequest())
  }, [dispatch])

  const sortedPosts = orderBy(
    sortedAndSearchedPosts,
    [sortBy.path],
    [sortBy.order]
  )

  const paginatedData = paginate(sortedPosts, page, pageSize)

  if (isLoading && posts.length === 0) {
    return <Skeleton count={5} height={232} />
  }

  return (
    <div className=''>
      <TextInput
        name='search'
        onChange={handleSearchQuery}
        value={filter.query}
        onClear={handleClearSearchQuery}
      />
      {error && <h1>{error}</h1>}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <button
        type='button'
        className='btn btn-primary mb-3'
        onClick={() => handleSort('title')}
      >
        Sort by title
      </button>
      {paginatedData &&
        paginatedData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
            comments={comments.filter((com) => com.postId === post.id)}
          />
        ))}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Posts
