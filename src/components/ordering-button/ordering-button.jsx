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

  const { isLoading, isError } = useSelector(getOrderIdState);

  const [isOrderActive, setOrderActive] = useState(false);

  const totalPrice = useSelector(getTotalPriceState);

  const selectedBun = useSelector(getSelectedBunState);

  const selectedIngredients = useSelector(getIngredientsState);

  const dispatch = useDispatch();

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

  const isButtonDisabled = (!isOrderActive || isLoading) ? true : false;

  return (
    <>
      <Loader size={100} isLoading={isLoading} isError={isError} />
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={sendOrderRequest}
        disabled={isButtonDisabled}
      >Оформить заказ
      </Button>
    </>
  )
};

export default OrderingButton;