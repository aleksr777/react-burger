import stylesProfileEditUserBlock from './profile-edit-user-block.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestChangeUserData } from '../../services/authorization/auth-actions';
import FormInput from '../form-input/form-input';
import FormButton from '../form-button/form-button';
import Loader from '../loader/loader';

const getAuthState = state => state.authorization;


const ProfileEditUserBlock = () => {

  const dispatch = useDispatch();

  const { isLoading, isError, user } = useSelector(getAuthState);

  const userData = {
    name: user.name,
    email: user.email,
    password: '',
  };

  const [inputsData, setInputsData] = useState(userData);

  const [isFormChanged, setIsFormChanged] = useState(false);

  const [isSubmitActive, setIsSubmitActive] = useState(false);


  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }

  useEffect(() => {
    for (const key in userData) {
      if (userData[key] !== inputsData[key]) {
        return setIsFormChanged(true)
      }
    }
    setIsFormChanged(false);
  }, [inputsData]);

  function checkSubmitButton() {
    return isFormChanged && inputsData.name && inputsData.email && inputsData.password ? true : false;
  }

  useEffect(() => {
    setIsSubmitActive(checkSubmitButton())
  }, [user, isFormChanged, inputsData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isSubmitActive) {
      return null
    }
    dispatch(requestChangeUserData(inputsData, setIsFormChanged));
  }

  function cancelInputChange(e) {
    e.preventDefault();
    if (!isFormChanged) {
      return null
    }
    setInputsData(userData);
    setIsFormChanged(false);
    setIsSubmitActive(false);
  }

  return (
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />

      <form
        className={stylesProfileEditUserBlock.form}
        onSubmit={handleSubmit}
        autoComplete='off'
      >

        <div className={stylesProfileEditUserBlock.editingBlock}>

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
            className={stylesProfileEditUserBlock.buttonsBlock}
          >

            <button
              className={stylesProfileEditUserBlock.cancelButton}
              onClick={e => cancelInputChange(e)}
              disabled={!isFormChanged}
            >Отмена
            </button>

            <FormButton
              text='Сохранить'
              disabled={!isSubmitActive}
            />

          </div>
        </div>
      </form>
    </>
  )
};

export default ProfileEditUserBlock;