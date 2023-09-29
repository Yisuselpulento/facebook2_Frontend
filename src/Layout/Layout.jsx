import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

const Layout = () => {
  return (
    <div className='bg-primary'>
      <header>
        <Nav />
      </header>
      <main className='flex flex-col container max-w-[600px] mx-auto min-h-[750px] justify-center'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
