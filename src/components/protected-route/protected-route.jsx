import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../services/authorization/check-auth';
import { deleteAuthData } from '../../services/authorization/auth-actions';

const getAuthState = state => state.authorization;


const ProtectedRouteElement = ({ children, forUnauthUser }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, user } = useSelector(getAuthState);
  const isAuth = checkAuth(isSuccess, user.email);

  useEffect(() => {
    if (!isAuth) {
      dispatch(deleteAuthData());
    }
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth && !forUnauthUser) {
      navigate('/login');
    }
    else if (isAuth && forUnauthUser) {
      navigate('/');
    }
  }, [isAuth, forUnauthUser]);

  return (
    ((isAuth && !forUnauthUser) || (!isAuth && forUnauthUser)) && children
  );
};

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired
};
