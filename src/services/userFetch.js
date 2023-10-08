import clienteAxios from '../config/clienteAxios'

const fetchUsers = async (usuario) => {
  try {
    const token = localStorage.getItem('token')
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

export {
  fetchUsers
}
