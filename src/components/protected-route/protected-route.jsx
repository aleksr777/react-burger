import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../services/authorization/check-auth';
import { deleteAuthData } from '../../services/authorization/auth-actions';

const getAuthState = state => state.authorization;


const ProtectedRouteElement = ({ children, forUnauthUser }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state || '/';

  const { isSuccess, user } = useSelector(getAuthState);

  let isAuth = checkAuth(isSuccess, user.email);

  useEffect(() => {
    if (!isAuth) {
      dispatch(deleteAuthData());
    }
  }, [isAuth, isSuccess, user]);

  useEffect(() => {
    if (!isAuth && !forUnauthUser) {
      return navigate('/login', { state: location.pathname });
    }
    else if (isAuth && forUnauthUser) {
      return navigate(fromPage, { replace: true });
    }
  }, [isAuth, forUnauthUser, isSuccess, user]);

  return (
    ((isAuth && !forUnauthUser) || (!isAuth && forUnauthUser)) && children
  );
};

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired
};
