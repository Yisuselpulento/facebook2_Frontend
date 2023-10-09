import { Footer } from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { NavAuth } from '../components/NavAuth'
import { Aside } from '../components/Aside'
import IMG from '../assets/img/promocion.webp'
import Recomendaciones from '../components/Recomendaciones'
import Modal from 'react-modal'
import { ChatIcon } from '../assets/icons/iconos'
import { ChatGroup } from '../components/ChatGroup'
import MobilNav from '../components/MobilNav'

Modal.setAppElement('#root')

export const LayoutAuth = () => {
  const { auth, cargando, setModalChat, modalChat } = useAuth()

  if (cargando) return 'Cargando...'
  return (

    <div>
      {auth._id
        ? (
          <div className=' flex flex-col gap-14'>
            <header>
              <NavAuth />
            </header>
            <main className=' md:flex justify-center gap-12 min-h-[800px] p-4'>
              <Aside />
              <section className='md:w-[650px]'>
                <Outlet />
              </section>
              <section className='flex md:flex-col gap-7 '>
                <div className='bg-white dark:bg-primary w-[300px] rounded p-4 flex flex-col gap-2 '>
                  <div className='flex justify-between'>
                    <p className='text-black dark:text-font1'>Lorem ipsum</p>
                    <p className='text-font2'>Lorem</p>
                  </div>
                  <button>
                    <img src={IMG} className='rounded' />
                  </button>

                  <div className='flex justify-between'>
                    <p className='text-black dark:text-font1'>Lorem impsum</p>
                    <p className='text-font2'>Lorem impsum</p>
                  </div>
                  <p className='text-font2'>Lorem ipsum dolor sit amet consectetur adipisicing  </p>
                </div>
                <div className='bg-white shadow dark:bg-primary rounded p-3'>
                  <Recomendaciones />
                </div>
              </section>

              <button
                onClick={() => setModalChat(!modalChat)}
                className='bg-blue-700 rounded-full p-3 md:p-4 fixed bottom-4 right-4'
              >
                <ChatIcon color='white' />
              </button>

            </main>
            <footer className='shadow-t-lg'>
              <Footer />
            </footer>
            {/*  */}
          </div>
          )
        : <Navigate to='/' />}
      <MobilNav />

      {modalChat &&
        <Modal
         /*  customStyles={customStyles} */
          isOpen={modalChat}
        >
          <ChatGroup />
        </Modal>}

    </div>
  )
}
