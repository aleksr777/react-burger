import stylesProfile from './profile.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { requestLogout } from '../../services/login/login-actions';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const getLoginState = state => state.login;


const ProfilePage = () => {

  const { user } = useSelector(getLoginState);

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState({
    valueName: user.name,
    valueLogin: user.email,
    valuePassword: user.password,
  });

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (

    <AppPage>

      <AppHeader />

      <AppMainBlock>

        <form
          className={stylesProfile.form}
          onSubmit={handleSubmit}
          autoComplete='off'
        >

          <div className={stylesProfile.navBlock}>

            <NavLink
              className={`${stylesProfile.navLink} ${stylesProfile.navLink_active}`}
              to='/profile'
            >Профиль
            </NavLink>

            <NavLink
              className={stylesProfile.navLink}
              to='/profile'
            >История заказов
            </NavLink>

            <NavLink
            /* Сделал простое разлогирование для проверки функционала, потом сделаю, как потребуется */
              onClick={() => dispatch(requestLogout())}
              className={stylesProfile.navLink}
              to='/profile'
            >Выход
            </NavLink>

            <div className={stylesProfile.blockAbout}>
              <p className={stylesProfile.blockAbout__text}>В этом разделе вы можете</p>
              <p className={stylesProfile.blockAbout__text}>изменить свои персональные данные</p>
            </div>

          </div>

          <div className={stylesProfile.editingBlock}>

            <FormInput
              inputType='text'
              placeholder='Имя'
              name='name'
              icon='EditIcon'
              value={inputsData.valueName}
              onChange={e => handleInputChange(e, 'valueName')}
            />

            <FormInput
              inputType='email'
              onChange={e => handleInputChange(e, 'valueLogin')}
              value={inputsData.valueLogin}
              name='login'
              placeholder='Логин'
              icon='EditIcon'
              isIcon={true}
            />

            <FormInput
              inputType='password'
              onChange={e => handleInputChange(e, 'valuePassword')}
              value={inputsData.valuePassword}
              name='password'
              placeholder='Пароль'
              icon="EditIcon"
            />

            <div className={stylesProfile.buttonsBlock}>

              <button className={stylesProfile.cancelButton}>Отмена</button>
              <FormButton text='Сохранить' />

            </div>

          </div>

        </form>

      </AppMainBlock>

    </AppPage>
  )
};

export default ProfilePage;