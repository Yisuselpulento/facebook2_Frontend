import React, { useState, useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'
import { CardUsers } from './CardUsers'
const Recomendaciones = () => {
  const [users, setUsers] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
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

        setUsers(data)
        setCargando(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='flex flex-col gap-5'>
      <p className='text-font2'>
        Recomendaciones
      </p>
      <div className='flex flex-col gap-4'>
        {!cargando
          ? users.map(user => (
            <CardUsers key={user._id} user={user} />
          ))

          : <p>Cargando...</p>}

      </div>
    </div>
  )
}

export default Recomendaciones
