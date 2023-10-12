import { Footer } from '../components/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { NavAuth } from '../components/NavAuth'
import IMG from '../assets/img/promocion.webp'
import Recomendaciones from '../components/Recomendaciones'
import { ChatIcon } from '../assets/icons/iconos'
import { ChatGroup } from '../components/ChatGroup'
import MobilNav from '../components/MobilNav'
import Modal from '../components/Modal'
import { ModalEdit } from '../components/ModalEdit'
import Spinner from '../components/Spinner'

export const LayoutUserAuth = () => {
  const { auth, cargando, setModalChat, modalChat, modalEdit, setModalEdit } = useAuth()

  return (

    <div>
      {cargando
        ? <div className='flex justify-center  items-center min-h-[800px] '> <Spinner /></div>

        : <div>
          {auth?._id
            ? (
              <div className=' flex flex-col gap-10'>
                <header>
                  <NavAuth />
                </header>
                <main className=' md:flex justify-center gap-7 min-h-[vh]  p-4'>
                  <section className='md:w-[940px] '>

                    <Outlet />
                  </section>
                  <section className='flex gap-7 flex-col'>
                    <div className='bg-white dark:bg-primary w-[270px] rounded p-4 flex flex-col gap-1 '>
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
                    className='bg-blue-700 rounded-full p-2 md:p-4 fixed bottom-4 right-4'
                  >
                    <ChatIcon color='white' />
                  </button>

                </main>
                <footer className='shadow-t-lg'>
                  <Footer />
                </footer>

              </div>
              )
            : <Navigate to='/' />}
          <MobilNav />

          {modalChat &&
            <Modal
              onClose={() => setModalChat(false)}
              isOpen={modalChat}
            >
              <ChatGroup />
            </Modal>}
          {modalEdit &&
            <Modal isOpen={modalEdit} onClose={() => setModalEdit(false)}>
              <ModalEdit />
            </Modal>}
          </div>}

    </div>
  )
}
