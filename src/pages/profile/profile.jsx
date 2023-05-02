import stylesProfile from './profile.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestLogout, requestChangeUserData } from '../../services/authorization/auth-actions';
import ProfileLink from '../../components/profile-link/profile-link';
import ProfileNavBlock from '../../components/profile-nav-block/profile-nav-block';
import ProfileBlockAbout from '../../components/profile-block-about/profile-block-about';
import ProfileTextAbout from '../../components/profile-text-about/profile-text-about';
import FormInput from '../../components/form-input/form-input';
import FormButton from '../../components/form-button/form-button';
import AppPage from '../../components/app-page/app-page';
import AppHeader from '../../components/app-header/app-header';
import AppMainBlock from '../../components/app-main/app-main';
import Loader from '../../components/loader/loader';

const getAuthState = state => state.authorization;


const ProfilePage = () => {

  const { isLoading, isError, user } = useSelector(getAuthState);

  const dispatch = useDispatch();

  const [inputsData, setInputsData] = useState(user);

  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  useEffect(() => {
    for (const key in user) {
      if (user[key] !== inputsData[key]) {
        return setIsFormChanged(true)
      }
    }
    setIsFormChanged(false);
  }, [inputsData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormChanged) {
      return null
    }
    dispatch(requestChangeUserData(inputsData, setIsFormChanged));
  }

  function cancelInputChange(e) {
    e.preventDefault();
    if (!isFormChanged) {
      return null
    }
    setInputsData(user);
    setIsFormChanged(false);
  }

  return (

    <AppPage>

      <Loader size={100} isLoading={isLoading} isError={isError} />

      <AppHeader />

      <AppMainBlock>

        <div className={stylesProfile.container}>

          <ProfileNavBlock>

            <ProfileLink navText='Профиль' path='/profile' />

            <ProfileLink navText='История заказов' path='/orders' />

            <button
              /* Сделал простую кнопку для разлогирования (для проверки функционала).
              Потом сделаю, как потребуется, в следующем спринте*/
              onClick={() => dispatch(requestLogout())}
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
                value={inputsData.name}
                onChange={e => handleInputChange(e, 'name')}
              />

              <FormInput
                inputType='email'
                value={inputsData.email}
                name='email'
                placeholder='Логин'
                icon='EditIcon'
                isIcon={true}
                onChange={e => handleInputChange(e, 'email')}
              />

              <FormInput
                inputType='password'
                name='password'
                value={inputsData.password}
                placeholder='Пароль'
                icon="EditIcon"
                onChange={e => handleInputChange(e, 'password')}
              />

              <div
                className={stylesProfile.buttonsBlock}
              >

                <button
                  className={stylesProfile.cancelButton}
                  onClick={e => cancelInputChange(e)}
                  disabled={!isFormChanged}
                >Отмена
                </button>

                <FormButton
                  text='Сохранить'
                  disabled={!isFormChanged}
                />

              </div>

            </div>

          </form>

        </div>

      </AppMainBlock>

    </AppPage>
  )
};

export default ProfilePage;