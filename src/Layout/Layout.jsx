import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

const Layout = () => {
  return (
    <div className='bg-gray-100 dark:bg-secundary'>
      <header>
        <Nav />
      </header>
      <main className='flex flex-col container max-w-[600px] mx-auto min-h-[750px] justify-center p-4'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
