import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { STORAGE_KEY_PREFIX } from '../../constants/constants';

const getAuthState = state => state.authorization;


const ProtectedRouteElement = ({ children }) => {

  const accessToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}accessToken`);
  const refreshToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}refreshToken`);

  const { success } = useSelector(getAuthState);

  const location = useLocation();

  if (!success || !accessToken || !refreshToken) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    children
  );
};

export default ProtectedRouteElement;
