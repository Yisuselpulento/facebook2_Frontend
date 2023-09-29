import useAuth from '../hooks/useAuth'

export const Aside = () => {
  const { auth, cargando } = useAuth()

  return (
    <aside className='bg-primary p-4  h-[500px] rounded w-[300px] md:flex hidden'>
      <h2 className='text-lg text-font1'>{auth.nombre}</h2>
      aside
    </aside>
  )
}
