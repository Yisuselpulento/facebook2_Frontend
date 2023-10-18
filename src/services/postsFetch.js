import clienteAxios from '../config/clienteAxios'

const Postear = async (input) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post('posts', { content: input }, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const data = await clienteAxios.delete(`posts/${id}`, config)
    return data
  } catch (error) {
    console.log(error.response.data)
  }
}

const fetchPost = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios('posts', config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const likePostFetch = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.put(`posts/${id}/like`, {}, config)
    return data
  } catch (error) {
    console.log(error)
  }
}
export {
  Postear,
  fetchPost,
  deletePost,
  likePostFetch
}
