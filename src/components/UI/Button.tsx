import { Link } from 'react-router-dom'
import { Button as PropTypes } from '../../types'
import s from './Button.module.scss'

const Button = ({
  onClick,
  children,
  className,
  danger,
  disabled,
  to,
}: PropTypes) => {
  const btn = to ? (
    <Link
      to={to}
      className={`${className ? className : ''} ${s.button} ${
        danger ? s.danger : ''
      }`}
    >{children}</Link>
  ) : (
    <button
      disabled={disabled}
      className={`${className ? className : ''} ${s.button} ${
        danger ? s.danger : ''
      }`}
      onClick={onClick}>
      {children}
    </button>
  )

  return btn
}

export default Button
