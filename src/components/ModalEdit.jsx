import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { editPerfilFetch, changeImage } from '../services/perfilFetch.js'

const ModalEdit = () => {
  const { modalEdit, setModalEdit, auth, updateUser } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    sexo: auth.sexo || '',
    age: auth.age || '',
    country: auth.country || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedFile) {
      const imgFormData = new FormData()
      imgFormData.append('file0', selectedFile)
      await changeImage(imgFormData)
    }

    const updatedData = await editPerfilFetch(auth._id, formData)

    updateUser(updatedData)

    setModalEdit(!modalEdit)
  }

  return (
    <div className='flex flex-col items-center bg-white dark:bg-primary shadow-lg text-gray-700 dark:text-font1 md:text-lg md:font-semibold p-5 rounded-lg'>
      <div className='flex flex-col gap-2 items-center'>
        <img
          className='w-20 h-20 rounded-full object-cover border border-gray-700'
          src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
        />

        <form className='flex flex-col gap-3 p-5 items-center' onSubmit={handleSubmit}>
          <label className='flex flex-col items-center gap-3'>
            Elige tu foto:
            <input type='file' name='file0' accept='image/*' onChange={handleFileChange} />
          </label>

          <div className='flex gap-5 items-center'>
            <label htmlFor='sexo'>Sexo:</label>
            <select
              className='text-black md:w-[180px] rounded p-1'
              name='sexo'
              id='sexo'
              value={formData.sexo}
              onChange={handleChange}

            >
              <option value='Superior'>Superior</option>
              <option value='Inferior'>Inferior</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>

          <div className='flex gap-5 items-center'>
            <label htmlFor='age'>Edad:</label>
            <input
              className='text-black md:w-[180px] rounded p-1'
              type='number'
              id='age'
              name='age'
              min='0'
              max='120'
              value={formData.age}
              onChange={handleChange}

            />
          </div>

          <div className='flex gap-5 items-center'>
            <label htmlFor='country'>País:</label>
            <select
              className='text-black md:w-[180px] rounded p-1'
              name='country'
              id='country'
              value={formData.country}
              onChange={handleChange}

            >
              <option value='Chile'>Chile</option>
              <option value='Peru'>Perú</option>
            </select>
          </div>

          <button className={`px-2 py-1 rounded ${buttons}`}>Guardar cambios</button>
        </form>
      </div>
    </div>
  )
}

export { ModalEdit }
