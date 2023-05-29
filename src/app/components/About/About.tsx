import { FC } from 'react'
import RandomAvatar from '../UI/Avatar/RandomAvatar'

interface AboutProps {}

const About: FC<AboutProps> = ({}) => {
  return (
    <div>
      <RandomAvatar size={100} />
    </div>
  )
}

export default About
