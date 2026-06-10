
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { getMe } from './service/authApi'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

function App() {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getMe()
        setUser(user)
      } catch {
        return
      } finally {
        setLoading(false)
      }
    }
    void initializeAuth()
  }, [setUser, setLoading])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
        {<PublicRoute>
          <Login />
        </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
          <Login />
        </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
          <Register />
        </PublicRoute>
        } />

        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
