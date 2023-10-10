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

const App = () => {
  return (
    <BrowserRouter>
      <AuthUserProvider>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Login />} />
            <Route path='/registrarse' element={<Registrarse />} />
            <Route path='/olvide-password' element={<OlvidePassword />} />
            <Route path='/olvide-password/:token' element={<NuevoPassword />} />
            <Route path='/confirmar/:id' element={<ConfirmarCuenta />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='/home' element={<LayoutUserAuth />}>
            <Route index element={<Home />} />
            <Route path='perfil' element={<Perfil />} />
            <Route path='perfil/:id' element={<PerfilDinamic />} />
          </Route>

        </Routes>
      </AuthUserProvider>
    </BrowserRouter>
  )
}

export default App
