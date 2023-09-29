import useAuth from '../hooks/useAuth'

export const Home = () => {
  const { setAuth } = useAuth()
  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  return (
    <div>
      <div className='bg-primary rounded h-[150px] mb-10  p-4 justify-center flex flex-col gap-5'>
        <div className='flex gap-5'>
          <div className='h-[55px] w-[55px] bg-gray-300 rounded-full '>
            FJH
          </div>
          <input type='text' placeholder='Write here...' className='bg-neutral-800 rounded-full h-[55px] w-full p-5 text-font1' />

        </div>
        <div className='flex justify-end'>
          <button className='text-font1 font-bold bg-sky-400 py-3 px-5 rounded-full'>POST</button>
        </div>

      </div>
      <div className='bg-primary rounded h-[1000px] p-4'>
        <p className='text-font1'>En proceso...</p>
        <button
          onClick={handleSesionClose}
          className='p-20 bg-black text-white hover:bg-green-500 hover:text-pink-400 text-5xl'
        >CERRAR SESION
        </button>

      </div>
    </div>
  )
}
