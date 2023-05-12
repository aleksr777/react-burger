import PropTypes from 'prop-types';
import stylesScrollList from './ingredients-block.module.css';

const IngredientsBlock = ({ children, blockTitle, name }) => {
  return (
    <div className={stylesScrollList.block} name={name}>
      <h3 className={stylesScrollList.block__title}>{blockTitle}</h3>
      <ul className={stylesScrollList.block__list}>
        {children}
      </ul>
    </div>
  )
};

IngredientsBlock.propTypes = {
  children: PropTypes.node.isRequired,
  blockTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default IngredientsBlock;