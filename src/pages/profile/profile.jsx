import stylesProfile from './profile.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestLogout } from '../../services/authorization/auth-actions';
import ProfileLink from '../../components/profile-link/profile-link';
import ProfileNavBlock from '../../components/profile-nav-block/profile-nav-block';
import ProfileBlockAbout from '../../components/profile-block-about/profile-block-about';
import ProfileTextAbout from '../../components/profile-text-about/profile-text-about';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';

const getAuthState = state => state.authorization;


const ProfilePage = () => {

  const { user, refreshToken } = useSelector(getAuthState);

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

        <div className={stylesProfile.container}>

          <ProfileNavBlock>

            <ProfileLink navText='Профиль' path='/profile' />

            <ProfileLink navText='История заказов' path='/orders' />

            <button
              /* Сделал простую кнопку для разлогирования (для проверки функционала).
              Потом сделаю, как потребуется, в следующем спринте*/
              onClick={() => dispatch(requestLogout(refreshToken))}
              className={stylesProfile.logoutButton}
            >Выход
            </button>

            <ProfileBlockAbout>
              <ProfileTextAbout>В этом разделе вы можете</ProfileTextAbout>
              <ProfileTextAbout>изменить свои персональные данные</ProfileTextAbout>
            </ProfileBlockAbout>

          </ProfileNavBlock>

          <form
            className={stylesProfile.form}
            onSubmit={handleSubmit}
            autoComplete='off'
          >

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

        </div>

      </AppMainBlock>

    </AppPage>
  )
};

export default ProfilePage;