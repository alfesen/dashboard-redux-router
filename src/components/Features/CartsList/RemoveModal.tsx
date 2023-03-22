import { RemoveModal as PropTypes } from '../../../types'
import Button from '../../UI/Button'
import Overlay from '../../UI/Overlay'
import s from './RemoveModal.module.scss'

const RemoveModal = ({ onClose, id, totalAmount, onConfirm }: PropTypes) => {
  return (
    <Overlay onClose={onClose}>
      <header className={s.modal__header}>
        <h3>{id}.</h3>
        <h3>Total: ${totalAmount}</h3>
      </header>
      <section className={s.modal__prompt}>
        <p>Do you want to delete this cart?</p>{' '}
      </section>
      <div className={s.modal__actions}>
        <Button
          className={`${s.modal__cancel} ${s.modal__btn}`}
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          danger
          className={`${s.modal__confirm} ${s.modal__btn}}`}
          onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Overlay>
  )
}

export default RemoveModal
