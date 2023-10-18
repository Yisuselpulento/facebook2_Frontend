import clienteAxios from '../config/clienteAxios'

const editPerfilFetch = async (id, form) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const updateDAta = await clienteAxios.put(`usuarios/editar-perfil/${id}`, form, config)
    return updateDAta.data
  } catch (error) {
    console.log(error)
  }
}

const changeImage = async (data) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await clienteAxios.post('/usuarios/upload', data, config)

    console.log('Respuesta del servidor:', response.data)
    return response
  } catch (error) {
    console.log('Hubo un error al subir la imagen ', error.response)

    if (error.response && error.response.data) {
      console.log('Mensaje del servidor:', error.response.data.message)
    }
  }
}

export {
  editPerfilFetch,
  changeImage
}
