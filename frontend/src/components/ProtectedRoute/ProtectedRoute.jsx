import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children;
};

export default ProtectedRoute;
