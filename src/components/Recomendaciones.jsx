import React, { useState, useEffect } from 'react'

import { CardUsers } from './CardUsers'
import useAuth from '../hooks/useAuth'
import { fetchUsers } from '../services/userFetch'

const Recomendaciones = () => {
  const { auth } = useAuth()
  const [users, setUsers] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const showUsers = async () => {
      const data = await fetchUsers(auth)
      setUsers(data)
      setCargando(false)
    }

    showUsers()
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
