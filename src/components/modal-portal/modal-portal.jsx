import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

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

