import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthUserContext = createContext()

const AuthUserProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalChat, setModalChat] = useState(false)
  const [globalPost, setGlobalPost] = useState([])
  const navigate = useNavigate()

  const updateUser = (updatedData) => {
    setAuth(prevAuth => ({
      ...prevAuth,
      ...updatedData
    }))
  }

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setCargando(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/usuarios/perfil', config)
        setAuth(data)
        navigate('/home')
      } catch (error) {
        setAuth({})
      }

      setCargando(false)
    }
    autenticarUsuario()
  }, [])

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  return (
    <AuthUserContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
        setModalEdit,
        modalEdit,
        setModalChat,
        modalChat,
        setGlobalPost,
        globalPost,
        updateUser

      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}

export {
  AuthUserProvider
}

export default AuthUserContext