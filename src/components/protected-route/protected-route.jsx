import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getLoginState = state => state.login;


const ProtectedRouteElement = ({ children }) => {

  const { success } = useSelector(getLoginState);

  /* const success = true; */

  const location = useLocation();

  if (!success) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    children
  );
};

export default ProtectedRouteElement;
