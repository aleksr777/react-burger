import stylesProfileEditUserBlock from './profile-edit-user-block.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestChangeUserData } from '../../services/authorization/auth-actions';
import FormInput from '../form-input/form-input';
import FormButton from '../form-button/form-button';
import Loader from '../loader/loader';

const getAuthState = state => state.authorization;


const ProfileEditUserBlock = () => {

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
              disabled={!isFormChanged}
            />

          </div>
        </div>
      </form>
    </>
  )
};

export default ProfileEditUserBlock;