import { FC } from 'react'
import styles from './RandomAvatar.module.scss'

interface RandomAvatarProps {
  size?: number
}

const RandomAvatar: FC<RandomAvatarProps> = ({ size }) => {
  return (
    <img
      src='https://source.unsplash.com/random/200x200/?avatar'
      alt='Random avatar'
      className={styles.randomAvatar}
      width={size}
      height={size}
    />
  )
}

export default RandomAvatar
