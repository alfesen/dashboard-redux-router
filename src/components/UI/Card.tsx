import s from './Card.module.scss'
import { Card as PropTypes } from '../../types'

const Card = ({ className, children }: PropTypes) => {
  return <div aria-label='card' className={`${className} ${s.card}`}>{children}</div>
}

export default Card
