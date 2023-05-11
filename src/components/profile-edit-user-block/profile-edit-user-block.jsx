import stylesProfileEditUserBlock from './profile-edit-user-block.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestChangeUserData } from '../../services/authorization/auth-actions';
import FormInput from '../form-input/form-input';
import Loader from '../loader/loader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAuthState } from '../../utils/selectors';


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


  const handleInputChange = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value });
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


  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormChanged) {
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
            onChange={e => handleInputChange(e)}
          />

          <FormInput
            inputType='email'
            value={inputsData.email}
            name='email'
            placeholder='Логин'
            icon='EditIcon'
            isIcon={true}
            onChange={e => handleInputChange(e)}
          />

          <FormInput
            inputType='password'
            name='password'
            value={inputsData.password}
            placeholder='Пароль'
            icon="EditIcon"
            onChange={e => handleInputChange(e)}
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
                disabled={!isFormChanged}
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