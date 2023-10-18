import clienteAxios from '../config/clienteAxios'

const handlePostComment = async (id, comentaio) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post(`comments/${id}`, { content: comentaio }, config)
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}

const handleDeleteComment = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    await clienteAxios.delete(`comments/${id}`, config)
  } catch (error) {
    console.log(error.response.data)
  }
}

export {
  handlePostComment,
  handleDeleteComment
}
