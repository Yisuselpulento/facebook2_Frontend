import clienteAxios from '../config/clienteAxios'

const editPerfilFetch = async (id, data) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    await clienteAxios.put(`usuarios/editar-perfil/${id}`, data, config)
  } catch (error) {
    console.log(error)
  }
}

const changeImage = async (data) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }

    const response = await clienteAxios.post('/usuarios/upload', data, config)

    if (response.ok) {
      const data = await response.json()
      console.log('Respuesta del servidor:', data)
      return response
    } else {
      console.error('Error al subir la imagen:', response.statusText)
    }
  } catch (error) {
    console.log('Hubo un error al subir la imagen ', error)
  }
}

export {
  editPerfilFetch,
  changeImage
}
