import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getLoginState = state => state.login;


const ProtectedRouteElement = ({ children }) => {

  const { success, accessToken, refreshToken } = useSelector(getLoginState);

  const location = useLocation();

  if (!success || !accessToken || !refreshToken) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    children
  );
};

export default ProtectedRouteElement;
