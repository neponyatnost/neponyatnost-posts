import { FC } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

const NavbarComponent: FC = () => {
  return (
    <Navbar bg='dark' variant='dark' className='mb-4'>
      <Container>
        <Nav className='me-auto flex gap-5'>
          <NavLink
            to={'/posts'}
            className={({ isActive }) =>
              isActive
                ? styles.active
                : 'link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
            }
          >
            Posts
          </NavLink>
          <NavLink
            to={'/about-me'}
            className={({ isActive }) =>
              isActive
                ? styles.active
                : 'link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
            }
          >
            About me
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
