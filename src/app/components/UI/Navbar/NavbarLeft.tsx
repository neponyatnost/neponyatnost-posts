import { FC, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { NavLink } from 'react-router-dom'
import RandomAvatar from '../Avatar/RandomAvatar'

interface NavbarLeftProps {}

const NavbarLeft: FC<NavbarLeftProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={Math.random()} bg='dark' expand={expand} className='mb-3'>
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setIsOpen(true)}
              color='light'
              className='bg-light'
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='start'
              className={
                isOpen
                  ? 'show offcanvas offcanvas-start show'
                  : 'offcanvas offcanvas-start'
              }
            >
              <Offcanvas.Header closeButton onClick={() => setIsOpen(false)}>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className='d-flex gap-2'
                >
                  <RandomAvatar size={30} />
                  iv.konuhov@gmail.com
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <NavLink
                    to='/posts'
                    onClick={() => setIsOpen(false)}
                    className={'h4 text-decoration-none'}
                  >
                    Posts
                  </NavLink>
                  <NavLink
                    to='/about-me'
                    onClick={() => setIsOpen(false)}
                    className={'h4 text-decoration-none'}
                  >
                    About Me
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default NavbarLeft
