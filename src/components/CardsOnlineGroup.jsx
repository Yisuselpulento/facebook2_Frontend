export const CardsOnlineGroup = ({ user }) => {
  return (
    <div className='items-center flex justify-between text-gray-700 dark:text-font1 bg-gray-200 dark:bg-neutral-800 p-3 shadow-xl'>
      <div className='flex gap-2 items-center'>
        <div>
          <img
            className='w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700'
            src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${user.image}`}
          />
        </div>
        <p> {user.nombre}</p>
      </div>
      <div className='bg-green-500 w-[10px] h-[10px] rounded-full' />
    </div>
  )
}
