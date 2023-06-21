import stylesErrorInfo from './error-info.module.css'
import ImgPath from '../../images/ban.svg'

type Props = {
  title: string
}

const ErrorInfo = ( { title }: Props ) => {
  return (
    <div className={ stylesErrorInfo.container }>
      <div className={ stylesErrorInfo.textBox }>
        <p className={ stylesErrorInfo.title }>{ title }</p>
      </div>
      <picture className={ stylesErrorInfo.imageBox }>
        <img className={ stylesErrorInfo.image } src={ ImgPath } alt='Ошибка.' />
      </picture>
    </div>
  )
}

export default ErrorInfo
