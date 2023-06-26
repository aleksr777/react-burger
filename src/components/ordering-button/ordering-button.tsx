import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getOrderId } from '../../services/order-id/order-id-actions'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkAuth } from '../../services/authorization/check-auth'
import { getAuthState, getOrderIdState, getSelectedIngrState, getCounterState } from '../../utils/selectors'
import { SelectedIngredientStateType, AuthStateType, CounterType } from '../../types/types'


const OrderingButton = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading }: { isLoading: boolean } = useSelector( getOrderIdState )
  const { ingredients, bun, totalPrice }: SelectedIngredientStateType = useSelector( getSelectedIngrState )
  const { isSuccess, user }: AuthStateType = useSelector( getAuthState )
  const { counter }: CounterType = useSelector( getCounterState )

  const [ isOrderActive, setOrderActive ] = useState<boolean>( false )

  const isAuth: boolean = checkAuth( isSuccess, user.email )

  // Проверка для активировации/дезактивации кнопки заказа.
  useEffect( () => {
    if ( !totalPrice || totalPrice <= 0 || !bun?._id || !ingredients.length ) {
      setOrderActive( false )
    } else {
      setOrderActive( true )
    }
  }, [ totalPrice, bun?._id, ingredients.length ] )

  /* отправка запроса после нажатия кнопки */
  function sendOrderRequest () {
    if ( isAuth ) {
      const arrId = [ bun?._id, ...ingredients.map( ( obj ) => obj._id ), bun?._id ]
      dispatch( getOrderId( arrId, counter ) as any )
    } else {
      navigate( '/login' )
    }
  }

  const isButtonDisabled: boolean = !isOrderActive || isLoading

  return (
    <Button
      htmlType='button'
      type='primary'
      size='large'
      onClick={ sendOrderRequest }
      disabled={ isButtonDisabled }
    >
      Оформить заказ
    </Button>
  )
}

export default OrderingButton