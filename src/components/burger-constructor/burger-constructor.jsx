import burgerConstructorStyles from './burger-constructor.module.css';
import ModalOrderDetails from '../modal-order-details/modal-order-details';
import OrderingBlock from '../ordering-block/ordering-block';
import ItemsListConstructor from '../items-list-constructor/items-list-constructor';


const BurgerConstructor = () => {

  return (
    <>
      <section className={burgerConstructorStyles.section}>

        <ItemsListConstructor/>

        <OrderingBlock />

      </section>

      <ModalOrderDetails />
    </>
  );
};

export default BurgerConstructor;