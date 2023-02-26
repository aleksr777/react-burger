import formСontainerStyles from './form-container.module.css';

const FormСontainer = ({ children }) => {
  return (
    <div className={formСontainerStyles.container}>
      {children}
    </div>
  )
}

export default FormСontainer;