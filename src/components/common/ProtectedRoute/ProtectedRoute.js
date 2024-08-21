import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
  const location = useLocation()
  console.log(children)
  // if (token && state.isPending) {
  //   return <Navigate to="/reassign-password" replace />
  // }
  return token ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />
}

export default ProtectedRoute
