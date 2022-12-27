import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const ModalIngredientDetails = ({ ingridient, handleCloseModal }) => {
  return (
    <Modal handleCloseModal={handleCloseModal}><IngredientDetails ingridient={ingridient} /></Modal>
  )
};

ModalIngredientDetails.propTypes = {
  ingridient: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default ModalIngredientDetails;