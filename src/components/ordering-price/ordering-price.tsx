import orderingPriceStyles from './ordering-price.module.css'
import { useSelector } from 'react-redux'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getSelectedIngrState } from '../../utils/selectors'


const OrderingPrice = () => {

  const { totalPrice }: { totalPrice: number } = useSelector( getSelectedIngrState )

  return (
    <div className={ orderingPriceStyles.order__box }    >
      <p className={ orderingPriceStyles.order__price }>{ totalPrice }</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

export default OrderingPrice