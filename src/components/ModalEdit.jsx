import { buttons } from '../helpers/TailwindVar'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    editPerfilFetch(auth._id, formData)
  }

  const handleFileChange = (e) => {
    console.log('cambiando png')
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

    <div>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='border border-blue-500 rounded-full w-[100px] h-[100px] text-center'>img</div>
          <form
            onSubmit={handleSubmitImg}
            className='flex flex-col gap-1'
          >
            <label>
              Sube una imagen:
              <input type='file' name='file0' accept='image/*' onChange={handleFileChange} />
            </label>
            <button type='submit'>Cambiar Avatar</button>
          </form>

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
        <Link
          to='/home'
          onClick={() => setModalEdit(!modalEdit)}
          className={`px-3 py-2 rounded ${buttons} `}
        >Guardar
        </Link>

      </div>

    </div>

  )
}

export {

  ModalEdit
}
