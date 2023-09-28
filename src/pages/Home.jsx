import useAuth from '../hooks/useAuth'

export const Home = () => {
  const { setAuth } = useAuth()
  const handleSesionClose = () => {
    setAuth({})
    localStorage.removeItem('token')
  }

  return (
    <div>
      <p>En proceso...</p>
      <button
        onClick={handleSesionClose}
        className='p-20 bg-black text-white hover:bg-green-500 hover:text-pink-400 text-5xl'
      >CERRAR SESION
      </button>
    </div>
  )
}
