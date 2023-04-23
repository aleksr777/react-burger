import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { requestLogout } from '../../services/login/login-actions';
import FormTitle from '../../components/form-title/form-title';
/* import FormInput from '../../components/form-input/form-input'; */
import FormLink from '../../components/form-link/form-link';
import FormText from '../../components/form-text/form-text';
import FormButton from '../../components/form-button/form-button';
import FormСontainer from '../../components/form-container/form-container';
import Loader from '../../components/loader/loader';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';


const getLoginState = state => state.login;

const ProfilePage = () => {

  const { user, isLoading, isError } = useSelector(getLoginState);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(requestLogout());
  }

  return (

    <AppPage>

      <Loader size={100} isLoading={isLoading} isError={isError} />

      <AppHeader />

      <AppMainBlock>

        <FormСontainer>

          <FormTitle text='Личный кабинет' />

          <form onSubmit={handleSubmit} autoComplete='off'>

            <FormText>
              Ваше имя: {user.name}
            </FormText>

            <FormText>
              Ваш email: {user.email}
            </FormText>

            <FormText>
              Ваш пароль: {user.password}
            </FormText>

            <FormButton text='Выход' />

          </form>

        </FormСontainer >

      </AppMainBlock>

    </AppPage>
  )
};

export default ProfilePage;