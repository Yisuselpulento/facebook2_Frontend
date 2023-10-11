import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchUserbyName } from '../services/userFetch'

export default function SearchComponent () {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        const results = await fetchUserbyName(searchTerm)
        setSearchResults(results || []) // Si results es null, se establece un array vacío
      } else {
        setSearchResults([])
      }
    }

    fetchSearchResults()
  }, [searchTerm])

  return (
    <div className='flex items-center'>
      <div className='flex gap-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=' w-[200px] md:w-[400px] px-3 py-2 text-primary bg-gray-200 dark:bg-white border rounded-full focus:border-blue-700 focus:ring-blue-700 focus:outline-none focus:ring focus:ring-opacity-40 h-[35px]'
          placeholder='Search...'
        />
        {searchResults.length > 0 && (
          <div className='absolute mt-10 w-[300px] md:w-[400px] bg-white border border-gray-300 rounded-md shadow-md dark:bg-primary'>
            {searchResults.map((user) => (
              <Link
                to={`/perfil/${user._id}`}
                key={user._id}
                onClick={() => {
                  setSearchTerm('')
                  setSearchResults([])
                }}
                className='block cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-00 dark:text-gray-300 p-3'
              >

                <div className='flex gap-4'>
                  <img
                    className='w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700 '
                    src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${user.image}`}
                  />
                  <p>{user.nombre}</p>
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
