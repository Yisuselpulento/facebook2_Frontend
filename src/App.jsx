import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { LayoutUserAuth } from './Layout/LayoutUserAuth'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { OlvidePassword } from './pages/OlvidePassword'
import { Registrarse } from './pages/Registrarse'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import { AuthUserProvider } from './context/AuthUserProvider'
import { PerfilDinamic } from './pages/PerfilDinamic'
import { NotFound } from './pages/NotFound'
import Perfil from './pages/Perfil'
import { PostsProvider } from './context/PostsProvider'

const App = () => {
  return (
    <BrowserRouter>
      <AuthUserProvider>
        <PostsProvider>

          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Login />} />
              <Route path='/registrarse' element={<Registrarse />} />
              <Route path='/olvide-password' element={<OlvidePassword />} />
              <Route path='/olvide-password/:token' element={<NuevoPassword />} />
              <Route path='/confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/home' element={<LayoutUserAuth />}>
              <Route index element={<Home />} />
            </Route>

            <Route path='/perfil' element={<LayoutUserAuth />}>
              <Route index element={<Perfil />} />
              <Route path=':userId' element={<PerfilDinamic />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </PostsProvider>
      </AuthUserProvider>
    </BrowserRouter>
  )
}

export default App
