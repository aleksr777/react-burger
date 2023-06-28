import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Routes, Route, useLocation } from 'react-router-dom'
import { checkAuth } from '../../services/authorization/check-auth'
import { deleteAuthData } from '../../services/authorization/auth-actions'
import { requestGetIngredientsData } from '../../services/ingredients-data/ingredients-data-actions'
import { requestGetUserData } from '../../services/authorization/auth-actions'
import Loader from '../loader/loader'
import ProtectedRouteElement from '../protected-route/protected-route'
import AppLayout from '../app-layout/app-layout'
import ProfileEditUserBlock from '../profile-edit-user-block/profile-edit-user-block'
import ProfileOrdersBlock from '../profile-orders-block/profile-orders-block'
import { getAuthState } from '../../utils/selectors'

import HomePage from '../../pages/home/home'
import FeedPage from '../../pages/feed/feed'
import ProfilePage from '../../pages/profile/profile'
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details'
import IngredientDetailsModal from '../ingredient-details-modal/ingredient-details-modal'
import OrderDetailsPage from '../../pages/order-details/order-details'
import OrderDetailsModal from '../order-details-modal/order-details-modal'
import LoginPage from '../../pages/login/login'
import RegisterPage from '../../pages/register/register'
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password'
import ResetPasswordPage from '../../pages/reset-password/reset-password'
import NotFoundPage from '../../pages/not-found/not-found'


const App = () => {

  const dispatch = useAppDispatch()

  const { isSuccess, user } = useAppSelector( getAuthState )

  useEffect( () => {
    let isAuth: boolean = checkAuth( isSuccess, user?.email )
    isAuth ? dispatch( requestGetUserData() ) : dispatch( deleteAuthData() )
  }, [] )

  useEffect( () => {
    dispatch( requestGetIngredientsData() )
  }, [] )

  const location = useLocation()
  const background: string = location.state?.from || ''

  return (
    <>
      <Loader />

      <Routes location={ background || location }>
        <Route path="/" element={ <AppLayout /> }>
          <Route index element={ <HomePage /> } />

          <Route
            path="login"
            element={
              <ProtectedRouteElement forUnauthUser={ true }>
                <LoginPage />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="register"
            element={
              <ProtectedRouteElement forUnauthUser={ true }>
                <RegisterPage />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="forgot-password"
            element={
              <ProtectedRouteElement forUnauthUser={ true }>
                <ForgotPasswordPage />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="reset-password"
            element={
              <ProtectedRouteElement forUnauthUser={ true }>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />

          <Route path="ingredients/:id" element={ <IngredientDetailsPage /> } />

          <Route
            path="profile/orders/:id"
            element={
              <ProtectedRouteElement forUnauthUser={ false }>
                <OrderDetailsPage />
              </ProtectedRouteElement>
            }
          />

          <Route path="feed/:id" element={ <OrderDetailsPage /> } />

          <Route
            path="profile/"
            element={
              <ProtectedRouteElement forUnauthUser={ false }>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          >
            <Route index element={ <ProfileEditUserBlock /> } />
            <Route path="orders" element={ <ProfileOrdersBlock /> } />
          </Route>

          <Route path="feed" element={ <FeedPage /> } />
        </Route>

        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>

      { background && (
        <Routes>
          <Route path="ingredients/:id" element={ <IngredientDetailsModal /> } />
          <Route path="feed/:id" element={ <OrderDetailsModal /> } />
          <Route path="profile/orders/:id" element={ <OrderDetailsModal /> } />
        </Routes>
      ) }
    </>
  )
}

export default App
