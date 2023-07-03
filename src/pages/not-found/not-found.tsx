import styles from './not-found.module.css'
import { Link } from 'react-router-dom'
import ImgPath from '../../images/ban.svg'


const NotFoundPage = () => {

  return (
    <div className={ styles.container }>
      <div className={ styles.textBox }>
        <p className={ `text_type_main-large ${ styles.text }` }>Упс... Страница не найдена!</p>
        <p className={ `text_type_digits-large ${ styles.text }` }>404 Error</p>
        <p className={ `text_type_main-medium ${ styles.text }` }>
          Проверьте адрес ссылки
        </p>
        <p className={ `text_type_main-medium ${ styles.text }` }>
          или перейдите на <Link to='/' className={ styles.link }>главную страницу</Link>
        </p>
      </div>
      <picture className={ styles.imageBox }>
        <img className={ styles.image } src={ ImgPath } alt="Страница не найдена" />
      </picture>
    </div>
  )
}

export default NotFoundPage