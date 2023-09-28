import React from 'react'
import { Footer } from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Nav } from '../components/Nav'

export const LayoutAuth = () => {
  const { auth, cargando } = useAuth()
  if (cargando) return 'Cargando...'

  return (

    <div>
      {auth._id
        ? (
          <div className=' flex flex-col'>
            <header>
              <Nav />
            </header>
            <main className=' flex'>
              <aside className='bg-gray-100 p-4  min-h-[750px]'>
                <h2 className='text-lg'>{auth.nombre}</h2>
                aside
              </aside>
              <section className='p-4'>
                <Outlet />
              </section>

            </main>
            <footer className='shadow-t-lg'>
              <Footer />
            </footer>

          </div>
          )
        : <Navigate to='/' />}
    </div>
  )
}
