import stylesProfileEditUserBlock from './profile-edit-user-block.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestChangeUserData } from '../../services/authorization/auth-actions';
import FormInput from '../form-input/form-input';
import Loader from '../loader/loader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

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
  const [isInputsEmpty, setIsInputsEmpty] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);


  const handleInputChange = (e, value) => {
    setInputsData({ ...inputsData, [value]: e.target.value });
  }


  /* Проверяем, внесены ли изменения */
  useEffect(() => {
    for (const key in userData) {
      if (userData[key] !== inputsData[key]) {
        return setIsFormChanged(true);
      }
    }
    setIsFormChanged(false);
  }, [inputsData, user]);


  /* Проверяем, есть ли пустые инпуты в форме */
  useEffect(() => {
    for (const key in inputsData) {
      if (!inputsData[key]) {
        return setIsInputsEmpty(true);
      }
    }
    setIsInputsEmpty(false);
  }, [inputsData]);


  /* Задаём состояние кнопки Submit */
  useEffect(() => {
    setIsSubmitActive((isFormChanged && !isInputsEmpty) ? true : false)
  }, [user, inputsData, isFormChanged, isInputsEmpty]);


  function handleSubmit(e) {
    e.preventDefault();
    if (!isSubmitActive) {
      return null
    }
    dispatch(requestChangeUserData(inputsData, setInputsData));
  }


  function cancelInputChange(e) {
    e.preventDefault();
    if (!isFormChanged) {
      return null
    }
    setInputsData(userData);
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

            <div className={stylesProfileEditUserBlock.submitBox}>
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                style={{ opacity: isFormChanged ? '' : '0' }}
                disabled={!isSubmitActive}
              >
                Сохранить
              </Button>
            </div>

          </div>
        </div>
      </form>
    </>
  )
};

export default ProfileEditUserBlock;