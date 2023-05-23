import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
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
  _id: PropTypes.string.isRequired
});


export const orderInfoPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});


export const orderDetailsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
  })),
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
});