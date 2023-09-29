import React from 'react'
import { Footer } from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Nav } from '../components/Nav'
import { Aside } from '../components/Aside'

export const LayoutAuth = () => {
  const { auth, cargando } = useAuth()
  if (cargando) return 'Cargando...'

  return (

    <div>
      {auth._id
        ? (
          <div className=' flex flex-col gap-14'>
            <header>
              <Nav />
            </header>
            <main className=' md:flex justify-center gap-12 min-h-[800px]'>
              <Aside />
              <section className='w-[650px]'>
                <Outlet />
              </section>
              <section className='flex flex-col gap-7'>
                <h2 className='bg-primary w-[300px] h-[300px] rounded'>
                  fff
                </h2>
                <h2 className='bg-primary w-[300px] h-[300px] rounded'>
                  fff
                </h2>
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
