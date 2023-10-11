import { buttons } from '../helpers/TailwindVar'

export default function SearchComponent () {
  return (
    <div className='flex items-center'>
      <div className='flex gap-4'>
        <input
          type='text'
          className=' w-[260px] md:w-[400px] px-3 py-2 text-primary bg-gray-200 dark:bg-white border rounded-full focus:border-blue-700 focus:ring-blue-700 focus:outline-none focus:ring focus:ring-opacity-40 h-[35px]'
          placeholder='Search...'
        />
      </div>
    </div>
  )
}
