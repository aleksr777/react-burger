import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { STORAGE_KEY_PREFIX } from '../../constants/constants';
import { AUTH_DEFAULT } from '../../services/authorization/auth-actions';

const getAuthState = state => state.authorization;


const ProtectedRouteElement = ({ children }) => {

  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}accessToken`);
  const refreshToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}refreshToken`);
  const { success } = useSelector(getAuthState);

  if (!success || !accessToken || !refreshToken) {
    success && dispatch({ type: AUTH_DEFAULT, payload: {} });
    accessToken && localStorage.removeItem(`${STORAGE_KEY_PREFIX}accessToken`);
    refreshToken && localStorage.removeItem(`${STORAGE_KEY_PREFIX}refreshToken`);
    return <Navigate to='/login' state={{ from: location }} />
  }

  return (
    children
  );
};

export default ProtectedRouteElement;
