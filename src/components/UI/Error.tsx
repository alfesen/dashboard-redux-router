import { Error as PropTypes } from '../../types'
import Button from './Button'
import s from './Error.module.scss'
const Error = ({ message, onDetach }: PropTypes) => {
  return (
    <div className={s.error}>
      {message}
      <Button className={s.error__detach} onClick={onDetach}>
        Detach
      </Button>
    </div>
  )
}

export default Error
