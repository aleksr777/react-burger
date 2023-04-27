import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getAuthState = state => state.authorization;


const ProtectedRouteElement = ({ children }) => {

  const { success, accessToken, refreshToken } = useSelector(getAuthState);

  const location = useLocation();

  if (!success || !accessToken || !refreshToken) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    children
  );
};

export default ProtectedRouteElement;
