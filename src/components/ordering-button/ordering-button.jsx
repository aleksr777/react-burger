import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderId } from '../../services/order-id/order-id-actions';
import Loader from '../../components/loader/loader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const getOrderIdState = state => state.orderId;
const getTotalPriceState = state => state.selectedIngr.totalPrice;
const getSelectedBunState = state => state.selectedIngr.bun;
const getIngredientsState = state => state.selectedIngr.ingredients;

const OrderingButton = () => {

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getOrderIdState);

  const [isOrderActive, setOrderActive] = useState(false);

  const totalPrice = useSelector(getTotalPriceState);

  const selectedBun = useSelector(getSelectedBunState);

  const selectedIngredients = useSelector(getIngredientsState);

  // Проверка для активировации/дезактивации кнопки заказа.
  useEffect(() => {
    if (!totalPrice || totalPrice <= 0 || !selectedBun._id || !selectedIngredients.length) {
      setOrderActive(false);
    }
    else {
      setOrderActive(true)
    };
  }, [totalPrice, selectedBun._id, selectedIngredients.length]);

  /* отправка запроса после нажатия кнопки */
  function sendOrderRequest() {
    const arrId = [selectedBun._id, ...selectedIngredients.map(obj => obj._id), selectedBun._id];
    dispatch(getOrderId(arrId));
  };

  return (
    <>
      <Loader size='large' isLoading={isLoading} />
      {(
        isOrderActive && !isLoading
      ) ? (
        <Button htmlType='button' type='primary' size='large' onClick={sendOrderRequest}>Оформить заказ</Button>
      ) : (
        <Button htmlType='button' type='primary' size='large' disabled>Оформить заказ</Button>
      )}
    </>
  )
};

export default OrderingButton;