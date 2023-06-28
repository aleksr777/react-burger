import { useState, useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom'
import { getOrderId } from '../../services/order-id/order-id-actions'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkAuth } from '../../services/authorization/check-auth'
import { getAuthState, getOrderIdState, getSelectedIngrState, getCounterState } from '../../utils/selectors'
import { OrderInfoType } from '../../types/types'


const OrderingButton = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector( getOrderIdState )
  const { ingredients, bun, totalPrice } = useAppSelector( getSelectedIngrState )
  const { isSuccess, user } = useAppSelector( getAuthState )
  const { counter } = useAppSelector( getCounterState )

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
      const arrId = [ bun?._id, ...ingredients.map( ( obj: OrderInfoType ) => obj._id ), bun?._id ]
      dispatch( getOrderId( arrId, counter ) )
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
