import usePosts from '../hooks/usePosts'
import { PostsHome } from '../components/PostsHome'
import HeadInputPost from '../components/HeadInputPost'

export const Home = () => {
  const { globalPost, cargando } = usePosts()

  return (
    <div>
      <HeadInputPost />

      {!cargando
        ? globalPost.map(post => (
          <div key={post._id} className='bg-primary rounded p-4 mb-6  '>
            <PostsHome post={post} />
          </div>
        ))

        : <p className='text-font1'>Cargando...</p>}

    </div>
  )
}
