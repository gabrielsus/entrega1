import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authcontext';
import './ProtectedRoute.css'; 

const ProtectedRoute = () => {
  const { user, esAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading-container">
        <p className="auth-loading-text">Cargando...</p>
      </div>
    );
  }

  if (!user || !esAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;