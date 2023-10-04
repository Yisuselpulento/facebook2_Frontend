export default function SearchComponent () {
  return (
    <div className='flex items-center'>
      <div className='flex gap-4'>
        <input
          type='text'
          className='block w-[400px] px-4 py-2 text-primary bg-white border rounded-full focus:border-blue-700 focus:ring-blue-700 focus:outline-none focus:ring focus:ring-opacity-40 '
          placeholder='Search...'
        />
        <button className='px-4 text-white bg-blue-700 rounded-full hover:bg-blue-800'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
