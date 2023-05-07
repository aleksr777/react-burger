import formСontainerStyles from './form-container.module.css';
import PropTypes from 'prop-types';

const FormСontainer = ({ children }) => {
  return (
    <div className={formСontainerStyles.container}>
      {children}
    </div>
  )
}

export default FormСontainer;

FormСontainer.propTypes = {
  children: PropTypes.node.isRequired
};