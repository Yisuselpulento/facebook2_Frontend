import useAuth from '../hooks/useAuth'

export const Aside = () => {
  const { auth, cargando } = useAuth()

  return (
    <aside className='bg-primary p-4  h-[400px] rounded w-[300px] md:flex hidden flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='bg-gray-300 rounded-full h-[60px] w-[60px]'>
            im
          </div>
          <h2 className='text-lg text-font1'>{auth.nombre}</h2>
        </div>
        <p>IC</p>
      </div>
      <div>
        2
      </div>
      <div>
        3
      </div>
      <div>
        4
      </div>
    </aside>
  )
}
