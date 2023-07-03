import styles from './error-info.module.css'
import ImgPath from '../../images/ban.svg'

type Props = {
  title: string
}

const ErrorInfo = ( { title }: Props ) => {
  return (
    <div className={ styles.container }>
      <div className={ styles.textBox }>
        <p className={ styles.title }>{ title }</p>
      </div>
      <picture className={ styles.imageBox }>
        <img className={ styles.image } src={ ImgPath } alt='Ошибка.' />
      </picture>
    </div>
  )
}

export default ErrorInfo
