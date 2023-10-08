import { AddFriend } from '../assets/icons/iconos'

export const CardUsers = ({ user }) => {
  return (
    <div className='flex justify-between text-font1 bg-neutral-800 p-3 rounded-full'>
      <div className='flex gap-3 items-center'>
        <div>
          <img
            className='w-10 h-10 rounded-full object-cover border border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${user.image}`}
          />
        </div>
        <p> {user.nombre}</p>
      </div>

      <button><AddFriend color='blue' /></button>

    </div>
  )
}
