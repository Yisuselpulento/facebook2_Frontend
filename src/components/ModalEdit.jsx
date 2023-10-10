import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { editPerfilFetch, changeImage } from '../services/perfilFetch.js'

const ModalEdit = () => {
  const { modalEdit, setModalEdit, auth } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null)

  const [formData, setFormData] = useState({
    sexo: '',
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
    editPerfilFetch(auth._id, formData)

    setModalEdit(!modalEdit)
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmitImg = async (e) => {
    e.preventDefault()

    if (selectedFile) {
      const formData = new FormData()
      formData.append('file0', selectedFile)
      console.log([...formData.entries()])
      changeImage(formData)
    } else {
      console.log('No hay un archivo seleccionado.')
    }
  }
  return (

    <div className='flex flex-col items-center  bg-white dark:bg-primary shadow-lg text-gray-700 dark:text-font1 md:text-xl md:font-bold p-5 rounded-lg '>
      <div className='flex flex-col gap-2 items-center '>
        <img
          className='w-20 h-20 rounded-full object-cover border border-gray-700'
          src={`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/avatar/${auth.image}`}
        />
        <form
          onSubmit={handleSubmitImg}
          className='flex flex-col gap-4 items-center'
        >
          <label className='flex flex-col items-center gap-3'>
            Elige tu foto:
            <input type='file' name='file0' accept='image/*' onChange={handleFileChange} />
          </label>
          <button
            className={`${buttons} w-[150px] py-2 rounded`}
            type='submit'
          >Guardar Avatar
          </button>
        </form>

      </div>
      <form
        className='flex flex-col gap-3 p-5 items-center '
        onSubmit={handleSubmit}
      >
        <div className='flex gap-5 items-center'>
          <label htmlFor='sexo'>Sexo:</label>
          <select
            className='text-black md:w-[200px] rounded p-2'
            name='sexo' id='sexo' value={formData.sexo} onChange={handleChange}
          >
            <option value='Superior'>Superior</option>
            <option value='Inferior'>Inferior</option>
            <option value='Otro'>Otro</option>
          </select>
        </div>

        <div className='flex gap-5 items-center'>
          <label htmlFor='age'>Edad:</label>
          <input
            className='text-black md:w-[200px] rounded p-2'
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
            className='text-black md:w-[200px] rounded p-2'
            name='country' id='country' value={formData.country} onChange={handleChange}
          >
            <option value='Chile'>Chile</option>
            <option value='Peru'>Perú</option>
          </select>
        </div>

        <button
          className={`px-3 py-2 rounded ${buttons} `}
          type='submit'
        >Guardar cambios
        </button>
      </form>
    </div>

  )
}

export {

  ModalEdit
}
