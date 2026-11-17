import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/components/auth/authcontext';
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
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;