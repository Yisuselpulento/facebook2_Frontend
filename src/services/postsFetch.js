import clienteAxios from '../config/clienteAxios'

const Postear = async (input) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    await clienteAxios.post('posts', { content: input }, config)
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (id) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const data = await clienteAxios.delete(`posts/${id}`, config)
    console.log(data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const fetchPost = async () => {
  try {
    const token = localStorage.getItem('token')
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

const fetchPostUser = async (id) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios(`posts/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  Postear,
  fetchPost,
  deletePost,
  fetchPostUser
}
