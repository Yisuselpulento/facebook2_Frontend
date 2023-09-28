import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { LayoutAuth } from './Layout/LayoutAuth'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { OlvidePassword } from './pages/OlvidePassword'
import { Registrarse } from './pages/Registrarse'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import { AuthProvider } from './context/AuthProvider'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Login />} />
            <Route path='/registrarse' element={<Registrarse />} />
            <Route path='/olvide-password' element={<OlvidePassword />} />
            <Route path='/olvide-password/:token' element={<NuevoPassword />} />
            <Route path='/confirmar/:id' element={<ConfirmarCuenta />} />
          </Route>

          <Route path='/home' element={<LayoutAuth />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
