import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SET_ORDER_ID } from '../../services/actions/order-id-actions';
import { apiConfig } from '../../constants/constants';
import { postOrder } from '../../utils/api';
import Preloader from '../../ui/preloader/preloader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderingButton = () => {

  // Стейт для отслеживания загрузки ингредиентов с сервера
  const [isOrderLoading, setOrderLoading] = useState(false);
  const [isOrderActive, setOrderActive] = useState(false);

  const dispatch = useDispatch();

  const totalPrice = useSelector(state => state.selectedIngr.totalPrice);
  const selectedBun = useSelector(state => state.selectedIngr.bun);
  const selectedIngredients = useSelector(state => state.selectedIngr.ingredients);

  // Проверка для активировации/дезактивации кнопки заказа.
  useEffect(() => {
    if (!totalPrice || totalPrice <= 0 || !selectedBun._id || !selectedIngredients[0]) {
      setOrderActive(false);
    }
    else {
      setOrderActive(true)
    };
  }, [totalPrice, selectedBun._id, selectedIngredients]);

  const handleOpenModal = (orderId) => {
    dispatch({ type: SET_ORDER_ID, payload: { id: orderId } });
  };

  function sendOrderRequest() {
    setOrderLoading(true);
    const arrId = [selectedBun._id, ...selectedIngredients.map(obj => obj._id), selectedBun._id];
    postOrder(apiConfig, arrId)
      .then(res => { handleOpenModal(res.order.number) })
      .catch(err => console.log(err))
      .finally(() => setOrderLoading(false));
  };

  return (
    <>
      {isOrderLoading ? <Preloader /> : null}

      {(isOrderActive && !isOrderLoading)
        ? (<Button htmlType='button' type='primary' size='large' onClick={sendOrderRequest}>
          Оформить заказ</Button>)
        : (<Button disabled htmlType='button' type='primary' size='large'>Оформить заказ</Button>)}
    </>
  )
};

export default OrderingButton;