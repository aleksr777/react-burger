import styles from './constructor-burger.module.css'
import NewOrderDetailsModal from '../new-order-details-modal/new-order-details-modal'
import OrderingPrice from '../ordering-price/ordering-price'
import OrderingButton from '../ordering-button/ordering-button'
import ConstructorItemsList from '../constructor-items-list/constructor-items-list'


const ConstructorBurger = () => {
  return (
    <>
      <section className={ styles.section }>
        <ConstructorItemsList />
        <div className={ styles.order }>
          <OrderingPrice />
          <OrderingButton />
        </div>
      </section>
      <NewOrderDetailsModal />
    </>
  )
}

export default ConstructorBurger
