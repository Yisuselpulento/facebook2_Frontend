import { AddFriend } from '../assets/icons/iconos'

export const CardUsers = ({ user }) => {
  return (
    <div className='flex justify-between text-font1 bg-neutral-800 p-3 rounded-full'>
      <div className='flex gap-3 items-center'>
        <div className='bg-white rounded-full w-[35px] h-[35px]'>i</div>
        <p> {user.nombre}</p>
      </div>

      <button><AddFriend color='blue' /></button>

    </div>
  )
}
