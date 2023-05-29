import { range } from 'lodash'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export interface IPaginationProps {
  itemsCount: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  currentPage: number
}

const Pagination: FC<IPaginationProps> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)

  if (pageCount === 1) return null

  const pages = range(1, pageCount + 1)

  return (
    <div className='text-center'>
      <ul className='pagination text-center'>
        {pages.map((page) => (
          <li className='page-item' key={`page_${page}`}>
            <Link
              onClick={() => onPageChange(page)}
              className={'page-link' + (page === currentPage ? ' active' : '')}
              to=''
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
