import { useMemo } from 'react'
import { IPost } from '../models/types'

export const useSortedPosts = (posts: IPost[], sort: number) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) =>
        a.title[sort].localeCompare(b.title[sort])
      )
    }
    return posts
  }, [sort, posts])
  return sortedPosts
}

export const usePosts = (posts: IPost[], sort: number, query: string) => {
  const sortedPosts = useSortedPosts(posts, sort)

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, sortedPosts])
  return sortedAndSearchedPosts
}
