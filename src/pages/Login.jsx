import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password })
      setAlerta({})
      window.localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/home')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-blue-600 font-black text-4xl capitalize text-center'>Iniciar sesión
      </h1>

      <form
        className='my-10 bg-white shadow rounded-lg p-10'
        onSubmit={handleSubmit}
      >
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-lg font-bold'
            htmlFor='email'
          >Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-1 p-2 border  bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-lg font-bold'
            htmlFor='password'
          >Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Password de Registro'
            className='w-full mt-1 p-1 border  bg-gray-50'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-blue-700 mb-5 w-full py-3 text-white uppercase font-bold  hover:cursor-pointer hover:bg-blue-800 transition-colors'
        />
        {msg && <Alerta alerta={alerta} />}

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-2 text-slate-500 uppercase text-sm hover:text-blue-700'
          to='/registrarse'
        >¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm hover:text-blue-700'
          to='/olvide-password'
        >Olvide Mi Password
        </Link>
      </nav>

    </>
  )
}
