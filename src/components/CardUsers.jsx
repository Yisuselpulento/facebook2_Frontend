import { AddFriend } from '../assets/icons/iconos'

export const CardUsers = ({ user }) => {
  return (
    <div className='flex justify-between text-gray-700 dark:text-font1 bg-gray-200 dark:bg-neutral-800 p-3 rounded-full'>
      <div className='flex gap-3 items-center'>
        <div>
          <img
            className='w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${user.image}`}
          />
        </div>
        <p> {user.nombre}</p>
      </div>

      <button><AddFriend color='blue' /></button>

    </div>
  )
}
