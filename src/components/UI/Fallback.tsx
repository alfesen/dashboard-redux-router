import { Fallback as PropTypes } from '../../types'
import s from './Fallback.module.scss'

const Fallback = ({ dark, message }: PropTypes) => {
  return <h1 className={`${s.fallback} ${dark ? s.dark : ''}`}>{message}</h1>
}

export default Fallback
