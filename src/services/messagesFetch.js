import clienteAxios from '../config/clienteAxios'

const fetchPostMessage = async (message) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post('messages', { content: message }, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const fetchGetMessages = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios('messages', config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  fetchPostMessage,
  fetchGetMessages
}
