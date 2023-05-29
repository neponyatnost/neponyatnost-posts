import { FC, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { IComment } from '../../../../models/types'
import Comment from '../../Comment/Comment'

interface AccordionComponentProps {
  comments: IComment[]
  userId: number
}

const AccordionComponent: FC<AccordionComponentProps> = ({
  comments,
  userId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Accordion defaultActiveKey=''>
      <Accordion.Item eventKey='0'>
        <Accordion.Header onClick={() => setIsOpen((prevState) => !prevState)}>
          {isOpen ? 'Hide comments' : 'Show comments'}
        </Accordion.Header>
        <Accordion.Body>
          {comments.map((comm) => (
            <Comment comment={comm} key={comm.id} userId={userId} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AccordionComponent
