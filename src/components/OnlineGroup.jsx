import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { CardsOnlineGroup } from './CardsOnlineGroup'
import { fetchUsers } from '../services/userFetch'

const OnlineGroup = () => {
  const { auth } = useAuth()
  const [userOnline, setuserOnline] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers(auth._id)
      setuserOnline(data)
    }
    getUsers()
  }, [])

  return (

    <div className='min-w-[200px] max-h-[450px]overflow-auto'>
      {userOnline.map(user => (
        <CardsOnlineGroup key={user._id} user={user} />
      ))}

    </div>

  )
}

export default OnlineGroup
