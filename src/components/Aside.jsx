import useAuth from '../hooks/useAuth'
import { Config } from '../assets/icons/iconos'
import { Link } from 'react-router-dom'
import { buttons } from '../helpers/TailwindVar'
import { ModalEdit } from './ModalEdit'
import Modal from 'react-modal'

export const Aside = () => {
  const { auth, modalEdit, setModalEdit } = useAuth()

  console.log(auth)

  return (
    <aside className='bg-primary p-4  h-[400px] rounded w-[300px] md:flex hidden flex-col gap-5'>
      {/*       {modal && <ModalEdit />} */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='bg-gray-300 rounded-full h-[60px] w-[60px]'>
            im
          </div>
          <h2 className='text-lg text-font1 font-bold'>{auth.nombre}</h2>
        </div>
        <Link
          className={`${buttons} bg-blue-700 py-1 px-3 rounded-full text-font1 hover:bg-blue-800`}
          to='/perfil'
        >
          Ver Perfil
        </Link>
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
