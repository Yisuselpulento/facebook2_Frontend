import useAuth from '../hooks/useAuth'
import { Config } from '../assets/icons/iconos'
import { Link } from 'react-router-dom'
import { buttons } from '../helpers/TailwindVar'
import { ModalEdit } from './ModalEdit'
import Modal from 'react-modal'

export const Aside = () => {
  const { auth, modalEdit, setModalEdit } = useAuth()

  return (
    <aside className='bg-primary p-4  h-[400px] rounded w-[330px] md:flex hidden flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div>
            <img
              className='w-20 h-20 rounded-full object-cover border border-gray-700'
              src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
            />
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <h2 className='text-lg text-font1 font-bold'>{auth.nombre}</h2>
            <Link
              className={`${buttons} bg-blue-700 py-1 px-2 rounded-full text-font1 hover:bg-blue-800`}
              to='/perfil'
            >
              Ver Perfil
            </Link>

          </div>

        </div>

      </div>
      <div className='text-font1 flex gap-10'>
        <div className='flex flex-col gap-3'>
          <p>Edad</p>
          <p>Sexo</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p>{auth.age}</p>
          <p>{auth.sexo}</p>
        </div>
      </div>
      <div className='text-font1 flex gap-10'>
        <p>Pais</p>
        <p>{auth.country}</p>
      </div>
      <div>
        <button onClick={() => setModalEdit(!modalEdit)}>
          <Config color='white' />
        </button>
      </div>
      {modalEdit &&
        <Modal
          isOpen={modalEdit}
        >
          <ModalEdit />
        </Modal>}
    </aside>
  )
}
