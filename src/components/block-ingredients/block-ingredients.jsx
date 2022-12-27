import PropTypes from 'prop-types';
import blockIngredientsStyles from './block-ingredients.module.css';

const BlockIngredients = ({ children, blockTitle, name }) => {
  return (
    <div className={blockIngredientsStyles.block} name={name}>
      <h3 className={blockIngredientsStyles.block__title}>{blockTitle}</h3>
      <ul className={blockIngredientsStyles.block__list}>
        {children}
      </ul>
    </div>
  )
};

BlockIngredients.propTypes = {
  children: PropTypes.node.isRequired,
  blockTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default BlockIngredients;