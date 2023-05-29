import { ThemeProvider } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import About from './app/components/About/About'
import Comments from './app/components/Comments/Comments'
import Posts from './app/components/Posts/Posts'
import NavbarLeft from './app/components/UI/Navbar/NavbarLeft'
import User from './app/components/User/User'

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'
    >
      {/* <NavbarComponent /> */}
      <NavbarLeft />
      <Container className='mt-5'>
        <Routes>
          <Route path={'/'} element={<Posts />} />
          <Route path={'/posts'} element={<Posts />} />
          <Route path={'/comments'} element={<Comments />} />
          <Route path={'/user/:id?'} element={<User />} />
          <Route path={'/about-me'} element={<About />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
