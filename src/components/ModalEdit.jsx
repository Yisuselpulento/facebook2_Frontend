import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import clienteAxios from '../config/clienteAxios'

const ModalEdit = () => {
  const { modalEdit, setModalEdit, auth } = useAuth()
  const [formData, setFormData] = useState({
    sexo: '', // Puedes establecer un valor inicial si lo deseas, por ejemplo: 'male'
    age: '',
    country: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await clienteAxios.put(`usuarios/editar-perfil/${auth._id}`, formData, config)
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='border border-blue-500 rounded-full w-[100px] h-[100px] text-center'>img</div>
          <div className='flex flex-col gap-1'>
            <p>Nick</p>
            <a>Editar</a>
          </div>

        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='sexo'>Sexo:</label>
            <select name='sexo' id='sexo' value={formData.sexo} onChange={handleChange}>
              <option value='male'>Superior</option>
              <option value='female'>Inferior</option>
              <option value='other'>Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor='age'>Edad:</label>
            <input
              type='number'
              id='age'
              name='age'
              min='0'
              max='120'
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='country'>País:</label>
            <select name='country' id='country' value={formData.country} onChange={handleChange}>
              <option value='chile'>Chile</option>
              <option value='peru'>Perú</option>
            </select>
          </div>

          <button
            className={`px-3 py-2 rounded ${buttons} `}
            type='submit'
          >Guardar cambios
          </button>
        </form>
        <button
          onClick={() => setModalEdit(!modalEdit)}
          className={`px-3 py-2 rounded ${buttons} `}
        >Guardar
        </button>

      </div>

    </div>

  )
}

export {

  ModalEdit
}
