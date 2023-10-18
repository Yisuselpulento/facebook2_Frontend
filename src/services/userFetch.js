import clienteAxios from '../config/clienteAxios'

const fetchUsers = async (usuario) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios('usuarios', config)
    // pasar esto a servidor para filtrar  al usuario en recomendacion
    const newArr = data.filter(user => user._id !== usuario._id)
    return newArr
  } catch (error) {
    console.log(error)
  }
}

const fetchUserbyId = async (id) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios(`usuarios/perfil/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const fetchUserbyName = async (name) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token not found')
      return null
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await clienteAxios(`usuarios/buscar/${name}`, config)

    if (response.status !== 200) {
      console.error(`Error with status code: ${response.status}`)
      return null
    }
    return response.data
  } catch (error) {
    console.error('Network or request error:', error)
    return null
  }
}

export {
  fetchUsers,
  fetchUserbyId,
  fetchUserbyName
}
