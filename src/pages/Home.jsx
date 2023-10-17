import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'
import { Aside } from '../components/Aside'
import Spinner from '../components/Spinner'
import usePosts from '../hooks/usePosts'

export const Home = () => {
  const { globalPost, cargando } = usePosts()

  return (
    <div className='flex gap-8'>
      <Aside />
      <div className='flex flex-col w-full'>
        <HeadInputPost placeholder='Escribe algo' />
        {!cargando
          ? globalPost?.map(post => (
            <div key={post._id} className='bg-white shadow dark:bg-primary rounded p-2 mb-5  '>
              <PostsHome post={post} />
            </div>
          ))

          : <div className='flex items-center justify-center'>
            <Spinner />
          </div>}
      </div>

    </div>
  )
}
