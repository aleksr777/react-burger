import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalPortal = ({ children }) => {

  const [modalElement] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(modalElement);
    return () => {
      document.body.removeChild(modalElement);
    };
  }, []);

  return ReactDOM.createPortal(children, modalElement);
}
export default ModalPortal;

ModalPortal.propTypes = {
  children: PropTypes.node.isRequired
};